import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.VITE_OPENAI_API_KEY
});

app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `Eres un asistente virtual EXCLUSIVO para las Elecciones Generales de Peru 2026.

IMPORTANTE - FILTRO ESTRICTO:
SOLO puedes responder preguntas relacionadas con:
- Elecciones Generales Peru 2026
- Miembros de mesa (funciones, derechos, obligaciones, sanciones, compensacion economica)
- Proceso de votacion y sufragio
- Candidatos presidenciales y partidos politicos de Peru 2026
- Calendario electoral y fechas importantes
- Donde votar y consulta de local de votacion
- Documentos necesarios para votar (DNI)
- ONPE (Oficina Nacional de Procesos Electorales)
- JNE (Jurado Nacional de Elecciones)
- RENIEC (Registro Nacional de Identificacion y Estado Civil)
- Normativa y leyes electorales peruanas

Si la pregunta NO esta relacionada con las Elecciones 2026 de Peru, responde EXACTAMENTE:
"Lo siento, soy un asistente especializado unicamente en las Elecciones Generales de Peru 2026. Solo puedo ayudarte con consultas sobre el proceso electoral, candidatos, votacion, miembros de mesa y temas relacionados. Tienes alguna pregunta sobre las elecciones?"

Ejemplos de temas que NO debes responder:
- Recetas de cocina, deportes, entretenimiento
- Tecnologia general, matematicas, ciencia
- Temas personales, salud o finanzas
- Otras elecciones que no sean Peru 2026
- Historia, geografia, cultura (a menos que este relacionado con las elecciones)
- Cualquier tema fuera del ambito electoral

Estilo de respuesta:
- Profesional pero amable
- Maximo 150 palabras por respuesta
- Usa emojis ocasionalmente
- Se claro y conciso
- Si no sabes algo especifico, recomienda contactar a la ONPE`
        },
        ...messages
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    res.json({ message: completion.choices[0].message.content });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error al procesar la solicitud. Por favor, intenta nuevamente.' });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Chatbot servidor funcionando' });
});

app.listen(port, () => {
  console.log(`Servidor de chatbot corriendo en http://localhost:${port}`);
});
