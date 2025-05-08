import { FaRobot } from "react-icons/fa";

type ChatMessageType = {
  role: "user" | "bot";
  text: string;
  isError?: boolean;
};

type ChatMessageProps = {
  chat: ChatMessageType;
};

const ChatMessage = ({ chat }: ChatMessageProps) => {
  const isBot = chat.role === "bot";

  return (
    <div
      className={`flex ${isBot ? "gap-3 items-center" : "flex-col items-end"} ${
        chat.isError ? "text-red-600" : ""
      }`}
    >
      {isBot && (
        <FaRobot className="h-9 w-9 p-1.5 flex-shrink-0 fill-white self-end mb-0.5 bg-blue-800 rounded-full" />
      )}
      <p
        className={`p-3 max-w-[75%] break-words whitespace-pre-line text-[0.95rem] ${
          isBot
            ? "bg-blue-50 rounded-[13px_13px_13px_3px]"
            : "text-white bg-blue-800 rounded-[13px_13px_3px_13px]"
        }`}
      >
        {chat.text}
      </p>
    </div>
  );
};

export default ChatMessage;
