import kpuApi from "@/lib/kpu-api";
import { UserProfile } from "@/lib/kpu-api/types";
import { useQuery } from "@tanstack/react-query";

function refineUser(profile?: UserProfile | null): UserProfile | null {
  if (!profile) return null;
  if (profile.email === "andrii.liubkin@student.kpu.ca")
    return { ...profile, greetingName: "Andrew", username: "Andrew Liubkin" };
  return profile;
}

export function useUserProfileQuery() {
  const { data, ...rest } = useQuery({
    queryKey: ["profile"],
    queryFn: () => kpuApi.getUserProfile(),
  });

  return {
    data: refineUser(data),
    ...rest,
  };
}
