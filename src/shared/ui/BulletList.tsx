import React from "react";
import { Text, View } from "react-native";

interface BulletListProps {
  items: string[];
  className?: string;
}

export function BulletList({ items, className = "gap-2" }: BulletListProps) {
  return (
    <View className={className}>
      {items.map((item) => (
        <View key={item} className="flex-row gap-2">
          <Text className="text-sm leading-6 text-brand-600 dark:text-brand-200">•</Text>
          <Text className="flex-1 text-sm leading-6 text-ink-700 dark:text-ink-200">{item}</Text>
        </View>
      ))}
    </View>
  );
}
