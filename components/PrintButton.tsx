"use client";

export default function PrintButton({ label }: { label: string }) {
  return (
    <button
      onClick={() => window.print()}
      className="bg-[#1a2744] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#2a3754] transition-colors"
    >
      🖨️ {label}
    </button>
  );
}
