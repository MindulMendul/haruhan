import { cn } from "@/lib/cn";
import React from "react";
import { Text, View } from "react-native";
import { Card } from "./Card";

interface SectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function Section({ title, description, children, className }: SectionProps) {
  return (
    <Card className={cn("mt-4 overflow-hidden p-0", className)}>
      <View className="border-b border-ink-200 bg-ink-50 px-5 py-3.5 dark:border-ink-700 dark:bg-ink-700">
        <Text className="text-sm font-extrabold text-ink-900 dark:text-white">{title}</Text>
        {description ? <Text className="mt-1 text-xs leading-5 text-ink-500 dark:text-ink-300">{description}</Text> : null}
      </View>
      <View className="px-5 py-4">{children}</View>
    </Card>
  );
}

