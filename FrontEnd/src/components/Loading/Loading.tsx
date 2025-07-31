import { FaSpinner } from "react-icons/fa";

const Loading = ({ message = "Loading..." }: { message?: string }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-20">
    <div className="flex flex-col items-center p-10 bg-white rounded-2xl shadow-xl  bg-opacity-20">
      <FaSpinner className="animate-spin text-primary text-5xl mb-4" />
      <p className="text-blue-900 text-xl font-semibold">{message}</p>
      <span className="text-gray-400 text-sm mt-2">
        Please wait a moment...
      </span>
    </div>
  </div>
);

export default Loading;
