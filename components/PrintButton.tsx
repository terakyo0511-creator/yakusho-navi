"use client";

export default function PrintButton({ label }: { label: string }) {
  return (
    <button
      onClick={() => window.print()}
      aria-label={label}
      className="bg-[#1a2744] text-white px-3 py-1.5 rounded-lg text-sm hover:bg-[#2a3754] transition-colors"
    >
      🖨️ <span className="hidden sm:inline">{label}</span>
    </button>
  );
}
