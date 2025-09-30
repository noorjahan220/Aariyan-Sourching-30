"use client";
import { useState, useRef, useEffect } from "react";
import { FaTimes, FaUser, FaArrowUp } from "react-icons/fa";
import { RiRobot2Fill } from "react-icons/ri";

const GeminiModal = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello! How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef(null);

  // --- LOGIC (No changes here) ---
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);
    try {
      const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/gemini`;
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      const data = await res.json();
      setMessages([...newMessages, { role: "assistant", content: data.reply }]);
    } catch (error) {
      console.error("Error calling backend API:", error);
      setMessages([...newMessages, { role: "assistant", content: "⚠️ Sorry, something went wrong. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // --- UI COMPONENTS (All changes are below this line) ---

  const AssistantTypingIndicator = () => (
    <div className="p-4 flex justify-start">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 flex-shrink-0 bg-[#10A37F]y-600 flex items-center justify-center rounded-full">
          <RiRobot2Fill className="text-white" />
        </div>
        <div className="bg-gray-700 rounded-lg p-3 flex items-center">
          <span className="typing-dot"></span>
          <span className="typing-dot"></span>
          <span className="typing-dot"></span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed bottom-18 right-5 w-[280px] h-[400px] lg:w-[400px] lg:h-[600px] bg-gray-800 rounded-lg border border-gray-700 shadow-2xl flex flex-col z-50 text-white font-sans overflow-hidden">
      {/* Header */}
      <div className="bg-gray-900 p-3 flex items-center justify-between flex-shrink-0">
        <h2 className="font-semibold text-base">Ayria Assistant</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
          <FaTimes />
        </button>
      </div>

      {/* Messages */}
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex items-end gap-3 ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {/* AI Icon (only for assistant) */}
            {msg.role === "assistant" && (
              <div className="w-8 h-8 flex-shrink-0 bg-[#10A37F] flex items-center justify-center rounded-full">
                <RiRobot2Fill className="text-white" />
              </div>
            )}

            {/* Message Bubble */}
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                msg.role === "user"
                  ? "bg-blue-500 text-white rounded-br-none"
                  : "bg-gray-700 text-gray-200 rounded-bl-none"
              }`}
            >
              <p className="text-sm whitespace-pre-wrap leading-relaxed">
                {msg.content}
              </p>
            </div>

            {/* User Icon (only for user) */}
            {msg.role === "user" && (
              <div className="w-8 h-8 flex-shrink-0 bg-blue-500 flex items-center justify-center rounded-full">
                <FaUser className="text-white text-sm" />
              </div>
            )}
          </div>
        ))}
        {isLoading && <AssistantTypingIndicator />}
      </div>

      {/* Input Area */}
      <div className="bg-gray-900 p-3 flex-shrink-0">
        <div className="relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-gray-700 text-sm text-gray-200 rounded-lg p-3 pr-12 resize-none focus:border-[#10A37F] focus:ring-0 focus:outline-none border-2 border-transparent transition-colors no-scrollbar"
            placeholder="Message Assistant..."
            rows={1}
            style={{ minHeight: '48px', maxHeight: '120px' }}
            onInput={(e) => {
              e.target.style.height = 'auto';
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="absolute right-3 bottom-4 bg-[#10A37F] p-2 text-sm rounded-md text-white disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
          >
            <FaArrowUp />
          </button>
        </div>
      </div>

      {/* Styles for Typing Indicator */}
      <style jsx global>{`
        .typing-dot {
          display: inline-block;
          width: 7px;
          height: 7px;
          background-color: #9ca3af; /* gray-400 */
          border-radius: 50%;
          margin: 0 2px;
          animation: typing-blink 1.4s infinite both;
        }
        .typing-dot:nth-child(2) {
          animation-delay: 0.2s;
        }
        .typing-dot:nth-child(3) {
          animation-delay: 0.4s;
        }
        @keyframes typing-blink {
          0% { opacity: 0.2; }
          20% { opacity: 1; }
          100% { opacity: 0.2; }
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default GeminiModal;