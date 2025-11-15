export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const sendMessage = async (messages: Message[]): Promise<string> => {
  try {
    const response = await fetch('http://localhost:3001/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages }),
    });

    if (!response.ok) {
      throw new Error('Error en la respuesta del servidor');
    }

    const data = await response.json();
    return data.message;
  } catch (error) {
    console.error('Error al enviar mensaje:', error);
    throw new Error('No se pudo conectar con el servidor del chatbot. Asegúrate de que esté ejecutándose en el puerto 3001.');
  }
};
