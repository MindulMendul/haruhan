import { Card } from "@/components/ui/Card";
import { Screen } from "@/components/ui/Screen";
import { Section } from "@/components/ui/Section";
import { ROUTES } from "@/constants/routes";
import { PAGE_SEO } from "@/constants/seo";
import { INTERVIEW_POSITIONS } from "@/content/positions";
import { Seo, buildBreadcrumbJsonLd, buildWebPageJsonLd } from "@/lib/seo";
import { Ionicons } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

function PracticeCard({ position }: { position: (typeof INTERVIEW_POSITIONS)[number] }) {
  return (
    <View className="px-2">
      <Link href={`${ROUTES.INTERVIEW_PRACTICE}/${position.id}` as any} asChild>
        <TouchableOpacity
          activeOpacity={0.86}
          className="flex-row items-center justify-between rounded-lg bg-transparent px-1 py-3"
          accessibilityRole="link"
          accessibilityLabel={`${position.title} 면접 문제 풀이로 이동`}
        >
          <View className="flex-1">
            <Text className="text-sm font-extrabold text-ink-900 dark:text-white">{position.title}</Text>
            <Text className="mt-1 text-xs leading-5 text-ink-500 dark:text-ink-300">{position.subtitle}</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
        </TouchableOpacity>
      </Link>
    </View>
  );
}

export default function InterviewPracticeScreen() {
  return (
    <>
      <Seo
        title="면접 문제 풀이"
        description="기술 면접과 인성 면접 문제를 포지션별로 정리하고 연습할 수 있습니다."
        path={`${PAGE_SEO.INTERVIEW.path}/practice`}
        keywords={[...PAGE_SEO.INTERVIEW.keywords, "문제 풀이", "기술 면접", "인성 면접"]}
        jsonLd={[
          buildWebPageJsonLd({
            title: "면접 문제 풀이",
            description: "기술 면접과 인성 면접 문제를 포지션별로 정리하고 연습할 수 있습니다.",
            path: `${PAGE_SEO.INTERVIEW.path}/practice`,
          }),
          buildBreadcrumbJsonLd([
            { name: PAGE_SEO.HOME.title, path: PAGE_SEO.HOME.path },
            { name: PAGE_SEO.INTERVIEW.title, path: PAGE_SEO.INTERVIEW.path },
            { name: "문제 풀이", path: `${PAGE_SEO.INTERVIEW.path}/practice` },
          ]),
        ]}
      />
      <Stack.Screen options={{ title: "문제 풀이" }} />
      <Screen>
        <Section title="기술" description="JD 기반 문제와 함께 진짜 면접 분위기를 빠르게 확인해보세요.">
          <View className="space-y-4">
            {INTERVIEW_POSITIONS.map((position) => (
              <PracticeCard key={position.id} position={position} />
            ))}
          </View>
        </Section>

        <Section title="빠르게 풀어보는 문제 유형" description="기술/인성 질문을 자연스럽게 섞어서 연습해보세요.">
          <View className="space-y-3">
            <Card className="rounded-[28px] p-5">
              <Text className="text-sm font-extrabold text-ink-900 dark:text-white">기술 면접 질문 예시</Text>
              <View className="mt-3 space-y-2">
                <Text className="text-sm leading-6 text-ink-700 dark:text-ink-200">
                  • 이 시스템에서 병목이 발생하면 가장 먼저 어디를 확인하겠습니까?
                </Text>
                <Text className="text-sm leading-6 text-ink-700 dark:text-ink-200">
                  • API 성능 문제를 실제로 경험했다면 어떤 지표를 우선 보셨나요?
                </Text>
                <Text className="text-sm leading-6 text-ink-700 dark:text-ink-200">
                  • 이 포지션에서 중요하게 생각하는 아키텍처 결정 기준은 무엇인가요?
                </Text>
              </View>
            </Card>
            <Card className="rounded-[28px] p-5">
              <Text className="text-sm font-extrabold text-ink-900 dark:text-white">인성 면접 질문 예시</Text>
              <View className="mt-3 space-y-2">
                <Text className="text-sm leading-6 text-ink-700 dark:text-ink-200">
                  • 힘들었던 협업 상황을 어떻게 풀어냈나요?
                </Text>
                <Text className="text-sm leading-6 text-ink-700 dark:text-ink-200">
                  • 실패한 프로젝트에서 어떤 교훈을 얻었나요?
                </Text>
                <Text className="text-sm leading-6 text-ink-700 dark:text-ink-200">
                  • 이 회사에 합류하면 어떤 기여를 하고 싶나요?
                </Text>
              </View>
            </Card>
          </View>
        </Section>
      </Screen>
    </>
  );
}
