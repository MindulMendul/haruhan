import { Stack } from "expo-router";
import React from "react";

export default function CsStackLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerBackTitle: "목록",
      }}
    >
      <Stack.Screen name="index" options={{ title: "공통 CS 면접 노트" }} />
      <Stack.Screen name="[id]" options={{ title: "노트" }} />
    </Stack>
  );
}
