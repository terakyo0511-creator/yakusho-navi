"use client";

import { useState } from "react";

interface ShowStaffButtonProps {
  label: string;
  jaTitle: string;
  jaDocuments: Array<{ icon: string; name: string }>;
}

export default function ShowStaffButton({ label, jaTitle, jaDocuments }: ShowStaffButtonProps) {
  const [open, setOpen] = useState(false);

  if (open) {
    return (
      <div
        className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center p-8 cursor-pointer"
        onClick={() => setOpen(false)}
      >
        <p className="text-gray-400 text-sm mb-8">タップして戻る / Tap to go back</p>
        <div className="text-center">
          <p className="text-lg text-gray-600 mb-2">この手続きをしたいです</p>
          <h2 className="text-5xl font-bold text-[#1a2744] mb-8">{jaTitle}</h2>
          <div className="text-left space-y-3">
            <p className="text-gray-600 font-semibold text-lg mb-3">持参書類：</p>
            {jaDocuments.map((doc, i) => (
              <div key={i} className="flex items-center gap-3 text-2xl">
                <span>{doc.icon}</span>
                <span className="font-semibold text-[#1a2744]">{doc.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => setOpen(true)}
      className="flex items-center gap-1.5 bg-[#1a2744] text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-[#2a3754] transition-colors"
    >
      🗣️ {label}
    </button>
  );
}
