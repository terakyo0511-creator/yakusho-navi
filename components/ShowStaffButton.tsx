"use client";

import { useState } from "react";

interface ShowStaffButtonProps {
  label: string;
  jaTitle: string;
  jaDocuments: Array<{ icon: string; name: string }>;
  tapBackLabel: string;
  documentsLabel: string;
}

export default function ShowStaffButton({
  label,
  jaTitle,
  jaDocuments,
  tapBackLabel,
  documentsLabel,
}: ShowStaffButtonProps) {
  const [open, setOpen] = useState(false);

  if (open) {
    return (
      <div
        className="fixed inset-0 bg-white z-50 overflow-auto"
        onClick={() => setOpen(false)}
      >
        <div className="min-h-screen flex flex-col items-center justify-center p-8 cursor-pointer">
          <p className="text-gray-400 text-sm mb-6">{tapBackLabel}</p>

          <div className="w-full max-w-lg border-2 border-[#1a2744] rounded-2xl p-8 text-center">
            <p className="text-base text-gray-500 mb-2">この手続きをお願いします</p>
            <h2 className="text-5xl font-bold text-[#1a2744] mb-6 leading-tight">{jaTitle}</h2>

            <div className="border-t border-gray-200 pt-5 text-left">
              <p className="text-gray-500 font-semibold text-base mb-4 text-center">{documentsLabel}</p>
              <div className="space-y-3">
                {jaDocuments.map((doc, i) => (
                  <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
                    <span className="text-2xl">{doc.icon}</span>
                    <span className="font-semibold text-[#1a2744] text-xl">{doc.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-gray-400 text-xs mt-6">cityhall-guide.vercel.app</p>
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
      🗣️ <span className="hidden sm:inline">{label}</span>
    </button>
  );
}
