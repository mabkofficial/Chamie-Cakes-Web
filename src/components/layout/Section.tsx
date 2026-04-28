import * as React from "react"
import { cn } from "@/lib/utils"

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  containerClassName?: string
  maxWidth?: "sm" | "md" | "lg" | "xl" | "full" | "7xl" | "5xl"
}

const maxWidthMap = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-7xl",
  xl: "max-w-[1440px]",
  full: "max-w-full",
  "7xl": "max-w-7xl",
  "5xl": "max-w-5xl",
}

function Section({
  children,
  className,
  containerClassName,
  maxWidth = "lg",
  ...props
}: SectionProps) {
  return (
    <section className={cn("py-24 md:py-32 bg-white overflow-hidden", className)} {...props}>
      <div className={cn("container mx-auto px-4", maxWidthMap[maxWidth], containerClassName)}>
        {children}
      </div>
    </section>
  )
}

export { Section }
