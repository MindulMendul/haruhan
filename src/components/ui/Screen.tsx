import { cn } from "@/lib/cn";
import React from "react";
import { ScrollView, View, type ScrollViewProps } from "react-native";

interface ScreenProps extends ScrollViewProps {
  children: React.ReactNode;
  scroll?: boolean;
  className?: string;
  contentClassName?: string;
}

export function Screen({ children, scroll = true, className, contentClassName, contentContainerStyle, ...props }: ScreenProps) {
  if (!scroll) {
    return <View className={cn("flex-1 bg-paper dark:bg-ink-900", className)}>{children}</View>;
  }

  return (
    <ScrollView
      className={cn("flex-1 bg-paper dark:bg-ink-900", className)}
      contentContainerStyle={[{ padding: 20, paddingBottom: 56 }, contentContainerStyle]}
      {...props}
    >
      <View className={cn("w-full max-w-[760px] self-center", contentClassName)}>{children}</View>
    </ScrollView>
  );
}

