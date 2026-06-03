import { cn } from "@/lib/cn";
import React from "react";
import { Text, View } from "react-native";

type BadgeVariant = "default" | "brand" | "inverse";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
  textClassName?: string;
}

const variants: Record<BadgeVariant, string> = {
  default: "bg-ink-100 dark:bg-ink-700",
  brand: "bg-brand-50 dark:bg-brand-600/20",
  inverse: "bg-white/10",
};

const textVariants: Record<BadgeVariant, string> = {
  default: "text-ink-700 dark:text-ink-100",
  brand: "text-brand-700 dark:text-brand-100",
  inverse: "text-white",
};

export function Badge({ children, variant = "default", className, textClassName }: BadgeProps) {
  return (
    <View className={cn("self-start rounded-full px-3 py-1.5", variants[variant], className)}>
      <Text className={cn("text-xs font-extrabold", textVariants[variant], textClassName)}>{children}</Text>
    </View>
  );
}

