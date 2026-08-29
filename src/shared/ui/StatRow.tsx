import React from "react";
import { Text, View } from "react-native";

interface StatRowProps {
  label: string;
  value: string;
}

export function StatRow({ label, value }: Readonly<StatRowProps>) {
  return (
    <View className="flex-row items-center justify-between">
      <Text className="text-sm text-ink-700 dark:text-ink-200">{label}</Text>
      <Text className="text-sm font-semibold text-ink-900 dark:text-white">{value}</Text>
    </View>
  );
}
