import { Application } from "@/providers/types/definition";
import { X } from "lucide-react";
import { useState } from "react";

export default function ChatBox({
  user,
  onClose,
}: {
  user: Application;
  onClose: () => void;
}) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { sender: "them", text: "Xin chào! tôi là ứng viên." },
  ]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setMessages((prev) => [...prev, { sender: "me", text: message }]);
    setMessage("");
  };
  return (
    <div className="w-80 h-[450px] bg-white dark:bg-gray-800 shadow-lg rounded-lg border dark:border-gray-700 flex flex-col z-50">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b dark:border-gray-700">
        <div className="font-semibold text-sm text-gray-800 dark:text-white">
          {user.applicant?.dienThoai}
        </div>
        <button onClick={onClose}>
          <X className="w-4 h-4 text-gray-500 dark:text-gray-300" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 p-3 overflow-y-auto text-sm space-y-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender === "me" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-3 py-2 rounded-lg max-w-[70%] ${
                msg.sender === "me"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 dark:bg-gray-700 dark:text-white"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="p-2 border-t dark:border-gray-700">
        <div className="relative">
          <input
            type="text"
            placeholder="Nhập tin nhắn..."
            className="w-full px-3 pr-10 py-2 rounded-md border text-sm dark:bg-gray-800 dark:border-gray-600 dark:text-white outline-none"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          {message.trim().length > 0 && (
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Gửi
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
