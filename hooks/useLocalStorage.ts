"use client";

import { useSyncExternalStore } from "react";

const localStorageChangeEvent = "yakusho-navi-local-storage";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(localStorageChangeEvent, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(localStorageChangeEvent, callback);
  };
}

export function useLocalStorage(key: string): string | null {
  return useSyncExternalStore(
    subscribe,
    () => localStorage.getItem(key),
    () => null,
  );
}

export function setLocalStorageValue(key: string, value: string | null): void {
  if (value) {
    localStorage.setItem(key, value);
  } else {
    localStorage.removeItem(key);
  }

  window.dispatchEvent(new Event(localStorageChangeEvent));
}

export function getLocalStorageValue(key: string): string | null {
  return localStorage.getItem(key);
}
