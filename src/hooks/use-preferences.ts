import { useLocalStorage } from "@mantine/hooks";
import { z } from "zod";

const preferencesSchema = z.object({
  defaultView: z.enum(["essentials", "favorites", "recents"]),
  roles: z.array(z.enum(["student", "employee"])),
});

type Preferences = z.infer<typeof preferencesSchema>;

const defaultPreferences: Preferences = {
  defaultView: "essentials",
  roles: ["student", "employee"],
};

export function usePreferences() {
  const [preferences, setPreferences] = useLocalStorage<Preferences>({
    key: "better-kpu-preferences",
    defaultValue: defaultPreferences,
    getInitialValueInEffect: false,
  });

  const validatedPreferences = preferencesSchema.safeParse(preferences);
  if (!validatedPreferences.success) setPreferences(defaultPreferences);

  const updatePreference = <T extends keyof Preferences>(
    key: T,
    value: Preferences[T],
  ) => {
    setPreferences((prev) => ({ ...prev, [key]: value }));
  };
  return { preferences, updatePreference };
}
