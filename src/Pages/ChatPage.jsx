import React, { useState } from 'react';
import ChatWidget from '../components/Chatwidget';

export default function ChatPage() {
  const [isChatOpen, setIsChatOpen] = useState(true);

  // 1. Setup the Welcome Card Data
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'card',
      sender: 'bot',
      text: 'Hi there !!',
      timestamp: '11:30 AM',
      image: 'https://cdn3d.iconscout.com/3d/premium/thumb/cute-robot-say-hello-9993356-8153406.png?f=webp', 
      action: {
        label: "Let's Get Started",
        payload: 'START_CONVERSATION'
      }
    }
  ]);

  // 2. Handle User Interactions
  const handleAction = (payload) => {
    if (payload === 'START_CONVERSATION') {
      // User replies
      const userResponse = {
        id: Date.now(),
        type: 'text',
        sender: 'user',
        text: "I'd like to get started!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, userResponse]);

      // Bot replies
      setTimeout(() => {
        const botReply = {
          id: Date.now() + 1,
          type: 'text',
          sender: 'bot',
          text: 'Awesome! How can I help you today?',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages((prev) => [...prev, botReply]);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      
      {/* Background Button to reopen chat if closed */}
      {!isChatOpen && (
        <button 
          onClick={() => setIsChatOpen(true)}
          className="px-6 py-3 bg-blue-600 text-white rounded shadow-lg hover:bg-blue-700"
        >
          Open Chat
        </button>
      )}

      {/* The Widget */}
      {isChatOpen && (
        <ChatWidget 
          messages={messages} 
          onClose={() => setIsChatOpen(false)} 
          onAction={handleAction}
        />
      )}
    </div>
  );
}