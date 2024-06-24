import { PropsWithChildren } from "react";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "./tooltip";

interface SimpleTooltipProps extends PropsWithChildren {
  content: string;
  disabled?: boolean;
  open?: boolean;
  side?: "top" | "bottom" | "left" | "right";
}

export default function SimpleTooltip({
  children,
  content,
  disabled,
  open,
  side,
}: SimpleTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip open={open}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        {!disabled && (
          <TooltipContent side={side}>
            <p>{content}</p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
}
