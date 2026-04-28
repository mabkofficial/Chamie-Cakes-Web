import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const headingVariants = cva(
  "font-heading font-bold text-black tracking-tight",
  {
    variants: {
      size: {
        h1: "text-5xl md:text-7xl lg:text-8xl leading-[1.1]",
        h2: "text-4xl md:text-6xl leading-tight",
        h3: "text-3xl md:text-5xl leading-tight",
        h4: "text-2xl md:text-4xl leading-snug",
        h5: "text-xl md:text-2xl",
        h6: "text-lg md:text-xl",
      },
      align: {
        left: "text-left",
        center: "text-center",
        right: "text-right",
      },
    },
    defaultVariants: {
      size: "h2",
      align: "left",
    },
  }
)

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
}

function Heading({ className, size, align, as: Component = "h2", ...props }: HeadingProps) {
  return (
    <Component
      className={cn(headingVariants({ size, align }), className)}
      {...props}
    />
  )
}

export { Heading, headingVariants }
