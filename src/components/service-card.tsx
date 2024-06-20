import { ComponentProps } from "react";
import { Icons } from "./icons";

interface ServiceCardProps extends ComponentProps<"a"> {
  devId?: number;
  title: string;
  description: string;
  image: string;
}

export default function ServiceCard({
  devId,
  title,
  description,
  image,
  ...props
}: ServiceCardProps) {
  return (
    <a
      // href="#"
      className="relative flex items-center justify-center gap-4 rounded-xl px-8 py-6 transition-all hover:bg-[#F9F9F9] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      {...props}
    >
      <img
        src={image}
        alt={title}
        className="h-20 w-20 rounded-full border border-[#F0F0F0] object-cover"
      />
      <div className="flex flex-col">
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="text-sm">{description}</p>
      </div>
      <div className="absolute left-3 top-3">{devId}</div>
      {/* <div className="absolute right-3 top-3">
        <Icons.star className="h-5 w-5" />
      </div> */}
    </a>
  );
}
