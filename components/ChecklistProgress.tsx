"use client";

import { useCallback, useEffect, useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface ChecklistProgressProps {
  procedureIds: string[];
  labels: {
    progressLabel: string;
    allDoneLabel: string;
  };
}

interface ChecklistProgressWatcherProps {
  id: string;
  onChange: (id: string, done: boolean) => void;
}

function ChecklistProgressWatcher({ id, onChange }: ChecklistProgressWatcherProps) {
  const done = useLocalStorage(`checklist_done_${id}`) === "1";

  useEffect(() => {
    onChange(id, done);
  }, [done, id, onChange]);

  return null;
}

export default function ChecklistProgress({ procedureIds, labels }: ChecklistProgressProps) {
  const [doneMap, setDoneMap] = useState<Record<string, boolean>>({});
  const total = procedureIds.length;
  const done = procedureIds.filter((id) => doneMap[id]).length;
  const percent = total > 0 ? Math.round((done / total) * 100) : 0;

  const updateDone = useCallback((id: string, nextDone: boolean) => {
    setDoneMap((current) => (current[id] === nextDone ? current : { ...current, [id]: nextDone }));
  }, []);

  return (
    <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4">
      {procedureIds.map((id) => (
        <ChecklistProgressWatcher key={id} id={id} onChange={updateDone} />
      ))}
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-bold text-[#1a2744]">
          ✅ {labels.progressLabel.replace("{done}", String(done)).replace("{total}", String(total))}
        </p>
        {done === total && total > 0 && (
          <p className="text-sm font-bold text-green-700">🎉 {labels.allDoneLabel}</p>
        )}
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-100">
        <div className="h-full rounded-full bg-green-600 transition-all" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
