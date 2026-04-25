"use client";

import Link from "next/link";
import { setLocalStorageValue, useLocalStorage } from "@/hooks/useLocalStorage";

interface ChecklistItemProps {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  href: string;
}

export default function ChecklistItem({ id, icon, title, subtitle, href }: ChecklistItemProps) {
  const storageKey = `checklist_done_${id}`;
  const checked = useLocalStorage(storageKey) === "1";

  function toggle(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const next = !checked;
    setLocalStorageValue(storageKey, next ? "1" : null);
  }

  return (
    <li className="flex items-center gap-3">
      <button
        onClick={toggle}
        aria-label={checked ? "Mark as incomplete" : "Mark as complete"}
        className={`flex-shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-colors ${
          checked
            ? "bg-green-600 border-green-600 text-white"
            : "border-gray-300 hover:border-green-400"
        }`}
      >
        {checked && (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7l4 4 6-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>
      <Link
        href={href}
        className={`flex-1 flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-3 hover:border-[#1a2744] transition-colors ${
          checked ? "opacity-50" : ""
        }`}
      >
        <span className="text-2xl w-8 text-center">{icon}</span>
        <div className="flex-1">
          <span className={`font-semibold text-gray-900 ${checked ? "line-through" : ""}`}>{title}</span>
          <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>
        </div>
        <span className="text-gray-300 text-lg">›</span>
      </Link>
    </li>
  );
}
