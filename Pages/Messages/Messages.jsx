"use client";

import { useState } from 'react';

// Mock data for messages
const conversations = [
  {
    id: 1,
    customer: {
      name: "Sarah Johnson",
      avatar: "/api/placeholder/40/40",
      lastActive: "2 hours ago"
    },
    lastMessage: "Hi, I'm interested in the summer linen dress. Do you have it in size M?",
    unread: 3,
    date: "2023-06-15T14:30:00Z"
  },
  {
    id: 2,
    customer: {
      name: "Michael Chen",
      avatar: "/api/placeholder/40/40",
      lastActive: "5 hours ago"
    },
    lastMessage: "When will my order #ORD-7842 be shipped?",
    unread: 0,
    date: "2023-06-15T10:15:00Z"
  },
  {
    id: 3,
    customer: {
      name: "Emma Wilson",
      avatar: "/api/placeholder/40/40",
      lastActive: "1 day ago"
    },
    lastMessage: "Thanks for your help with the return process!",
    unread: 0,
    date: "2023-06-14T16:45:00Z"
  },
  {
    id: 4,
    customer: {
      name: "James Rodriguez",
      avatar: "/api/placeholder/40/40",
      lastActive: "2 days ago"
    },
    lastMessage: "Do you offer custom tailoring services?",
    unread: 1,
    date: "2023-06-13T09:20:00Z"
  }
];

const messagesData = {
  1: [
    {
      id: 1,
      sender: "customer",
      content: "Hi, I'm interested in the summer linen dress. Do you have it in size M?",
      timestamp: "2023-06-15T14:30:00Z"
    },
    {
      id: 2,
      sender: "admin",
      content: "Hello Sarah! Yes, we have the linen dress in size M. It's currently in stock.",
      timestamp: "2023-06-15T14:35:00Z"
    },
    {
      id: 3,
      sender: "customer",
      content: "That's great! What about the color options?",
      timestamp: "2023-06-15T14:40:00Z"
    },
    {
      id: 4,
      sender: "admin",
      content: "We have it in beige, navy blue, and olive green. Which color are you interested in?",
      timestamp: "2023-06-15T14:42:00Z"
    },
    {
      id: 5,
      sender: "customer",
      content: "I think the olive green would be perfect for summer. Can you hold one for me?",
      timestamp: "2023-06-15T14:45:00Z"
    }
  ]
};

const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [view, setView] = useState('conversations'); // 'conversations' or 'chat'

  const filteredConversations = conversations.filter(conv => 
    conv.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    
    // In a real app, you would send this message to your backend
    console.log("Sending message:", newMessage);
    setNewMessage('');
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleSelectConversation = (id) => {
    setSelectedConversation(id);
    setView('chat');
  };

  const handleBackToConversations = () => {
    setView('conversations');
  };

  return (
    <div className="w-full my-7">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <h1 className="text-2xl font-bold text-gray-800 lg:mb-5">Messages</h1>
        <p className="text-sm text-gray-500">Manage customer inquiries and conversations</p>
      </div>

      <div className="flex-1 overflow-hidden">
        {view === 'conversations' ? (
          /* Conversation List View */
          <div className="bg-white h-full overflow-y-auto">
            <div className="p-4 border-b border-gray-200 sticky top-0 bg-white z-10">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search conversations..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <svg
                  className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
            </div>

            <div className="divide-y divide-gray-100">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => handleSelectConversation(conversation.id)}
                >
                  <div className="flex items-start space-x-3">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-gray-600 font-medium">
                          {conversation.customer.name.charAt(0)}
                        </span>
                      </div>
                      {conversation.unread > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {conversation.unread}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-gray-900 truncate">
                          {conversation.customer.name}
                        </h3>
                        <span className="text-xs text-gray-500">
                          {formatTime(conversation.date)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 truncate mt-1">
                        {conversation.lastMessage}
                      </p>
                      <div className="flex items-center mt-1">
                        <span
                          className={`inline-block w-2 h-2 rounded-full mr-1 ${
                            conversation.customer.lastActive.includes('hour') 
                              ? 'bg-green-500' 
                              : 'bg-gray-400'
                          }`}
                        ></span>
                        <span className="text-xs text-gray-500">
                          {conversation.customer.lastActive}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Chat View */
          <div className="flex flex-col h-full">
            {/* Chat Header */}
            <div className="bg-white border-b border-gray-200 p-4 flex items-center">
              <button 
                onClick={handleBackToConversations}
                className="mr-3 p-1 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                <span className="text-gray-600 font-medium">
                  {conversations.find(c => c.id === selectedConversation)?.customer.name.charAt(0)}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">
                  {conversations.find(c => c.id === selectedConversation)?.customer.name}
                </h3>
                <p className="text-sm text-gray-500">
                  Last active: {conversations.find(c => c.id === selectedConversation)?.customer.lastActive}
                </p>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </button>
                <button className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              <div className="space-y-4">
                {messagesData[selectedConversation]?.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'admin' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.sender === 'admin'
                          ? 'bg-yellow-500 text-white'
                          : 'bg-white border border-gray-200 text-gray-800'
                      }`}
                    >
                      <p>{message.content}</p>
                      <p className={`text-xs mt-1 ${message.sender === 'admin' ? 'text-yellow-100' : 'text-gray-500'}`}>
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Message Input */}
            <div className="bg-white border-t border-gray-200 p-4">
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                  onClick={handleSendMessage}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;