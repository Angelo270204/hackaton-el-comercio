import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, Sparkles } from 'lucide-react';
import { sendMessage, Message } from '../../services/chatService';
import '../../styles/chatbot.css';

export const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        role: 'assistant',
        content: '¡Hola! 👋 Soy tu asistente virtual para las Elecciones 2026 de Perú. Puedo ayudarte con consultas sobre miembros de mesa, proceso de votación, candidatos, fechas importantes y más. ¿En qué puedo ayudarte? 🗳️'
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: inputValue.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await sendMessage([...messages, userMessage]);
      const assistantMessage: Message = {
        role: 'assistant',
        content: response
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Lo siento, hubo un error al procesar tu mensaje. Por favor, intenta nuevamente. Si el problema persiste, verifica que el servidor esté funcionando.'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <button
        className={`chatbot__button ${isOpen ? 'chatbot__button--hidden' : ''}`}
        onClick={() => setIsOpen(true)}
        aria-label="Abrir chatbot"
      >
        <MessageCircle size={24} />
        <span className="chatbot__button-badge">
          <Sparkles size={12} />
        </span>
      </button>

      {isOpen && (
        <div className="chatbot__container">
          <div className="chatbot__header">
            <div className="chatbot__header-content">
              <div className="chatbot__avatar">
                <MessageCircle size={20} />
              </div>
              <div>
                <h3 className="chatbot__title">Asistente Electoral</h3>
                <p className="chatbot__subtitle">Elecciones 2026</p>
              </div>
            </div>
            <button
              className="chatbot__close"
              onClick={() => setIsOpen(false)}
              aria-label="Cerrar chatbot"
            >
              <X size={20} />
            </button>
          </div>

          <div className="chatbot__messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`chatbot__message chatbot__message--${message.role}`}
              >
                {message.role === 'assistant' && (
                  <div className="chatbot__message-avatar">
                    <MessageCircle size={16} />
                  </div>
                )}
                <div className="chatbot__message-content">
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="chatbot__message chatbot__message--assistant">
                <div className="chatbot__message-avatar">
                  <Loader2 size={16} className="chatbot__spinner" />
                </div>
                <div className="chatbot__message-content chatbot__message--loading">
                  Escribiendo...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot__input-container">
            <textarea
              className="chatbot__input"
              placeholder="Escribe tu pregunta sobre las elecciones..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              rows={1}
              disabled={isLoading}
            />
            <button
              className="chatbot__send"
              onClick={handleSend}
              disabled={!inputValue.trim() || isLoading}
              aria-label="Enviar mensaje"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
