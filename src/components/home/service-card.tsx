import { ComponentProps, useState } from "react";
import { Icons } from "../icons";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useUserProfileQuery } from "@/hooks/api/use-user-profile-query";

interface ServiceCardProps extends ComponentProps<"a"> {
  devId?: number;
  title: string;
  description: string;
  image: string;
  favorite?: boolean;
  onFavoriteChange?: (favorite: boolean) => void;
}

export default function ServiceCard({
  devId,
  title,
  description,
  image,
  favorite,
  onFavoriteChange,
  ...props
}: ServiceCardProps) {
  const { data: userProfile } = useUserProfileQuery();
  const [isFavorite, setIsFavorite] = useState(favorite);

  const handleFavoriteChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setIsFavorite(!isFavorite);
    onFavoriteChange?.(!isFavorite);
  };

  return (
    <a
      className="group relative flex items-center justify-center gap-4 rounded-xl px-8 py-6 transition-all hover:bg-[#F9F9F9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      {...props}
    >
      {/* <div className="absolute left-3 top-3">{devId}</div> */}
      <img
        src={image}
        alt={title}
        className="h-20 w-20 rounded-full border border-[#F0F0F0] object-cover"
      />
      <div className="flex flex-1 flex-col">
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="text-sm">{description}</p>
      </div>
      {userProfile && (
        <Button
          tabIndex={-1}
          variant="ghost"
          size="icon"
          className={cn(
            "absolute right-3 top-3 opacity-0 transition-all group-hover:opacity-100",
            isFavorite && "opacity-100",
          )}
          onClick={handleFavoriteChange}
        >
          {isFavorite ? (
            <Icons.star className="h-5 w-5 text-yellow-400" />
          ) : (
            <Icons.starOutline className="h-5 w-5" />
          )}
        </Button>
      )}
    </a>
  );
}
