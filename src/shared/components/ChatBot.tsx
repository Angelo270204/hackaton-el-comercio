import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles } from 'lucide-react';
import { sendMessage } from '../../services/chatService';
import type { Message } from '../../services/chatService';
import { BotAvatar, BotAvatarSmall } from './BotAvatar';
import { useAccessibility } from '../../contexts/AccessibilityContext';
import '../../styles/chatbot.css';

export const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { darkMode, highContrast } = useAccessibility();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setIsSpeaking(true);
      setTimeout(() => {
        const welcomeMessage: Message = {
          role: 'assistant',
          content: '¡Hola! 👋 Soy tu asistente virtual para las Elecciones 2026 de Perú. Puedo ayudarte con consultas sobre miembros de mesa, proceso de votación, candidatos, fechas importantes y más. ¿En qué puedo ayudarte? 🗳️'
        };
        setMessages([welcomeMessage]);
        setTimeout(() => setIsSpeaking(false), 2000);
      }, 500);
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
      setIsSpeaking(true);
      const response = await sendMessage([...messages, userMessage]);
      const assistantMessage: Message = {
        role: 'assistant',
        content: response
      };
      setMessages(prev => [...prev, assistantMessage]);
      // Mantener la animación mientras se muestra el mensaje
      setTimeout(() => setIsSpeaking(false), 2000);
    } catch (error) {
      setIsSpeaking(false);
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
        aria-label="Abrir chatbot - Asistente virtual para elecciones"
        title="Abrir asistente virtual"
      >
        <div className="chatbot__button-avatar">
          <BotAvatar isSpeaking={false} />
        </div>
        <span className="chatbot__button-badge" aria-hidden="true">
          <Sparkles size={12} />
        </span>
      </button>

      {isOpen && (
        <div className={`chatbot__container ${darkMode ? 'chatbot__container--dark' : ''} ${highContrast ? 'chatbot__container--high-contrast' : ''}`}>
          <div className="chatbot__header">
            <div className="chatbot__header-content">
              <div className="chatbot__avatar" role="img" aria-label="Avatar del asistente virtual">
                <BotAvatarSmall isSpeaking={isSpeaking || isLoading} />
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
          
          {/* Mensaje de bienvenida visual con avatar */}
          {messages.length === 1 && messages[0].role === 'assistant' && (
            <div className="chatbot__welcome">
              <div className="chatbot__welcome-avatar">
                <BotAvatarSmall isSpeaking={isSpeaking} />
              </div>
              <div className="chatbot__welcome-content">
                <p className="chatbot__welcome-text">
                  Estoy aquí para ayudarte con información sobre las elecciones
                </p>
              </div>
            </div>
          )}

          <div className="chatbot__messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`chatbot__message chatbot__message--${message.role}`}
              >
                {message.role === 'assistant' && (
                  <div className="chatbot__message-avatar" role="img" aria-label="Avatar del asistente">
                    <BotAvatarSmall isSpeaking={index === messages.length - 1 && (isSpeaking || isLoading)} />
                  </div>
                )}
                <div className="chatbot__message-content">
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="chatbot__message chatbot__message--assistant">
                <div className="chatbot__message-avatar" role="img" aria-label="El asistente está procesando">
                  <BotAvatarSmall isSpeaking={true} />
                </div>
                <div className="chatbot__message-content chatbot__message--loading" aria-live="polite">
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
