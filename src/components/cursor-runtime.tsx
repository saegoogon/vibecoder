"use client";

import { useEffect } from "react";
import { cursorSkinMap, defaultStudioData } from "@/lib/planmon";

const storageKey = "cursorverse-studio-v1";
const selectedSkinKey = "cursorverse-selected-skin";

function applySkin(code?: string) {
  const skin = cursorSkinMap[code || ""] ?? cursorSkinMap[defaultStudioData.selectedSkin];
  const root = document.documentElement;
  root.style.setProperty("--cursor-default", skin.defaultCursor);
  root.style.setProperty("--cursor-pointer", skin.pointerCursor);
}

function resolveStoredSkin() {
  const selected = window.localStorage.getItem(selectedSkinKey);
  if (selected) return selected;

  const raw = window.localStorage.getItem(storageKey);
  if (!raw) return defaultStudioData.selectedSkin;

  try {
    const parsed = JSON.parse(raw) as { selectedSkin?: string };
    return parsed.selectedSkin || defaultStudioData.selectedSkin;
  } catch {
    return defaultStudioData.selectedSkin;
  }
}

export default function CursorRuntime() {
  useEffect(() => {
    const sync = (code?: string) => {
      applySkin(code || resolveStoredSkin());
    };

    sync();

    const onStorage = () => sync();
    const onCustom = (event: Event) => {
      const detail = (event as CustomEvent<string>).detail;
      sync(detail);
    };

    window.addEventListener("storage", onStorage);
    window.addEventListener("cursor-skin-change", onCustom as EventListener);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("cursor-skin-change", onCustom as EventListener);
    };
  }, []);

  return null;
}
