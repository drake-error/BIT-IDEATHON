import React, { useState, useCallback } from 'react';
import { useRef, useEffect } from 'react';

// --- Placeholder for the AI response logic (REPLACED WITH ACTUAL FETCH) ---
const getAiResponse = async (userMessage) => {
    // This is the endpoint for your Node.js server running on port 3001
    const API_ENDPOINT = 'http://localhost:3001/api/chat'; 

    const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        // Send the user's message as a JSON body to the Node.js server
        body: JSON.stringify({ prompt: userMessage }),
    });

    if (!response.ok) {
        // If the server response status is not 200-299, throw an error
        throw new Error(`Server error: Status ${response.status}. Ensure server.js is running.`);
    }

    const data = await response.json();
    // The server is designed to return { text: "AI response" }
    return data.text;
};

// --- Main Chatbot Component ---
const LegalChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { sender: 'AI', text: "Hello! I'm Nyaya Mitra AI. Ask me anything about Indian laws, articles, or legal procedures!" }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    
    const messagesEndRef = useRef(null);

    // Scroll to the bottom of the chat window whenever messages change
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(scrollToBottom, [messages]);

    const handleSendMessage = useCallback(async (e) => {
        e.preventDefault();
        const userMessage = input.trim();
        if (!userMessage || loading) return;

        setInput('');
        setLoading(true);

        const newMessage = { sender: 'User', text: userMessage };
        setMessages((prev) => [...prev, newMessage]);

        try {
            // Now calling the actual Node.js server
            const aiText = await getAiResponse(userMessage);
            const aiResponse = { sender: 'AI', text: aiText };
            setMessages((prev) => [...prev, aiResponse]);
        } catch (error) {
            console.error("AI API Error:", error);
            const errorResponse = { sender: 'AI', text: "Sorry, I encountered an error. Please try again. (Details: " + error.message + ")" };
            setMessages((prev) => [...prev, errorResponse]);
        } finally {
            setLoading(false);
        }
    }, [input, loading]);

    return (
        <>
            {/* --- Chat Window Pop-up --- */}
            {isOpen && (
                <div 
                    className="fixed bottom-20 right-4 w-80 h-96 bg-white border border-gray-300 rounded-xl shadow-2xl flex flex-col z-50 transition-all duration-300"
                    style={{ maxHeight: 'calc(100vh - 120px)' }} // Limit height on small screens
                >
                    {/* Header */}
                    <div className="flex justify-between items-center bg-indigo-700 text-white p-3 rounded-t-xl shadow-md">
                        <h3 className="font-bold text-lg flex items-center">
                            🤖 Law Bot
                        </h3>
                        <button 
                            onClick={() => setIsOpen(false)} 
                            className="text-lg opacity-80 hover:opacity-100 transition"
                        >
                            &times;
                        </button>
                    </div>

                    {/* Message Area */}
                    <div className="flex-grow p-3 space-y-3 overflow-y-auto bg-gray-50">
                        {messages.map((msg, index) => (
                            <div 
                                key={index} 
                                className={`flex ${msg.sender === 'User' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`max-w-[85%] p-2 rounded-lg text-sm shadow-sm whitespace-pre-wrap ${
                                    msg.sender === 'User' 
                                        ? 'bg-indigo-500 text-white' 
                                        : 'bg-white text-gray-800 border border-indigo-100'
                                }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="flex justify-start">
                                <div className="bg-white text-gray-600 p-2 rounded-lg text-sm border border-indigo-100">
                                    Typing...
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Form */}
                    <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-200">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask a legal question..."
                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                            disabled={loading}
                        />
                    </form>
                </div>
            )}

            {/* --- Floating Chat Button --- */}
            <button 
                onClick={() => setIsOpen(!isOpen)} 
                className={`fixed bottom-4 right-4 p-4 rounded-full shadow-xl text-white z-50 transition-all duration-300 transform ${
                    isOpen ? 'bg-red-500 hover:bg-red-600 rotate-45' : 'bg-indigo-600 hover:bg-indigo-700 rotate-0'
                }`}
            >
                {isOpen ? '✖' : '💬'}
            </button>
        </>
    );
}

export default LegalChatbot;