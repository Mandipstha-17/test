import React, { useState } from "react";

function Chatbot() {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const handleSend = () => {
    if (message.trim()) {
      setChatHistory([
        ...chatHistory,
        {
          user: message,
          bot: "This is a placeholder response from the Gemini-powered chatbot.",
        },
      ]);
      setMessage("");
      // Add Gemini API integration here
    }
  };

  return (
    <div className="card">
      <h2>Gemini Chatbot</h2>
      <div className="chatbot-container">
        {chatHistory.map((chat, index) => (
          <div key={index}>
            <p>
              <strong>You:</strong> {chat.user}
            </p>
            <p>
              <strong>Bot:</strong> {chat.bot}
            </p>
          </div>
        ))}
      </div>
      <input
        type="text"
        className="chatbot-input"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
      />
      <button className="submit-button" onClick={handleSend}>
        Send
      </button>
    </div>
  );
}

export default Chatbot;
