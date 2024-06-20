import kpuApi from "@/lib/kpu-api";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useServicesInfiniteQuery() {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["other-services"],
    queryFn: ({ pageParam }) =>
      kpuApi.getAllServices({ pageNumber: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.page + 1 : null,
  });

  const flatPagesData = data?.pages.flatMap((page) => page.data);

  return {
    data: flatPagesData,
    fetchNextPage,
    hasNextPage,
  };
}
