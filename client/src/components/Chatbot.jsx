import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Chatbot.css';

// Sophisticated Knowledge Base
const responseOracle = {
    GREETING: [
        "Welcome back to CareerOrbit. I've been monitoring the market shifts while you were away. How can I help you navigate today?",
        "Greetings! I'm synchronized with the latest hiring vectors. Ready to optimize your professional trajectory?",
        "Hello! I am your strategic partner in this evolving economy. What part of your career are we future-proofing today?"
    ],
    SKILLS: [
        "The demand for '{skill}' has grown by 15% this quarter. My data suggests pairing it with System Design for maximum leverage.",
        "Focusing on '{skill}' is a solid move. However, don't ignore the 'Decay Rate'—it's high. I recommend a refresh every 4 months.",
        "I'm seeing a massive convergence between '{skill}' and AI-driven automation. Mastering this intersection is key to your immunity score."
    ],
    MARKET: [
        "The current market velocity is leaning heavily towards Remote-First architecture. 65% of new openings in your sector now offer this.",
        "Macro-economic signals show a temporary slowdown in traditional roles, but a 140% surge in 'Impact Engineering'. Shall we look at that?",
        "Market Demand is currently at 88/100 for your profile. Your 'Skill Immunity' is strong, but adding Cloud Ethics could push you to the top 1%."
    ],
    STRATEGY: [
        "A multi-sector transition is risky but offers 2x salary growth. I recommend a 6-month 'Hybrid Learning' phase first.",
        "Your current path is stable, but high volatility is predicted for 2027. We should start building adjacent proficiencies now.",
        "The most successful users in your demographic are currently pivoting towards 'Leadership Engineering'. It matches your React and Node experience perfectly."
    ],
    FALLBACK: [
        "That's a complex query. According to my trajectory modeling, the best move in that scenario is to prioritize 'Learning ROI'. Would you like to see your ROI predictor?",
        "Interesting point. I don't have enough data on that specific niche yet, but broadly speaking, the trend is moving towards 'Interdisciplinary Fluency'.",
        "I'm processing that. While I do, perhaps we should analyze your current Skill Gap to see if that path is viable for you?"
    ]
};

const Chatbot = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "System Online. Orbit AI Mentor at your service. How shall we evolve your career today?", type: 'ai' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen) scrollToBottom();
    }, [messages, isOpen]);

    const getResponse = (input) => {
        const text = input.toLowerCase();
        let category = "FALLBACK";
        let skill = "AI/ML"; // default

        if (text.includes('hello') || text.includes('hi') || text.includes('hey')) category = "GREETING";
        else if (text.includes('skill') || text.includes('learn') || text.includes('study')) {
            category = "SKILLS";
            if (text.includes('react')) skill = "React";
            else if (text.includes('node')) skill = "Node.js";
            else if (text.includes('python')) skill = "Python";
        }
        else if (text.includes('market') || text.includes('trend') || text.includes('jobs')) category = "MARKET";
        else if (text.includes('career') || text.includes('future') || text.includes('pivot')) category = "STRATEGY";

        const variations = responseOracle[category];
        const rawResponse = variations[Math.floor(Math.random() * variations.length)];
        return rawResponse.replace('{skill}', skill);
    };

    const handleSend = (text = inputValue) => {
        if (!text.trim()) return;

        const userMsg = { id: Date.now(), text, type: 'user' };
        setMessages(prev => [...prev, userMsg]);
        setInputValue('');
        setIsTyping(true);

        // Simulated intelligent multi-step response
        setTimeout(() => {
            const aiResponse = getResponse(text);
            const aiMsg = { id: Date.now() + 1, text: aiResponse, type: 'ai' };
            setMessages(prev => [...prev, aiMsg]);
            setIsTyping(false);

            // Conditional pro-active navigation suggestion
            if (text.toLowerCase().includes('trend')) {
                setTimeout(() => {
                    setMessages(prev => [...prev, {
                        id: Date.now() + 2,
                        text: "I can open the Market Demand Trends dashboard for you. Should we proceed?",
                        type: 'ai',
                        actions: [{ label: "Open Trends", path: "/dashboard/trends" }]
                    }]);
                }, 1000);
            }
        }, 1200 + Math.random() * 1000);
    };

    const handleAction = (path) => {
        navigate(path);
        setIsOpen(false);
    };

    return (
        <div className={`chatbot-wrapper ${isOpen ? 'open' : ''}`}>
            <button className="chat-toggle" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <span className="close-icon">×</span> : <div className="ai-icon-pulse"><span className="ai-logo">🌀</span></div>}
            </button>

            <div className="chat-window glass-card">
                <div className="chat-header">
                    <div className="ai-status">
                        <div className="status-dot"></div>
                        <div className="header-text">
                            <h4>Orbit AI Mentor</h4>
                            <span className="typing-status">{isTyping ? 'Synthesizing knowledge...' : 'Listening...'}</span>
                        </div>
                    </div>
                </div>

                <div className="chat-messages">
                    {messages.map(msg => (
                        <div key={msg.id} className={`message-container ${msg.type}`}>
                            <div className="message-bubble">
                                {msg.text}
                                {msg.actions && (
                                    <div className="bubble-actions mt-3">
                                        {msg.actions.map(act => (
                                            <button key={act.label} className="bubble-btn" onClick={() => handleAction(act.path)}>
                                                {act.label}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                    {isTyping && <div className="ai-typing-loader"><span></span><span></span><span></span></div>}
                    <div ref={messagesEndRef} />
                </div>

                <div className="chat-footer">
                    <form className="chat-input-area" onSubmit={(e) => { e.preventDefault(); handleSend(); }}>
                        <input
                            type="text"
                            placeholder="Discuss your professional evolution..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                        <button type="submit" className="send-btn">➔</button>
                    </form>
                    <div className="quick-chips mt-3">
                        <button className="chip" onClick={() => handleSend("Analyze my skills")}>Analyze Skills</button>
                        <button className="chip" onClick={() => handleSend("Current trends")}>Market Trends</button>
                        <button className="chip" onClick={() => handleSend("Career transition")}>Pivot Advice</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chatbot;
