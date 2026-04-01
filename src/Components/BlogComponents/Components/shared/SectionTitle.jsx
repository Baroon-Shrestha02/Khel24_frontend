export default function SectionTitle({ icon: Icon, label }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <Icon size={18} className="text-red-600 shrink-0" />
      <h2 className="font-extrabold text-lg text-slate-900 whitespace-nowrap">
        {label}
      </h2>
      <div className="flex-1 h-px bg-linear-to-r from-red-600 to-transparent" />
    </div>
  );
}
