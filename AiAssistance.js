import React, { useState } from "react";
import "./AiAssistance.css";

export default function AiAssistance() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: input }]);

    const res = await fetch("http://localhost:5000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();
    setMessages((prev) => [...prev, { sender: "bot", text: data.reply }]);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="ai-assistance-container">
      <header className="ai-header">
        <h2>📈 AI Stock Chatbot</h2>
      </header>

      <div className="ai-messages">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`message-container ${
              m.sender === "user" ? "user-container" : "bot-container"
            }`}
          >
            <div className={`message ${m.sender}-message`}>{m.text}</div>
          </div>
        ))}
      </div>

      <div className="ai-input-area">
        <div className="input-container">
          <textarea
            className="message-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask for TCS stock report..."
            rows={1}
          />
          <button className="send-button" onClick={sendMessage}>
            ➤
          </button>
        </div>
      </div>
    </div>
  );
}
