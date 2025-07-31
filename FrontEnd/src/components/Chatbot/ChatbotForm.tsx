import { useRef } from "react";
import { FaArrowUp } from "react-icons/fa";

type ChatMessageType = {
  role: "user" | "bot";
  text: string;
  isError?: boolean;
};

type ChatFormProps = {
  chatHistory: ChatMessageType[];
  setChatHistory: React.Dispatch<React.SetStateAction<ChatMessageType[]>>;
  generateBotResponse: (history: ChatMessageType[]) => void;
};

const ChatForm = ({
  chatHistory,
  setChatHistory,
  generateBotResponse,
}: ChatFormProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userMessage = inputRef.current?.value.trim();
    if (!userMessage) return;
    inputRef.current!.value = "";

    // Update chat history
    setChatHistory((history) => [
      ...history,
      { role: "user", text: userMessage },
    ]);

    // Add a "Thinking..." placeholder
    // setTimeout(() => {
    //   setChatHistory((history) => [
    //     ...history,
    //     { role: "bot", text: "Thinking..." },
    //   ]);
    // }, 600);

    // Generate bot response
    generateBotResponse([...chatHistory, { role: "user", text: userMessage }]);
  };

  return (
    <form
      className="flex items-center bg-white rounded-full outline outline-1 outline-slate-300 shadow-md focus-within:outline-2 focus-within:outline-blue-800"
      onSubmit={handleFormSubmit}
    >
      <input
        ref={inputRef}
        type="text"
        placeholder="Message..."
        className="border-none outline-none w-full bg-transparent h-12 px-4 text-[0.95rem]"
        required
      />
      <button
        type="submit"
        className="h-9 w-9 text-white border-none outline-none flex-shrink-0 rounded-full bg-blue-800 cursor-pointer text-lg mr-1.5 hover:bg-blue-700 transition-colors duration-200 hidden [input:valid~&]:block"
      >
        <FaArrowUp className="mx-auto" />
      </button>
    </form>
  );
};

export default ChatForm;
