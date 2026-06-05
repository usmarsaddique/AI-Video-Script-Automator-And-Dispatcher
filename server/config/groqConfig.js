import dotenv from 'dotenv';

dotenv.config();

export const groqConfig = {
    apiKey: process.env.GROQ_API_KEY,
    baseUrl: "https://api.groq.com/openai/v1/chat/completions",
    model: "llama-3.1-8b-instant"
};
