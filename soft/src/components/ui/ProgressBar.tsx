"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { motion, useScroll} from "motion/react";


import { cn } from "../../utils/cn"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
    scaleX: any;
  }
>(({ className, scaleX, ...props }, ref) => (

  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "h-4 w-full sticky overflow-hidden rounded-full bg-secondary",
      className
    )}
    {...props}
  >
    <motion.div
      className="h-full w-full flex-1 bg-primary"
      style={{scaleX, transformOrigin: "left", intial: 1}}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
