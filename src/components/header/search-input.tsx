import { useHotkeys } from "@mantine/hooks";
import { ComponentProps, useEffect, useRef } from "react";
import { Icons } from "../icons";

type SearchInputProps = ComponentProps<"input">;

export default function SearchInput(props: SearchInputProps) {
  const searchInputRef = useRef<HTMLInputElement>(null);

  useHotkeys([["mod+k", () => searchInputRef.current?.focus()]]);

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") searchInputRef.current?.blur();
    });
  }, []);

  return (
    <div className="relative">
      <Icons.search className="absolute left-6 top-1/2 h-6 w-6 -translate-y-1/2" />
      <input
        ref={searchInputRef}
        type="text"
        placeholder="Search for services..."
        className="w-[37.5rem] rounded-full bg-gray-100 px-6 py-3.5 pl-16 font-medium transition-all placeholder:text-[#989898] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        {...props}
      />
    </div>
  );
}
