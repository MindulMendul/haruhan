import { ErrorFallback } from "@/components/common/ErrorFallback";
import { CS_TOPICS } from "@/content/cs";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { Drawer } from "expo-router/drawer";
import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "./global.css";

function CustomDrawerContent({ props }: { props: object }) {
  const router = useRouter();

  return (
    <DrawerContentScrollView {...props}>
      <View className="p-6 border-b border-gray-100 mb-2">
        <Text className="text-2xl font-bold text-blue-500">하루한 메뉴</Text>
        <Text className="text-xs text-gray-400 mt-1">FE CS 면접 노트 (번들)</Text>
      </View>

      <DrawerItem label="🏠 홈" onPress={() => router.push("/")} labelStyle={{ fontWeight: "600" }} />

      <DrawerItem
        label="📚 CS 개념 목록"
        onPress={() => router.push("/cs")}
        labelStyle={{ fontWeight: "600" }}
      />

      <View className="px-4 py-2 mt-2 border-t border-gray-100">
        <Text className="text-xs font-semibold text-gray-400 uppercase tracking-wide">주제 바로가기</Text>
      </View>

      {CS_TOPICS.map((topic) => (
        <DrawerItem
          key={topic.id}
          label={`${topic.emoji} ${topic.title}`}
          onPress={() => router.push(`/cs/${topic.id}`)}
          labelStyle={{ fontWeight: "500", fontSize: 13 }}
        />
      ))}
    </DrawerContentScrollView>
  );
}

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // 캐시 초기화 등
      }}
    >
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Drawer
            drawerContent={(props) => <CustomDrawerContent props={props} />}
            screenOptions={{
              headerShown: true,
              drawerActiveTintColor: "#6a96ff",
              drawerLabelStyle: { fontWeight: "600" },
            }}
          >
            <Drawer.Screen
              name="index"
              options={{
                drawerLabel: "홈",
                title: "하루한",
              }}
            />
            <Drawer.Screen
              name="network"
              options={{
                title: "네트워크",
                drawerItemStyle: { display: "none" },
                drawerLabel: () => null,
              }}
            />
            <Drawer.Screen
              name="cs"
              options={{
                drawerLabel: "CS 면접 노트",
                title: "FE CS 면접 노트",
              }}
            />
          </Drawer>
        </GestureHandlerRootView>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
