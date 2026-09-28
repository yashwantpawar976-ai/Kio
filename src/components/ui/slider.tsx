import type { ComponentProps } from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

type SliderProps = ComponentProps<typeof SliderPrimitive.Root>;

export function Slider({ className, ...props }: SliderProps) {
  return (
    <SliderPrimitive.Root
      className={cn(
        "relative flex h-11 w-full touch-none items-center select-none",
        className,
      )}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-1 w-full grow overflow-hidden rounded-full bg-surface-2">
        <SliderPrimitive.Range className="absolute h-full bg-accent" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb
        className="block size-5 rounded-full bg-fg shadow-[var(--shadow-border)] transition-[box-shadow,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        aria-label="Target size"
      />
    </SliderPrimitive.Root>
  );
}
