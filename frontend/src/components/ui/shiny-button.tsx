"use client";

import React, { useState, useEffect } from "react";
import { motion, type AnimationProps } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";

const animationProps = {
  initial: { "--x": "100%", scale: 0.8 },
  animate: { "--x": "-100%", scale: 1 },
  whileTap: { scale: 0.95 },
  transition: {
    repeat: Infinity,
    repeatType: "loop",
    repeatDelay: 1,
    type: "spring",
    stiffness: 20,
    damping: 15,
    mass: 2,
    scale: {
      type: "spring",
      stiffness: 200,
      damping: 5,
      mass: 0.5,
    },
  },
} as AnimationProps;

interface ShinyButtonProps {
  text: string;
  className?: string;
  isBlue?: boolean;
  href: string;
}

const ShinyButton = ({
  text = "shiny-button",
  className,
  isBlue = false,
  href,
}: ShinyButtonProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    if (isMobile) {
      setIsTouched(true);
      // Use setTimeout to allow the animation to play before navigating
      setTimeout(() => {
        window.location.href = href;
      }, 200); // Adjust timing as needed
    }
  };

  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setIsHovered(false);
    }
  };

  const isActive = (!isMobile && isHovered) || (isMobile && isTouched);

  return (
    <motion.a
      href={isMobile ? undefined : href}
      {...animationProps}
      className={cn(
        "group relative inline-block rounded-2xl px-6 py-5 font-bold backdrop-blur-xl transition-[box-shadow] duration-300 ease-in-out hover:shadow",
        isBlue ? "bg-crayoBlue text-white" : "bg-white text-slate-950",
        className,
      )}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative flex flex-row items-center justify-center">
        <div
          className={cn(
            "absolute left-0 z-10 opacity-0 transition-all duration-300 ease-in-out",
            isActive && "left-1/2 -translate-x-1/2 opacity-100",
          )}
        >
          <Image
            src={
              isBlue
                ? "/lightningWhite.png"
                : "/lightningBlack.png"
            }
            alt="Lightning"
            width={16}
            height={16}
          />
        </div>
        <span
          className={cn(
            "relative block h-full w-full text-lg font-bold transition-opacity duration-300 ease-in-out",
            isActive && "opacity-0",
            isBlue ? "text-white" : "text-slate-950",
          )}
          style={{
            maskImage:
              "linear-gradient(-75deg,hsl(var(--primary)) calc(var(--x) + 20%),transparent calc(var(--x) + 30%),hsl(var(--primary)) calc(var(--x) + 100%))",
          }}
        >
          {text}
        </span>
      </div>

      <span
        style={{
          mask: "linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box,linear-gradient(rgb(0,0,0), rgb(0,0,0))",
          maskComposite: "exclude",
        }}
        className={cn(
          "absolute inset-y-0 left-[-10px] right-0 z-10 -ml-2.5 block rounded-2xl p-px",
          isBlue
            ? "bg-[linear-gradient(-75deg,hsl(var(--primary)/10%)_calc(var(--x)+20%),hsl(var(--primary)/50%)_calc(var(--x)+25%),hsl(var(--primary)/10%)_calc(var(--x)+100%))]"
            : "bg-[linear-gradient(-75deg,hsl(var(--primary)/10%)_calc(var(--x)+20%),hsl(var(--primary)/50%)_calc(var(--x)+25%),hsl(var(--primary)/10%)_calc(var(--x)+100%))]",
        )}
      ></span>
    </motion.a>
  );
};

export default ShinyButton;
