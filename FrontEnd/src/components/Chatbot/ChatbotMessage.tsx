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

  // Hàm chuyển URL thành thẻ <a> với chữ "xem chi tiết"
  const renderMessage = (text: string) => {
    if (!isBot) return text;
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);
    return parts.map((part, idx) => {
      if (urlRegex.test(part)) {
        return (
          <a
            key={idx}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline ml-1"
          >
            XEM CHI TIẾT
          </a>
        );
      }
      return part;
    });
  };

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
        {renderMessage(chat.text)}
      </p>
    </div>
  );
};

export default ChatMessage;
