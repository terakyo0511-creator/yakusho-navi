"use client";

import { useState } from "react";
import { setLocalStorageValue, useLocalStorage } from "@/hooks/useLocalStorage";

interface DeadlineCountdownLabels {
  eventDateLabel: string;
  remainingLabel: string;
  overdueLabel: string;
  clearLabel: string;
  saveLabel: string;
}

interface DeadlineCountdownProps {
  procedureId: string;
  deadlineDays: number;
  fromKey: string;
  locale: string;
  labels: DeadlineCountdownLabels;
}

function parseIsoDateAsUtc(isoDate: string): number | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate);
  if (!match) {
    return null;
  }

  const [, year, month, day] = match;
  return Date.UTC(Number(year), Number(month) - 1, Number(day));
}

function todayUtcMidnight(): number {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "UTC",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const year = parts.find((part) => part.type === "year")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  const day = parts.find((part) => part.type === "day")?.value;

  return Date.UTC(Number(year), Number(month) - 1, Number(day));
}

export function calculateRemainingDays(eventDate: string, deadlineDays: number): number | null {
  const eventUtc = parseIsoDateAsUtc(eventDate);
  if (eventUtc === null) {
    return null;
  }

  const dueUtc = eventUtc + deadlineDays * 24 * 60 * 60 * 1000;
  return Math.ceil((dueUtc - todayUtcMidnight()) / (24 * 60 * 60 * 1000));
}

export default function DeadlineCountdown({
  procedureId,
  deadlineDays,
  fromKey,
  locale,
  labels,
}: DeadlineCountdownProps) {
  const storageKey = `event_date_${procedureId}`;
  const savedDate = useLocalStorage(storageKey);
  const [draftDate, setDraftDate] = useState("");
  const remainingDays = savedDate ? calculateRemainingDays(savedDate, deadlineDays) : null;

  function saveDate() {
    if (draftDate) {
      setLocalStorageValue(storageKey, draftDate);
    }
  }

  function clearDate() {
    setLocalStorageValue(storageKey, null);
    setDraftDate("");
  }

  if (!savedDate || remainingDays === null) {
    return (
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <label className="flex flex-1 flex-col gap-1 text-sm font-semibold text-gray-700">
            {labels.eventDateLabel}
            <input
              type="date"
              value={draftDate}
              onChange={(event) => setDraftDate(event.target.value)}
              lang={locale}
              aria-describedby={`${procedureId}-deadline-from`}
              className="h-10 rounded-md border border-gray-300 px-3 text-sm text-gray-900 outline-none focus:border-[#1a2744] focus:ring-2 focus:ring-[#1a2744]/10"
            />
          </label>
          <button
            type="button"
            onClick={saveDate}
            disabled={!draftDate}
            className="h-10 rounded-md bg-[#1a2744] px-4 text-sm font-bold text-white disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            {labels.saveLabel}
          </button>
        </div>
        <p id={`${procedureId}-deadline-from`} className="mt-2 text-xs text-gray-500">
          {fromKey}
        </p>
      </div>
    );
  }

  const isOverdue = remainingDays <= 0;
  const displayDays = isOverdue ? Math.abs(remainingDays) : remainingDays;
  const message = isOverdue
    ? labels.overdueLabel.replace("{days}", String(displayDays))
    : labels.remainingLabel.replace("{days}", String(displayDays));
  const tone = isOverdue || remainingDays <= 3 ? "text-red-700" : "text-green-700";

  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold text-gray-500">{labels.eventDateLabel}: {savedDate}</p>
          <p className={`mt-1 text-3xl font-bold ${tone}`}>{message}</p>
        </div>
        <button
          type="button"
          onClick={clearDate}
          className="h-9 rounded-md border border-gray-300 bg-white px-3 text-sm font-semibold text-gray-700 hover:border-[#1a2744]"
        >
          {labels.clearLabel}
        </button>
      </div>
    </div>
  );
}
