import { JSX } from "react";

type SidebarButtonProps = {
  icon: JSX.Element;
  label: string;
  onClick: () => void;
};

function SidebarButton({ icon, label, onClick }: SidebarButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between px-2 py-2.5 font-medium rounded-lg hover:bg-gray-700 hover:text-white"
    >
      <div className="flex items-center">
        {icon}
        {label}
      </div>
    </button>
  );
}
export default SidebarButton;
