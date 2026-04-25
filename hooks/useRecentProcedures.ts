"use client";

import { getLocalStorageValue, setLocalStorageValue, useLocalStorage } from "@/hooks/useLocalStorage";

const recentProceduresKey = "recent_procedures";
const maxRecentProcedures = 5;

function parseRecentProcedures(value: string | null): string[] {
  if (!value) {
    return [];
  }

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === "string") : [];
  } catch {
    return [];
  }
}

export function useRecentProcedures(): string[] {
  return parseRecentProcedures(useLocalStorage(recentProceduresKey));
}

export function addRecentProcedure(id: string): void {
  const current = parseRecentProcedures(getLocalStorageValue(recentProceduresKey));
  const next = [id, ...current.filter((item) => item !== id)].slice(0, maxRecentProcedures);
  setLocalStorageValue(recentProceduresKey, JSON.stringify(next));
}
