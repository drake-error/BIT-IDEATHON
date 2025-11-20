import { GoogleGenAI } from '@google/genai';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// 1. Load environment variables from .env file
dotenv.config();

// 2. Initialize the GoogleGenAI client using the API key
// Ensure you have created a .env file with GEMINI_API_KEY="YOUR_KEY"
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const app = express();
// Use port 3001 to avoid conflicts with the React development server (usually 3000)
const port = 3001; 

// Middleware
// Allows the React app (http://localhost:3000) to make requests to this server (http://localhost:3001)
app.use(cors()); 
// Allows parsing of JSON request bodies (to read the 'prompt')
app.use(express.json()); 

// --- The Core Chat API Route ---
app.post('/api/chat', async (req, res) => {
    const { prompt } = req.body;
    
    if (!prompt) {
        return res.status(400).json({ error: "Prompt is required." });
    }

    // System Instruction: Essential for defining the bot's legal persona
    const systemInstruction = "You are 'Nyaya Mitra,' an expert assistant on Indian law and the Constitution of India. Provide concise, clear, and easy-to-understand explanations of Indian legal articles, acts, and concepts. Always maintain a formal and helpful tone.";

    try {
        // Send request to the Gemini API
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            config: {
                systemInstruction: systemInstruction,
                temperature: 0.2 // Lower temperature for more factual responses
            }
        });

        // Send the AI's response text back to the frontend
        res.json({ text: response.text.trim() });
    } catch (error) {
        console.error("Gemini API Error:", error);
        res.status(500).json({ 
            error: "Failed to fetch response from AI model. Check your API key and server logs.", 
            details: error.message 
        });
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
    console.log('Ensure you run this file separately using: node server.js');
});