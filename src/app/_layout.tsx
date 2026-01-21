import { ErrorFallback } from "@/components/common/ErrorFallback";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import * as Sentry from "@sentry/react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { useRouter } from "expo-router";
import { Drawer } from "expo-router/drawer";
import React, { useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "./global.css";

Sentry.init({
  dsn: "https://0ac9fad34b52f00f400fc434b995a810@o4510701591527424.ingest.us.sentry.io/4510701593755648",

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Enable Logs
  enableLogs: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.mobileReplayIntegration(), Sentry.feedbackIntegration()],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

interface Menu {
  id: "" | "network";
  label: string;
  visible: boolean;
}

function CustomDrawerContent({ props, menuSettings }: { props: any; menuSettings: Menu[] }) {
  const router = useRouter();

  return (
    <DrawerContentScrollView {...props}>
      {/* 상단 헤더 영역 */}
      <View className="p-6 border-b border-gray-100 mb-4">
        <Text className="text-2xl font-bold text-blue-500">하루한 메뉴</Text>
      </View>

      {/* 홈 버튼은 기본으로 배치 */}
      <DrawerItem label="🏠 홈" onPress={() => router.push("/")} labelStyle={{ fontWeight: "600" }} />

      {/* 2. 사용자가 설정한 menuSettings에 따라 동적 렌더링 */}
      {menuSettings
        .filter((menu: Menu) => menu.visible)
        .map((menu: Menu) => (
          <DrawerItem
            key={menu.id}
            label={menu.label}
            onPress={() => router.push(`/${menu.id}`)}
            labelStyle={{ fontWeight: "600" }}
          />
        ))}
    </DrawerContentScrollView>
  );
}

const queryClient = new QueryClient();

export default Sentry.wrap(function RootLayout() {
  const [menuSettings, setMenuSettings] = useState<Menu[]>([
    { id: "network", label: "🌐 네트워크", visible: true },
    // { id: "os", label: "⚙️ 운영체제", visible: true },
    // { id: "db", label: "🏛️ 데이터베이스", visible: false },
  ]);

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // 여기서 캐시를 비우거나 초기 상태로 되돌리는 로직을 넣을 수 있습니다.
      }}
    >
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Drawer
            drawerContent={(props) => <CustomDrawerContent props={props} menuSettings={menuSettings} />}
            screenOptions={{
              headerShown: true, // 상단 햄버거 메뉴 버튼 활성화
              drawerActiveTintColor: "#6a96ff",
              drawerLabelStyle: { fontWeight: "600" },
            }}
          >
            {/* 각 Drawer.Screen은 app 폴더 내의 파일들과 매칭됩니다. */}
            <Drawer.Screen
              name="index" // app/index.tsx (홈)
              options={{
                drawerLabel: "홈",
                title: "하루한",
              }}
            />
            <Drawer.Screen
              name="network" // app/network.tsx (네트워크 리스트)
              options={{
                drawerLabel: "🌐 네트워크",
                title: "네트워크 개념 학습",
              }}
            />
            {/* 추후 추가될 카테고리들 */}
            <Drawer.Screen
              name="os"
              options={{
                drawerLabel: "⚙️ 운영체제",
                title: "OS 개념 학습",
              }}
            />
          </Drawer>
        </GestureHandlerRootView>
        <SpeedInsights />
      </QueryClientProvider>
    </ErrorBoundary>
  );
});
