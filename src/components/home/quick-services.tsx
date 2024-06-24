import ServiceCardSkeleton from "./service-card-skeleton";
import { QuickFiltersValue } from "./quick-filters";
import { useQuickServices } from "@/hooks/api/use-quick-services";
import ServiceCard from "./service-card";
import { resolveImageUrl } from "@/lib/utils";
import { Nullable } from "@/lib/types";
import { useFavoriteMutation } from "@/hooks/api/use-favorite-mutation";

interface QuickServicesProps {
  filter: Nullable<QuickFiltersValue>;
}

export default function QuickServices({ filter }: QuickServicesProps) {
  const { isLoading, data } = useQuickServices({
    quickFilter: filter || undefined,
  });
  const { mutate: updateFavorite } = useFavoriteMutation();

  return (
    <div className="my-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
      {isLoading ? (
        <ServiceCardSkeleton amount={8} />
      ) : (
        data?.map(
          ({ id, title, description, image, uniqueKey, uid, favorite }) => (
            <ServiceCard
              key={uniqueKey}
              devId={id}
              title={title}
              image={resolveImageUrl(image)}
              description={description}
              favorite={favorite}
              href={`launch-task/all/${uniqueKey}`}
              onFavoriteChange={(favorite) => updateFavorite({ favorite, uid })}
            />
          ),
        )
      )}
    </div>
  );
}