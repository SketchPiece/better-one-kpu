import { useLocalStorage } from "@mantine/hooks";
import { z } from "zod";
import { useUserProfileQuery } from "./api/use-user-profile-query";

const preferencesSchema = z.object({
  defaultView: z.enum(["essentials", "favorites", "recents"]),
  roles: z.array(z.enum(["student", "employee"])),
  appearance: z.enum(["dark", "light", "system"]),
});

type Preferences = z.infer<typeof preferencesSchema>;

const defaultPreferences: Preferences = {
  defaultView: "essentials",
  roles: ["student", "employee"],
  appearance: "system",
};

export function usePreferences() {
  const { data: userProfile } = useUserProfileQuery();
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
  return {
    preferences: {
      ...preferences,
      roles: !userProfile ? ["student", "employee"] : preferences.roles,
    } as Preferences,
    updatePreference,
  };
}
