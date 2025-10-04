// FILE TO REPLACE: src/components/Messages/Messages.js

"use client";

import { useState, useEffect, useRef } from "react";
import { Search, Phone, Send, ArrowLeft } from "lucide-react";
import io from "socket.io-client"; // This is REQUIRED here for the user-side connection
import useSingleUser from "../../Hooks/useSingleUser"; // Adjust path if needed

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const Messages = ({ socket: propSocket }) => {
  const { singleUser, isLoading } = useSingleUser();
  
  // This state will hold the active socket connection for this component
  const [socket, setSocket] = useState(null);

  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const role = singleUser?.role;

  // This intelligent useEffect hook manages the socket connection
  useEffect(() => {
    // SCENARIO 1: We are an admin, and the dashboard passed down an active socket.
    if (propSocket) {
      setSocket(propSocket);
      return; // Use the prop and do nothing else.
    }

    // SCENARIO 2: We are a regular user, so we must create our own connection.
    if (singleUser?._id && role === 'user') {
      const newSocket = io(API_URL);
      
      newSocket.on("connect", () => {
        console.log("User-side chat connected to socket server.");
        newSocket.emit("join", { userId: singleUser._id, role: singleUser.role });
      });
      
      setSocket(newSocket);

      // Cleanup: Disconnect this locally-created socket when the component unmounts.
      return () => {
        newSocket.disconnect();
      };
    }
  }, [propSocket, singleUser, role]);


  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <p className="text-gray-500">Initializing chat...</p>
      </div>
    );
  }

  if (!singleUser) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <p className="text-red-500">
          Authentication error. Please log in to view messages.
        </p>
      </div>
    );
  }

  // Listener for real-time UI updates within this component
  useEffect(() => {
    if (!socket) return; // Don't attach listener until a socket connection is established

    const messageListener = (incomingMessage) => {
      const isForAdminInSelectedChat =
        role === "admin" &&
        selectedConversation?.userId ===
          incomingMessage.conversationUserId?.toString();

      const isForCurrentUser = role === "user";

      if (isForAdminInSelectedChat || isForCurrentUser) {
        setMessages((prevMessages) => [...prevMessages, incomingMessage]);
      } else if (role === "admin") {
        setConversations((prevConvos) =>
          prevConvos.map((convo) => {
            if (
              convo.userId === incomingMessage.conversationUserId?.toString()
            ) {
              return {
                ...convo,
                unread: (convo.unread || 0) + 1,
                lastMessage: incomingMessage.content,
                lastMessageTimestamp: incomingMessage.timestamp,
              };
            }
            return convo;
          })
        );
      }
    };

    socket.on("newMessage", messageListener);

    return () => {
      socket.off("newMessage", messageListener);
    };
  }, [socket, role, selectedConversation]);

  // Effect for fetching historical messages
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        if (role === "admin") {
          const response = await fetch(`${API_URL}/api/conversations`);
          if (!response.ok) return;
          const data = await response.json();
          setConversations(data);

          if (selectedConversation) {
            const msgResponse = await fetch(
              `${API_URL}/api/conversations/${selectedConversation.userId}`
            );
            if (!msgResponse.ok) return;
            const msgData = await msgResponse.json();
            setMessages(msgData);
          }
        } else if (role === "user" && singleUser?._id) {
          const response = await fetch(
            `${API_URL}/api/conversations/${singleUser._id}`
          );
          if (!response.ok) return;
          const data = await response.json();
          setMessages(data);
        }
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };
    fetchHistory();
  }, [role, singleUser?._id, selectedConversation]);

  const handleSendMessage = () => {
    if (newMessage.trim() === "" || !socket) {
        if (!socket) console.error("Message not sent: Socket connection not available.");
        return;
    };

    let recipient;
    if (role === "admin") {
      if (!selectedConversation) return;
      recipient = { userId: selectedConversation.userId, role: "user" };
    } else {
      recipient = { userId: null, role: "admin" };
    }
    const messagePayload = {
      sender: {
        userId: singleUser._id,
        role: singleUser.role,
        name: singleUser.name,
      },
      recipient: recipient,
      content: newMessage,
    };

    socket.emit("sendMessage", messagePayload);
    const optimisticMessage = {
      senderId: singleUser._id,
      content: newMessage,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, optimisticMessage]);
    setNewMessage("");
  };

  const handleSelectConversation = (conv) => {
    setSelectedConversation({
      userId: conv.userId,
      customerName: conv.customerName,
    });
    setConversations((prevConvos) =>
      prevConvos.map((c) =>
        c.userId === conv.userId ? { ...c, unread: 0 } : c
      )
    );
  };

  const filteredConversations = conversations.filter((conv) =>
    conv.customerName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderAdminView = () => (
    <div className="flex h-full">
      <div className={` ${selectedConversation ? "hidden md:flex" : "flex"} w-full md:w-1/3 lg:w-[360px] flex-col bg-white border-r border-gray-200 transition-all duration-300`}>
        <div className="p-4 border-b border-gray-200 sticky top-0 bg-white z-10">
          <div className="relative">
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto no-scrollbar divide-y divide-gray-100">
          {filteredConversations.map((conv) => (
            <div key={conv._id} className="p-4 cursor-pointer hover:bg-gray-50" onClick={() => handleSelectConversation(conv)}>
              <div className="flex items-start space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center font-semibold shrink-0">
                    <span>{conv.customerName?.charAt(0)}</span>
                  </div>
                  {conv.unread > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {conv.unread}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold truncate">{conv.customerName}</h3>
                    {conv.lastMessageTimestamp && (
                      <span className="text-xs text-gray-500">
                        {new Date(conv.lastMessageTimestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 truncate mt-1">{conv.lastMessage}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={`${selectedConversation ? "flex" : "hidden"} md:flex w-full md:flex-1 flex-col bg-gray-50`}>
        {selectedConversation ? (
          <>
            <ChatHeader
              onBack={() => { setSelectedConversation(null); setMessages([]); }}
              name={selectedConversation.customerName}
              status="Online"
            />
            <MessageArea messages={messages} myUserId={singleUser._id} />
            <MessageInput
              value={newMessage}
              onChange={setNewMessage}
              onSend={handleSendMessage}
            />
          </>
        ) : (
          <div className="hidden md:flex flex-col items-center justify-center h-full text-center p-4">
            <p className="text-lg font-medium text-gray-600">Welcome, Admin!</p>
            <p className="text-sm text-gray-500">Select a conversation from the left to view messages.</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderUserView = () => (
    <div className="flex flex-col h-full bg-gray-50">
      <ChatHeader name="Admin Support" status="Typically replies within a few hours" />
      <MessageArea messages={messages} myUserId={singleUser._id} />
      <MessageInput value={newMessage} onChange={setNewMessage} onSend={handleSendMessage} />
    </div>
  );

  return (
    <div className="w-full h-[90vh] border border-gray-200 rounded-lg shadow-sm flex flex-col overflow-hidden">
      <div className="bg-white border-b border-gray-200 p-4 shrink-0">
        <h1 className="text-2xl font-bold text-gray-800">
          {role === "admin" ? "All Messages" : "Chat with Support"}
        </h1>
        <p className="text-sm text-gray-500">
          {role === "admin" ? "Manage customer conversations" : "We're here to help!"}
        </p>
      </div>
      <div className="flex-1 overflow-hidden">
        {role === "admin" ? renderAdminView() : renderUserView()}
      </div>
    </div>
  );
};

const ChatHeader = ({ name, status, onBack }) => (
  <div className="bg-white border-b border-gray-200 p-4 flex items-center shrink-0">
    {onBack && (
      <button onClick={onBack} className="md:hidden mr-3 p-1 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100">
        <ArrowLeft className="w-5 h-5" />
      </button>
    )}
    <div className={`w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-semibold shrink-0 ${onBack ? "mr-3" : "mr-4"}`}>
      <span>{name?.charAt(0)}</span>
    </div>
    <div className="flex-1 min-w-0">
      <h3 className="font-semibold text-gray-900 truncate">{name}</h3>
      <p className="text-sm text-gray-500 truncate">{status}</p>
    </div>
    <button className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100">
      <Phone className="w-5 h-5" />
    </button>
  </div>
);

const MessageArea = ({ messages, myUserId }) => {
  const messagesEndRef = useRef(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <div className="flex-1 overflow-y-auto no-scrollbar p-4">
      <div className="space-y-4">
        {messages.map((message, index) => {
          const isMine = message.senderId === myUserId;
          return (
            <div key={index} className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] sm:max-w-[70%] md:max-w-md px-4 py-2 text-base ${isMine ? "bg-yellow-500 text-black rounded-b-3xl rounded-tl-3xl" : "bg-white border border-gray-200 rounded-b-3xl rounded-tr-3xl text-gray-800"}`}>
                <p className="break-words">{message.content}</p>
                <p className={`text-[10px] mt-1 text-right ${isMine ? "text-gray-700" : "text-gray-700"}`}>
                  {new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

const MessageInput = ({ value, onChange, onSend }) => (
  <div className="bg-white border-t border-gray-200 p-2 sm:p-4 shrink-0">
    <div className="flex space-x-2 sm:space-x-3">
      <input
        type="text"
        placeholder="Type your message..."
        className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-500"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && onSend()}
      />
      <button
        className="bg-yellow-400 font-semibold text-black px-3 sm:px-4 py-2 rounded-lg hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 flex items-center justify-center"
        onClick={onSend}
      >
        <Send className="w-4 h-4 sm:mr-2" />
        <span className="hidden sm:inline">Send</span>
      </button>
    </div>
  </div>
);

export default Messages;