import React, { useState } from 'react';
import '../../pages/LiveChat/Style.css';
import { FaHeadset } from 'react-icons/fa';

const helpOptions = [
  "Booking Issue",
  "Payment Problem",
  "Service Delay",
  "Account Support",
  "Other"
];

const LiveChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [showHelpOptions, setShowHelpOptions] = useState(true);

  const handleSend = () => {
    if (input.trim() === '') return;
    setMessages(prev => [...prev, { from: 'user', text: input }]);
    setInput('');
    setTimeout(() => {
      setMessages(prev => [...prev, { from: 'support', text: "Thank you. We'll assist you shortly." }]);
    }, 1000);
    setShowHelpOptions(false);
  };

  const handleHelpOptionClick = (option) => {
    setMessages(prev => [
      ...prev,
      { from: 'user', text: option },
      { from: 'support', text: `You selected "${option}". Please describe your issue.` }
    ]);
    setShowHelpOptions(false);
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
                <div key={idx} className={`chat-message ${msg.from}`}>
                  {msg.text}
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
