"use client";

import { useState } from "react";

interface Document {
  icon: string;
  name: string;
  note?: string | null;
}

export default function DocumentCheckboxList({ documents }: { documents: Document[] }) {
  const [checked, setChecked] = useState<boolean[]>(() => documents.map(() => false));

  function toggle(i: number) {
    setChecked((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
  }

  return (
    <ul className="space-y-2">
      {documents.map((doc, i) => (
        <li
          key={i}
          onClick={() => toggle(i)}
          className={`flex items-start gap-3 rounded-lg px-4 py-3 cursor-pointer select-none transition-colors ${
            checked[i] ? "bg-green-50" : "bg-blue-50 hover:bg-blue-100"
          }`}
        >
          <div
            className={`flex-shrink-0 mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
              checked[i] ? "bg-green-600 border-green-600" : "border-gray-400"
            }`}
          >
            {checked[i] && (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
          <span className="text-2xl flex-shrink-0">{doc.icon}</span>
          <div>
            <span className={`font-semibold ${checked[i] ? "line-through text-gray-400" : "text-gray-900"}`}>
              {doc.name}
            </span>
            {doc.note && <p className="text-sm text-gray-600 mt-0.5">{doc.note}</p>}
          </div>
        </li>
      ))}
    </ul>
  );
}
