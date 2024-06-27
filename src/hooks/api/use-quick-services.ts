import { QuickFiltersValue } from "@/components/home/quick-filters";
import kpuApi from "@/lib/kpu-api";
import { Service } from "@/lib/kpu-api/types";
import { useQuery } from "@tanstack/react-query";
import { usePreferences } from "../use-preferences";
import { useEffect } from "react";

interface QuickServicesProps {
  quickFilter?: QuickFiltersValue;
  onServicesEmptyUpdate?: (data: Record<QuickFiltersValue, boolean>) => void;
}

function defineServices(
  key?: QuickFiltersValue,
  services?: Record<string, Service[]>,
) {
  if (key === "essentials") return services?.essentials;
  else if (key === "favorites") return services?.favorites;
  else if (key === "recents") return services?.recents;
  return undefined;
}

export function useQuickServices({
  quickFilter,
  onServicesEmptyUpdate,
}: QuickServicesProps) {
  const { preferences } = usePreferences();
  const { data: services, ...rest } = useQuery({
    queryKey: ["services", preferences.roles.sort().join(",")],
    queryFn: () => kpuApi.getQuickServices({ roles: preferences.roles }),
  });

  useEffect(() => {
    if (services)
      onServicesEmptyUpdate?.({
        essentials: services.essentials
          ? services.essentials.length === 0
          : true,
        favorites: services.favorites ? services.favorites.length === 0 : true,
        recents: services.recents ? services.recents.length === 0 : true,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [services]);

  const quickServices = defineServices(quickFilter, services);
  const quickServicesIds = quickServices?.map(({ id }) => id) || [];

  return {
    data: quickServices,
    dataIds: quickServicesIds,
    ...rest,
  };
}
