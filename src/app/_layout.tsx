import { ErrorFallback } from "@/components/common/ErrorFallback";
import { BottomNavBar } from "@/components/navigation/BottomNavBar";
import { ThemeBootstrap } from "@/components/theme/ThemeBootstrap";
import { ToastProvider } from "@/components/ui";
import { COMMON_CS_TOPICS } from "@/content/cs";
import { INTERVIEW_POSITIONS } from "@/content/positions";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePathname, useRouter } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { useColorScheme } from "nativewind";
import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "./global.css";

function CustomDrawerContent({ props }: { props: object }) {
  const router = useRouter();
  const pathname = usePathname();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const drawerTextColor = isDark ? "#e2e8f0" : "#334155";
  const showCommonCsMenu = pathname.startsWith("/cs");
  const showPositionMenu = pathname.startsWith("/job-positions");

  return (
    <DrawerContentScrollView {...props} className="bg-paper dark:bg-ink-900">
      <View className="p-6 border-b border-ink-200 mb-2 dark:border-ink-700">
        <Text className="text-2xl font-extrabold text-brand-600 dark:text-brand-200">하루한 메뉴</Text>
        <Text className="text-xs text-ink-500 mt-1 dark:text-ink-300">공통 CS와 포지션별 면접 노트</Text>
      </View>

      <DrawerItem
        label="🏠 홈"
        onPress={() => router.push("/")}
        inactiveTintColor={drawerTextColor}
        activeTintColor="#6a96ff"
        labelStyle={{ fontWeight: "600" }}
      />

      <DrawerItem
        label="📚 공통 CS"
        onPress={() => router.push("/cs")}
        inactiveTintColor={drawerTextColor}
        activeTintColor="#6a96ff"
        labelStyle={{ fontWeight: "600" }}
      />
      <DrawerItem
        label="🧭 JD 포지션"
        onPress={() => router.push("/job-positions")}
        inactiveTintColor={drawerTextColor}
        activeTintColor="#6a96ff"
        labelStyle={{ fontWeight: "600" }}
      />
      <DrawerItem
        label="⚙️ 설정"
        onPress={() => router.push("/settings")}
        inactiveTintColor={drawerTextColor}
        activeTintColor="#6a96ff"
        labelStyle={{ fontWeight: "600" }}
      />

      {showCommonCsMenu ? (
        <>
          <View className="px-4 py-2 mt-2 border-t border-ink-200 dark:border-ink-700">
            <Text className="text-xs font-semibold text-ink-400 uppercase tracking-wide dark:text-ink-300">공통 CS 바로가기</Text>
          </View>

          {COMMON_CS_TOPICS.map((topic) => (
            <DrawerItem
              key={topic.id}
              label={`${topic.emoji} ${topic.title}`}
              onPress={() => router.push(`/cs/${topic.id}`)}
              inactiveTintColor={drawerTextColor}
              activeTintColor="#6a96ff"
              labelStyle={{ fontWeight: "500", fontSize: 13 }}
            />
          ))}
        </>
      ) : null}

      {showPositionMenu ? (
        <>
          <View className="px-4 py-2 mt-2 border-t border-ink-200 dark:border-ink-700">
            <Text className="text-xs font-semibold text-ink-400 uppercase tracking-wide dark:text-ink-300">포지션 바로가기</Text>
          </View>

          {INTERVIEW_POSITIONS.map((position) => (
            <DrawerItem
              key={position.id}
              label={`${position.label} · ${position.title}`}
              onPress={() => router.push(`/job-positions?position=${position.id}`)}
              inactiveTintColor={drawerTextColor}
              activeTintColor="#6a96ff"
              labelStyle={{ fontWeight: "500", fontSize: 13 }}
            />
          ))}
        </>
      ) : null}
    </DrawerContentScrollView>
  );
}

const queryClient = new QueryClient();

export default function RootLayout() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // 캐시 초기화 등
      }}
    >
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <ThemeBootstrap />
          <ToastProvider>
            <View className="flex-1">
              <Drawer
                drawerContent={(props) => <CustomDrawerContent props={props} />}
                screenOptions={{
                  headerShown: true,
                  drawerPosition: "right",
                  drawerActiveTintColor: "#6a96ff",
                  drawerInactiveTintColor: isDark ? "#cbd5e1" : "#334155",
                  drawerStyle: {
                    backgroundColor: isDark ? "#0f172a" : "#fbfcff",
                  },
                  headerStyle: {
                    backgroundColor: isDark ? "#0f172a" : "#fbfcff",
                  },
                  headerTintColor: isDark ? "#f8fafc" : "#0f172a",
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
                  name="feedback"
                  options={{
                    title: "Feedback UI",
                    drawerItemStyle: { display: "none" },
                    drawerLabel: () => null,
                  }}
                />
                <Drawer.Screen
                  name="job-positions"
                  options={{
                    drawerLabel: "JD 포지션",
                    title: "JD 포지션",
                  }}
                />
                <Drawer.Screen
                  name="settings"
                  options={{
                    drawerLabel: "설정",
                    title: "설정",
                  }}
                />
                <Drawer.Screen
                  name="cs"
                  options={{
                    drawerLabel: "공통 CS",
                    title: "공통 CS",
                  }}
                />
              </Drawer>
              <BottomNavBar />
            </View>
          </ToastProvider>
        </GestureHandlerRootView>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
