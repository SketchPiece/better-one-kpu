import { useEffect } from "react";
import { usePreferences } from "./use-preferences";

export function useColorAppearance() {
  const {
    preferences: { appearance },
  } = usePreferences();

  useEffect(() => {
    if (
      appearance === "dark" ||
      (appearance !== "light" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [appearance]);
}
