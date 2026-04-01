export default function Tag({ label, colorClass = "bg-red-600" }) {
  return (
    <span
      className={`${colorClass} text-white text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wide`}
    >
      {label}
    </span>
  );
}
