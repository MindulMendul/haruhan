import { Stack } from "expo-router";

export default function CsStackLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerBackTitle: "목록",
      }}
    >
      <Stack.Screen name="index" options={{ title: "FE CS 면접 노트" }} />
      <Stack.Screen name="[id]" options={{ title: "노트" }} />
    </Stack>
  );
}
