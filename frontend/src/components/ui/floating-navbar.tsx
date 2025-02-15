"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import {RainbowButton} from "@/components/ui/rainbow-button";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
  }[];
  className?: string;
}) => {
  return (
    <motion.div
      className={cn(
        "flex w-[80%] fixed top-10 inset-x-0 mx-auto border border-white/[0.2] rounded-full bg-black/20 backdrop-blur-md shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1)] z-[5000] pl-8 pr-4 py-2 items-center justify-between",
        className
      )}
    >
      {/* Logo */}
      <div className="flex items-center w-[165px]">
        <Link href="/">
          <Image 
            src="/logo.png" 
            alt="Logo" 
            width={165} 
            height={30}
            className="object-contain"
          />
        </Link>
      </div>

      {/* Navigation Items */}
      <div className="flex items-center justify-center space-x-4">
        {navItems.map((navItem: any, idx: number) => (
          <Link
            key={`link=${idx}`}
            href={navItem.link}
            className={cn(
              "relative text-white/90 text-sm hover:text-white transition-colors"
            )}
          >
            {navItem.name}
          </Link>
        ))}
      </div>

      {/* Login Button */}
      <div className="flex items-center justify-end w-[165px]">
        <RainbowButton>Login</RainbowButton>
      </div>
    </motion.div>
  );
};
