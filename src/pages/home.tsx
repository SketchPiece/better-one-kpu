import Header from "@/components/header";
import ServiceCard from "@/components/service-card";
import { Separator } from "@/components/ui/separator";
import kpuApi from "@/lib/kpu-api";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useDebouncedState } from "@mantine/hooks";
import FiltersDialog from "@/components/filters-dialog";
import QuickFilters, { QuickFiltersValue } from "@/components/quick-filters";
import { resolveImageUrl } from "@/lib/utils";
import Greeting from "@/components/greeting";
import { Fragment, useState } from "react";
import { Service } from "@/lib/kpu-api/types";
import ServiceCardSkeleton from "@/components/service-card-skeleton";
import { useServicesInfiniteQuery } from "@/hooks/api/use-services-infinite-query";
import InfiniteScroll from "react-infinite-scroll-component";

function defineServices(
  key: QuickFiltersValue,
  services?: Record<string, Service[]>,
) {
  if (key === "essentials") return services?.essentials;
  else if (key === "favorites") return services?.favorites;
  else if (key === "recent") return services?.recent;
  return undefined;
}

function filterOtherServices(services: Service[], ids: number[]) {
  return services.filter((service) => !ids.includes(service.id));
}

export default function Home() {
  const [searchText, setSearchText] = useDebouncedState("", 500);
  const [selectedQuickFilter, setSelectedQuickFilter] =
    useState<QuickFiltersValue>("essentials");

  const { data: services, isLoading } = useQuery({
    queryKey: ["services", searchText],
    queryFn: () => kpuApi.getQuickServices(searchText),
  });
  // const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
  //   queryKey: ["other-services"],
  //   queryFn: ({ pageParam }) =>
  //     kpuApi.getAllServices({ pageNumber: pageParam }),
  //   initialPageParam: 0,
  //   getNextPageParam: (lastPage) =>
  //     lastPage.hasNextPage ? lastPage.page + 1 : null,
  // });
  const {
    data: otherServices,
    fetchNextPage,
    hasNextPage,
  } = useServicesInfiniteQuery();
  const handleLoadMore = () => {
    fetchNextPage();
  };

  // console.log("infinite data", data);

  const handleQuickFilterChange = (value: QuickFiltersValue) => {
    setSelectedQuickFilter(value);
  };

  const quickServices = defineServices(selectedQuickFilter, services);
  const quickServicesIds = quickServices?.map(({ id }) => id) || [];
  const otherServicesFiltered = filterOtherServices(
    otherServices || [],
    quickServicesIds,
  );

  return (
    <div>
      <Header onSearchTextChange={setSearchText} />
      <main className="mt-8 px-6">
        <div className="flex justify-between">
          <Greeting name="Andrew" />
          <div className="flex items-center gap-4">
            <QuickFilters
              value={selectedQuickFilter}
              onChange={handleQuickFilterChange}
            />
            <Separator orientation="vertical" className="h-8" />
            <FiltersDialog />
          </div>
        </div>
        <div className="my-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {isLoading ? (
            <ServiceCardSkeleton amount={8} />
          ) : (
            quickServices?.map(
              ({ title, description, image, uniqueKey, id }) => (
                <ServiceCard
                  key={uniqueKey}
                  devId={id}
                  title={title}
                  image={resolveImageUrl(image)}
                  description={description}
                  // href={`launch-task/all/${uniqueKey}`}
                />
              ),
            )
          )}
        </div>
        <h2 className="mt-12 text-3xl font-medium">Other Services</h2>
        <div className="">
          {isLoading ? (
            <ServiceCardSkeleton amount={8} />
          ) : (
            <InfiniteScroll
              className="relative my-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4"
              dataLength={otherServicesFiltered.length}
              next={fetchNextPage}
              hasMore={hasNextPage}
              loader={<ServiceCardSkeleton amount={8} />}
            >
              {otherServicesFiltered.map(
                ({ title, description, image, uniqueKey, id }) => (
                  <ServiceCard
                    key={uniqueKey}
                    devId={id}
                    title={title}
                    image={resolveImageUrl(image)}
                    description={description}
                    href={`launch-task/all/${uniqueKey}`}
                  />
                ),
              )}
            </InfiniteScroll>
          )}
        </div>
      </main>
    </div>
  );
}
