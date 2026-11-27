import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { Slot } from "radix-ui"

// shadcn/ui Button, tuned to this site: pill shape, three heights, and a primary
// that takes the current section's accent (--primary is set per section in
// globals.css). `onDark` is the outline button for the dark bands.
const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center gap-2.5 rounded-full border border-transparent bg-clip-padding text-sm font-medium tracking-[-.01em] whitespace-nowrap transition-[transform,box-shadow,background-color,border-color,color] duration-200 outline-none select-none hover:-translate-y-0.5 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:translate-y-0 active:scale-[.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary font-semibold text-primary-foreground shadow-[0_18px_44px_-16px_rgb(var(--brand-rgb)/.55),inset_0_1px_0_rgb(255_255_255/.3)] hover:bg-(--brand-hover) hover:shadow-[0_26px_60px_-20px_rgb(var(--brand-rgb)/.6),inset_0_1px_0_rgb(255_255_255/.3)]",
        outline:
          "border-input bg-background text-foreground hover:border-(--line-3) hover:bg-muted",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_6%)]",
        ghost: "text-foreground hover:translate-y-0 hover:bg-muted",
        link: "h-auto rounded-none p-0 text-brand-deep underline-offset-4 hover:translate-y-0 hover:underline",
        onDark:
          "border-white/20 bg-white/5 text-white hover:border-white/35 hover:bg-white/10",
      },
      size: {
        sm: "h-9 px-4 text-[13px]",
        default: "h-[46px] px-5",
        lg: "h-[54px] px-[26px] text-[15px]",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
