import { cn } from "@/lib/cn";
import React from "react";
import { View, type ViewProps } from "react-native";

interface CardProps extends ViewProps {
  children: React.ReactNode;
  className?: string;
  tone?: "surface" | "inverted";
}

const toneClassName: Record<NonNullable<CardProps["tone"]>, string> = {
  surface: "border-ink-200 bg-white dark:border-ink-700 dark:bg-ink-800",
  inverted: "border-ink-900 bg-ink-900 dark:border-ink-700 dark:bg-ink-800",
};

export function Card({ children, className, tone = "surface", ...props }: CardProps) {
  return (
    <View
      className={cn("rounded-[28px] border p-5 shadow-sm", toneClassName[tone], className)}
      {...props}
    >
      {children}
    </View>
  );
}

