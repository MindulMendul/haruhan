import { cn } from "@/lib/cn";
import React from "react";
import { Text, TouchableOpacity, type TouchableOpacityProps } from "react-native";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";

interface ButtonProps extends TouchableOpacityProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
  textClassName?: string;
}

const variants: Record<ButtonVariant, string> = {
  primary: "bg-brand-600 active:bg-brand-700",
  secondary: "bg-ink-900 active:bg-ink-700 dark:bg-white dark:active:bg-ink-100",
  ghost: "bg-transparent active:bg-ink-100 dark:active:bg-ink-800",
  outline: "border border-ink-200 bg-white active:bg-ink-50 dark:border-ink-700 dark:bg-ink-800 dark:active:bg-ink-700",
};

const textVariants: Record<ButtonVariant, string> = {
  primary: "text-white",
  secondary: "text-white dark:text-ink-900",
  ghost: "text-ink-700 dark:text-ink-100",
  outline: "text-ink-800 dark:text-ink-100",
};

export function Button({
  children,
  variant = "primary",
  className,
  textClassName,
  accessibilityRole = "button",
  ...props
}: ButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.86}
      accessibilityRole={accessibilityRole}
      className={cn("items-center justify-center rounded-2xl px-4 py-3", variants[variant], className)}
      {...props}
    >
      <Text className={cn("text-sm font-extrabold", textVariants[variant], textClassName)}>{children}</Text>
    </TouchableOpacity>
  );
}

