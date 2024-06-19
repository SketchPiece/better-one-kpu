import Header from "@/components/header";
import { Icons } from "@/components/icons";
import ServiceCard from "@/components/service-card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import kpuApi from "@/lib/kpu-api";
import { useQuery } from "@tanstack/react-query";
import { useDebouncedState } from "@mantine/hooks";
import FiltersDialog from "@/components/filters-dialog";

export default function Home() {
  const [searchText, setSearchText] = useDebouncedState("", 500);
  const { data: services, isLoading } = useQuery({
    queryKey: ["services", searchText],
    queryFn: () => kpuApi.getServices(searchText),
  });
  const [selectedTab, setSelectedTab] = useState<string>("essentials");
  console.log("services", services);
  return (
    <div>
      <Header onSearchTextChange={setSearchText} />
      <main className="mt-8 px-6">
        <div className="flex justify-between">
          <h1 className="text-4xl font-medium">Good evening, Andrew</h1>
          <div className="flex items-center gap-4">
            <Tabs
              defaultValue="essentials"
              value={selectedTab}
              onValueChange={(value) => setSelectedTab(value)}
            >
              <TabsList>
                <TabsTrigger value="essentials">
                  <Icons.circleCheck className="mr-2" /> Essentials
                </TabsTrigger>
                <TabsTrigger value="favorites">
                  <Icons.star className="mr-2" />
                  Favorites
                </TabsTrigger>
                <TabsTrigger value="popular">
                  <Icons.history className="mr-2" /> Recent
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <Separator orientation="vertical" className="h-8" />
            <FiltersDialog />
          </div>
        </div>
        <div className="my-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            services?.featured?.map(
              ({ title, description, image, uniqueKey }) => (
                <ServiceCard
                  key={uniqueKey}
                  title={title}
                  image={image}
                  description={description}
                  href={`launch-task/all/${uniqueKey}`}
                />
              ),
            )
          )}
        </div>
        <h2 className="mt-12 text-3xl font-medium">Other Services</h2>
        <div className="my-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            services?.other?.map(({ title, description, image, uniqueKey }) => (
              <ServiceCard
                key={uniqueKey}
                title={title}
                image={image}
                description={description}
                href={`launch-task/all/${uniqueKey}`}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
}
