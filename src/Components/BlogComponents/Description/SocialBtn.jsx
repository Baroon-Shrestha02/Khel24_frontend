import { createElement } from "react";

export default function SocialBtn({ icon, cls, label, size = 15 }) {
  return (
    <button
      type="button"
      title={label}
      className={`w-9 h-9 rounded-lg flex items-center justify-center text-white transition-all duration-150 hover:scale-105 flex-shrink-0 ${cls}`}
    >
      {createElement(icon, { size })}
    </button>
  );
}
