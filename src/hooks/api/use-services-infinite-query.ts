import { CategoryValue } from "@/lib/categories";
import kpuApi from "@/lib/kpu-api";
import { useInfiniteQuery } from "@tanstack/react-query";
import { usePreferences } from "../use-preferences";

interface ServicesInfiniteQueryProps {
  searchQuery?: string;
  category?: CategoryValue | null;
}

export function useServicesInfiniteQuery({
  searchQuery,
  category,
}: ServicesInfiniteQueryProps) {
  const { preferences } = usePreferences();
  const { data, fetchNextPage, hasNextPage, ...rest } = useInfiniteQuery({
    queryKey: [
      "services",
      searchQuery,
      category,
      preferences.roles.sort().join(","),
    ],
    queryFn: ({ pageParam }) =>
      kpuApi.getAllServices({
        pageNumber: pageParam,
        searchQuery,
        category,
        roles: preferences.roles,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.page + 1 : null,
  });

  const flatPagesData = data?.pages.flatMap((page) => page.data);

  return {
    data: flatPagesData,
    fetchNextPage,
    hasNextPage,
    ...rest,
  };
}
