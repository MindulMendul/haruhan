import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="test" options={{ title: "테스트" }} />
    </Stack>
  );
}
