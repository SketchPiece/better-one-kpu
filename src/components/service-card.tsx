import { ComponentProps } from "react";

interface ServiceCardProps extends ComponentProps<"a"> {
  title: string;
  description: string;
  image: string;
}

export default function ServiceCard({
  title,
  description,
  image,
  ...props
}: ServiceCardProps) {
  return (
    <a
      href="#"
      className="flex items-center justify-center gap-4 rounded-xl px-8 py-6 transition-all hover:bg-[#F9F9F9] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      {...props}
    >
      <img
        src={image}
        alt={title}
        className="h-20 w-20 rounded-full object-cover"
      />
      <div className="flex flex-col">
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="text-sm">{description}</p>
      </div>
    </a>
  );
}
