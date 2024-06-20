import { useEffect, useState } from "react";
import { Icons } from "./icons";
import { cn } from "@/lib/utils";

export type QuickFiltersValue = "essentials" | "favorites" | "recent" | null;

interface QuickFiltersProps {
  value?: QuickFiltersValue;
  onChange?: (value: QuickFiltersValue) => void;
}

export default function QuickFilters({ value, onChange }: QuickFiltersProps) {
  const [selectedValue, setSelectedValue] = useState<QuickFiltersValue>(
    value || "essentials",
  );

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
          "inline-flex items-center justify-center whitespace-nowrap rounded-full border border-[#EFEFEF] px-4 py-2.5 font-medium transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
          selectedValue === "essentials" &&
            "border-primary bg-primary text-white",
        )}
      >
        <Icons.circleCheck className="mr-2" />
        Essentials
      </button>
      <button
        type="button"
        onClick={() => handleClick("favorites")}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-full border border-[#EFEFEF] px-4 py-2.5 font-medium transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
          selectedValue === "favorites" &&
            "border-primary bg-primary text-white",
        )}
      >
        <Icons.star className="mr-2" />
        Favorites
      </button>
      <button
        type="button"
        onClick={() => handleClick("recent")}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-full border border-[#EFEFEF] px-4 py-2.5 font-medium transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
          selectedValue === "recent" && "border-primary bg-primary text-white",
        )}
      >
        <Icons.history className="mr-2" />
        Recent
      </button>
    </div>
  );
}
