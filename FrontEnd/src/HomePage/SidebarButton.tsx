import { JSX } from "react";

type SidebarButtonProps = {
  icon: JSX.Element;
  label: string;
  onClick: () => void;
  selected: boolean;
};

function SidebarButton({ icon, label, onClick, selected }: SidebarButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 p-2 rounded hover:bg-orange-100 ${
        selected ? "text-orange-500 font-semibold" : "text-gray-700"
      }`}
    >
      <div className="flex items-center">
        {icon}
        <span>{label}</span>
      </div>
    </button>
  );
}
export default SidebarButton;
