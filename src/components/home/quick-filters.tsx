import { useEffect, useState } from "react";
import { Icons } from "../icons";
import { cn } from "@/lib/utils";
import { Nullable } from "@/lib/types";
import SimpleTooltip from "../ui/simple-tooltip";
import { useUserProfileQuery } from "@/hooks/api/use-user-profile-query";

export type QuickFiltersValue = "essentials" | "favorites" | "recents";

interface QuickFiltersProps {
  value?: Nullable<QuickFiltersValue>;
  onChange?: (value: QuickFiltersValue) => void;
  authorized?: boolean;
}

export default function QuickFilters({
  value,
  onChange,
  authorized,
}: QuickFiltersProps) {
  const { data: userProfile, isLoading } = useUserProfileQuery();

  const [selectedValue, setSelectedValue] = useState<
    Nullable<QuickFiltersValue>
  >(value || null);

  useEffect(() => {
    const isNotEssentials = value !== null && value !== "essentials";
    const isNotAuthorized = !isLoading && !userProfile;

    if (isNotEssentials && isNotAuthorized) {
      setSelectedValue("essentials");
      onChange?.("essentials");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userProfile, isLoading, selectedValue]);

  const handleClick = (value: QuickFiltersValue) => {
    setSelectedValue(value);
    onChange?.(value);
  };

  useEffect(() => {
    if (value !== selectedValue && value !== undefined) setSelectedValue(value);
  }, [value, selectedValue]);

  return (
    <div className="flex items-center gap-4">
      <button
        type="button"
        onClick={() => handleClick("essentials")}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-full border border-[#EFEFEF] px-4 py-2.5 font-medium transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          selectedValue === "essentials" &&
            "border-primary bg-primary text-white",
        )}
      >
        <Icons.circleCheck className="mr-2" />
        Essentials
      </button>
      <SimpleTooltip content="Sign in to view favorites" disabled={authorized}>
        <button
          type="button"
          disabled={!authorized}
          onClick={() => authorized && handleClick("favorites")}
          className={cn(
            "inline-flex items-center justify-center whitespace-nowrap rounded-full border border-[#EFEFEF] px-4 py-2.5 font-medium transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50",
            selectedValue === "favorites" &&
              "border-primary bg-primary text-white",
          )}
        >
          <Icons.starOutline className="mr-2" />
          Favorites
        </button>
      </SimpleTooltip>
      <SimpleTooltip content="Sign in to view recents" disabled={authorized}>
        <button
          type="button"
          disabled={!authorized}
          onClick={() => authorized && handleClick("recents")}
          className={cn(
            "inline-flex items-center justify-center whitespace-nowrap rounded-full border border-[#EFEFEF] px-4 py-2.5 font-medium transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50",
            selectedValue === "recents" &&
              "border-primary bg-primary text-white",
          )}
        >
          <Icons.history className="mr-2" />
          Recents
        </button>
      </SimpleTooltip>
    </div>
  );
}
