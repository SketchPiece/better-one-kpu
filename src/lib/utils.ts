import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function resolveImageUrl(url: string) {
  return url.startsWith("/service-images") ? chrome.runtime.getURL(url) : url;
}

export function parseHtmlString(html: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const convertToObject = (node: HTMLElement | ChildNode) => {
    const obj: {
      type: string;
      attributes: Record<string, string>;
      children: Array<
        { type: "text"; value: string | null } | { type: string }
      >;
    } = {
      type: node.nodeName,
      attributes: {},
      children: [],
    };

    if ((node as HTMLElement)?.attributes) {
      for (const attr of (node as HTMLElement).attributes) {
        obj.attributes[attr.name] = attr.value;
      }
    }

    for (const child of node.childNodes) {
      if (child.nodeType === Node.TEXT_NODE) {
        obj.children.push({ type: "text", value: child.nodeValue });
      } else {
        obj.children.push(convertToObject(child));
      }
    }

    return obj;
  };

  return convertToObject(doc.body).children;
}
