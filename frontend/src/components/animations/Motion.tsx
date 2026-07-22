"use client"

import { motion, HTMLMotionProps, AnimatePresence } from "framer-motion"
import * as React from "react"
import { cn } from "@/lib/utils"
import { ANIMATION_SPEEDS, EASINGS } from "@/constants/design"

export const AnimatedPresence = AnimatePresence;

interface AnimatedFadeProps extends HTMLMotionProps<"div"> {
  delay?: number;
}

export const AnimatedFade = React.forwardRef<HTMLDivElement, AnimatedFadeProps>(
  ({ className, children, delay, ...props }, ref) => (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: ANIMATION_SPEEDS.NORMAL, ease: EASINGS.STANDARD_EASE, delay }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  )
)
AnimatedFade.displayName = "AnimatedFade"

interface AnimatedSlideUpProps extends HTMLMotionProps<"div"> {
  delay?: number;
}

export const AnimatedSlideUp = React.forwardRef<HTMLDivElement, AnimatedSlideUpProps>(
  ({ className, children, delay, ...props }, ref) => (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: ANIMATION_SPEEDS.NORMAL, ease: EASINGS.EMPHASIZED_EASE, delay }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  )
)
AnimatedSlideUp.displayName = "AnimatedSlideUp"

export const AnimatedSlideLeft = React.forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(
  ({ className, children, ...props }, ref) => (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: ANIMATION_SPEEDS.NORMAL, ease: EASINGS.EMPHASIZED_EASE }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  )
)
AnimatedSlideLeft.displayName = "AnimatedSlideLeft"

export const AnimatedScale = React.forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(
  ({ className, children, ...props }, ref) => (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: ANIMATION_SPEEDS.FAST, ease: EASINGS.EMPHASIZED_EASE }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  )
)
AnimatedScale.displayName = "AnimatedScale"

export const AnimatedPage = React.forwardRef<HTMLElement, HTMLMotionProps<"main">>(
  ({ className, children, ...props }, ref) => (
    <motion.main
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: ANIMATION_SPEEDS.NORMAL, ease: EASINGS.STANDARD_EASE }}
      className={cn("w-full min-h-screen", className)}
      {...props}
    >
      {children}
    </motion.main>
  )
)
AnimatedPage.displayName = "AnimatedPage"

export const AnimatedCard = AnimatedSlideUp;

export const AnimatedList = React.forwardRef<HTMLUListElement, HTMLMotionProps<"ul">>(
  ({ className, children, ...props }, ref) => (
    <motion.ul
      ref={ref}
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.05,
          }
        },
        hidden: {}
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.ul>
  )
)
AnimatedList.displayName = "AnimatedList"

export const AnimatedSection = AnimatedFade;
export const AnimatedModal = AnimatedScale;

export const AnimatedButton = React.forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(
  ({ className, children, ...props }, ref) => (
    <motion.div
      ref={ref}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: ANIMATION_SPEEDS.FAST, ease: "easeOut" }}
      className={cn("inline-block", className)}
      {...props}
    >
      {children}
    </motion.div>
  )
)
AnimatedButton.displayName = "AnimatedButton"

// Backward compatibility
export const FadeIn = AnimatedFade;
export const SlideUp = AnimatedSlideUp;
export const HoverScale = AnimatedButton;
