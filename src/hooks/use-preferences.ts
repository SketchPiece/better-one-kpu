import { useLocalStorage } from "@mantine/hooks";

export function usePreferences() {
  const [preferences, setPreferences] = useLocalStorage({
    key: "better-kpu-preferences",
    defaultValue: {
      defaultView: "essentials",
      roles: ["student", "teacher"],
    },
  });

  type Preferences = typeof preferences;

  const updatePreference = <T extends keyof Preferences>(
    key: T,
    value: Preferences[T],
  ) => {
    setPreferences((prev) => ({ ...prev, [key]: value }));
  };
  return { preferences, updatePreference };
}
