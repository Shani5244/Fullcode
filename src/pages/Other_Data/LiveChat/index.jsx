import React, { useState, useEffect } from 'react';
import './Style.css';
import { FaHeadset } from 'react-icons/fa';
import { sendMessage, getChatHistory, sendAutoMessage } from '../../../API/LiveChatApi';

const helpOptions = [
  "Booking Issue",
  "Payment Problem",
  "Service Delay",
  "Account Support",
  "Other"
];

const LiveChat = ({ userId, providerId }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [showHelpOptions, setShowHelpOptions] = useState(true);

  // ✅ Fetch chat history when component opens
  useEffect(() => {
    const fetchChatHistory = async () => {
      if (userId && providerId) {
        const data = await getChatHistory(userId, providerId);
        if (data?.success) setMessages(data.messages);
      }
    };

    if (isOpen) fetchChatHistory();
  }, [isOpen, userId, providerId]);

  const handleSend = async () => {
    if (input.trim() === '') return;

    setMessages(prev => [...prev, { sender: 'user', message: input }]);

    await sendMessage({ sender: 'user', userId, providerId, message: input });

    setInput('');

    // Auto response
    setTimeout(async () => {
      const autoData = await sendAutoMessage({ userId, providerId, message: "Thank you. We'll assist you shortly." });
      if (autoData) setMessages(prev => [...prev, autoData]);
    }, 1000);

    setShowHelpOptions(false);
  };

  const handleHelpOptionClick = async (option) => {
    const userMsg = { sender: 'user', message: option };
    const supportMsg = { sender: 'system', message: `You selected "${option}". Please describe your issue.` };
    
    setMessages(prev => [...prev, userMsg, supportMsg]);
    setShowHelpOptions(false);

    await sendMessage({ sender: 'user', userId, providerId, message: option });
    await sendAutoMessage({ userId, providerId, message: supportMsg.message });
  };

  return (
    <>
      <button className="chat-icon" onClick={() => setIsOpen(!isOpen)}>
        <FaHeadset size={22} />
      </button>

      {isOpen && (
        <div className="chat-box">
          <div className="chat-header">
            Live Support
            <button className="close-btn" onClick={() => setIsOpen(false)}>×</button>
          </div>

          <div className="chat-body">
            {showHelpOptions ? (
              <div className="help-options">
                <p>Select a topic:</p>
                {helpOptions.map((option, idx) => (
                  <button key={idx} onClick={() => handleHelpOptionClick(option)} className="help-btn">
                    {option}
                  </button>
                ))}
              </div>
            ) : (
              messages.map((msg, idx) => (
                <div key={idx} className={`chat-message ${msg.sender}`}>
                  {msg.message || msg.text}
                </div>
              ))
            )}
          </div>

          <div className="chat-input">
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button onClick={handleSend}>➤</button>
          </div>
        </div>
      )}
    </>
  );
};

export default LiveChat;
