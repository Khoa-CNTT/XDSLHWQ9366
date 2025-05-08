import { useEffect, useRef, useState } from "react";
import { FaRobot } from "react-icons/fa";
import {
  MdClose,
  MdKeyboardArrowDown,
  MdModeComment,
  MdWavingHand,
} from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import ChatForm from "../../components/Chatbot/ChatbotForm";
import ChatMessage from "../../components/Chatbot/ChatbotMessage";

type ChatMessageType = {
  role: "user" | "bot";
  text: string;
  isError?: boolean;
};

const Chatbot = () => {
  const [chatHistory, setChatHistory] = useState<ChatMessageType[]>([]);
  const [showChatbot, setShowChatbot] = useState(false);
  const chatBodyRef = useRef<HTMLDivElement>(null);

  const generateBotResponse = async (history: ChatMessageType[]) => {
    const updateHistory = (text: string, isError: boolean) => {
      setChatHistory((prev) => [
        ...prev.filter((msg) => msg.text !== "Thinking..."),
        { role: "bot", text, isError },
      ]);
    };

    const formattedHistory = history.map(({ role, text }) => ({
      role: role === "bot" ? "model" : "user",
      parts: [{ text }],
    }));

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: formattedHistory }),
    };

    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL,
        requestOptions
      );
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error.message || "Something went wrong");

      const apiResponseText = data.candidates[0].content.parts[0].text
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .trim();

      updateHistory(apiResponseText, false);
    } catch (error) {
      const err = error as Error;
      updateHistory(err.message, true);
    }
  };

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({
        top: chatBodyRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chatHistory]);

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setShowChatbot((prev) => !prev)}
        className="fixed bottom-8 right-9 border-none w-12 h-12 cursor-pointer bg-primary hover:bg-blue-800 rounded-full flex items-center justify-center transition-all duration-200 z-50"
      >
        <AnimatePresence mode="wait" initial={false}>
          {showChatbot ? (
            <motion.span
              key="close"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
              className="text-white absolute"
            >
              <MdClose size={24} />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
              transition={{ duration: 0.2 }}
              className="text-white absolute"
            >
              <MdModeComment size={24} />
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      {/* Chatbox */}
      <AnimatePresence>
        {showChatbot && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 100 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-[90px] right-9 w-[420px] bg-white overflow-hidden rounded-2xl shadow-2xl origin-bottom-right z-50"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-primary">
              <div className="flex gap-2.5 items-center">
                <FaRobot className="h-9 w-9 p-1.5 flex-shrink-0 text-blue-800 bg-white rounded-full" />
                <h2 className="text-black text-xl font-semibold">Chatbot</h2>
              </div>
              <button
                onClick={() => setShowChatbot(false)}
                className="h-12 w-12 flex items-center justify-center text-white text-2xl bg-primary rounded-full shadow-md hover:bg-blue-800 transition duration-200"
              >
                <MdKeyboardArrowDown />
              </button>
            </div>

            {/* Chat body */}
            <div
              ref={chatBodyRef}
              className="flex flex-col gap-5 p-6 h-[460px] overflow-y-auto mb-[82px] scrollbar-thin scrollbar-thumb-purple-200 scrollbar-track-transparent"
            >
              {/* Welcome Message */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex gap-3 items-center"
              >
                <FaRobot className="h-9 w-9 p-1.5 flex-shrink-0 fill-white self-end mb-0.5 bg-blue-800 rounded-full" />
                <p className="p-3 max-w-[75%] break-words whitespace-pre-line text-[0.95rem] bg-blue-50 rounded-[13px_13px_13px_3px]">
                  Hey there{" "}
                  <MdWavingHand size={12} className="inline text-orange-500" />
                  <br /> How can I help you?
                </p>
              </motion.div>

              {/* Chat Messages */}
              {chatHistory.map((chat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                >
                  <ChatMessage chat={chat} />
                </motion.div>
              ))}
            </div>

            {/* Chat Form */}
            <div className="absolute bottom-0 w-full bg-white p-4 pb-5">
              <ChatForm
                chatHistory={chatHistory}
                setChatHistory={setChatHistory}
                generateBotResponse={generateBotResponse}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
