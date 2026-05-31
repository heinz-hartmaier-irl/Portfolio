"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import type { ComponentProps } from "react";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

type LottieMotionProps = ComponentProps<typeof motion.div> & {
  animationData: unknown;
  loop?: boolean;
  autoplay?: boolean;
  label?: string;
};

export function LottieMotion({
  animationData,
  loop = true,
  autoplay = true,
  label,
  className,
  ...motionProps
}: LottieMotionProps) {
  return (
    <motion.div
      className={className}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      {...motionProps}
    >
      <Lottie animationData={animationData} loop={loop} autoplay={autoplay} />
    </motion.div>
  );
}
