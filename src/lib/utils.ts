import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function resolveImageUrl(url: string) {
  return url.startsWith("/service-images") ? chrome.runtime.getURL(url) : url;
}
