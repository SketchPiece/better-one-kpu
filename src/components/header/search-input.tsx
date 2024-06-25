import { useHotkeys, useOs } from "@mantine/hooks";
import { ComponentProps, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icons } from "../icons";
import { cn } from "@/lib/utils";

type SearchInputProps = ComponentProps<"input">;

interface KbdProps extends ComponentProps<"kbd"> {
  modKey: "command" | "ctrl";
}

function Kbd({ modKey, children, className, ...props }: KbdProps) {
  return (
    <kbd
      className={cn(
        "inline-flex items-center gap-0.5 space-x-0.5 rounded-lg border border-gray-200 bg-[#F4F4F5] px-1.5 py-0.5 text-center font-sans text-sm font-medium text-gray-600 shadow-md rtl:space-x-reverse dark:border-[#333336] dark:bg-[#27272A] dark:text-[#D3D3D3]",
        className,
        // "font-inter",
      )}
      {...props}
    >
      {modKey === "command" ? (
        <abbr className="no-underline" title="Command">
          ⌘
        </abbr>
      ) : (
        <abbr className="no-underline" title="Control">
          <svg
            width="10"
            height="7"
            viewBox="0 0 10 7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mb-1.5 inline-block"
          >
            <path
              d="M1.87473 6.13281L0.731268 4.98438L4.99689 0.71875L9.26252 4.98438L8.11905 6.13281L4.99689 3.01562L1.87473 6.13281Z"
              fill="currentColor"
            />
          </svg>
        </abbr>
      )}
      <span>{children}</span>
    </kbd>
  );
}

export default function SearchInput(props: SearchInputProps) {
  const os = useOs();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);

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
        placeholder="Search for service..."
        className="w-[37.5rem] rounded-full bg-gray-100 px-6 py-3.5 pl-16 font-medium transition-all placeholder:text-[#989898] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:bg-[#2E2E2E] dark:ring-offset-dark-background dark:placeholder:text-[#747474]"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />

      <AnimatePresence>
        {!isFocused && (
          <motion.div
            key="kbd-focus"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Kbd
              data-hide-on-focus={isFocused}
              modKey={os === "macos" ? "command" : "ctrl"}
              className="absolute right-4 top-1/2 -translate-y-1/2"
            >
              K
            </Kbd>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
