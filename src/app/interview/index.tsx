import { NavCard } from "@/shared/ui/NavCard";
import { Screen } from "@/shared/ui/Screen";
import { Section } from "@/shared/ui/Section";
import { ROUTES } from "@/shared/config/routes";
import { PAGE_SEO } from "@/shared/config/seo";
import { INTERVIEW_POSITIONS } from "@/entities/position/content/positions";
import { Seo, buildBreadcrumbJsonLd, buildWebPageJsonLd } from "@/shared/lib/seo";
import { Ionicons } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

function PositionCard({ position }: { position: (typeof INTERVIEW_POSITIONS)[number] }) {
  return (
    <Link href={{ pathname: ROUTES.JOB_POSITIONS, params: { position: position.id } }} asChild>
      <TouchableOpacity
        className="rounded-[28px] border border-ink-200 bg-white p-5 shadow-sm active:bg-ink-50 dark:border-ink-700 dark:bg-ink-800 dark:active:bg-ink-700"
        activeOpacity={0.86}
        accessibilityRole="link"
        accessibilityLabel={`${position.title} 포지션 자세히 보기`}
      >
        <View className="flex-row items-start gap-4">
          <View className="mt-1 rounded-2xl bg-brand-50 px-3 py-2 dark:bg-brand-600/20">
            <Text className="text-sm font-bold text-brand-700 dark:text-brand-100">{position.label}</Text>
          </View>
          <View className="flex-1">
            <Text className="text-sm font-extrabold text-ink-900 dark:text-white">{position.title}</Text>
            <Text className="mt-1 text-xs leading-5 text-ink-500 dark:text-ink-300">{position.subtitle}</Text>
            <View className="mt-3 gap-1">
              {position.questions.slice(0, 3).map((question) => (
                <Text key={question} className="text-xs leading-5 text-ink-600 dark:text-ink-400">
                  • {question}
                </Text>
              ))}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
}

export default function InterviewIndexScreen() {
  return (
    <>
      <Seo
        title={PAGE_SEO.INTERVIEW.title}
        description={PAGE_SEO.INTERVIEW.description}
        path={PAGE_SEO.INTERVIEW.path}
        keywords={[...PAGE_SEO.INTERVIEW.keywords]}
        jsonLd={[
          buildWebPageJsonLd({
            title: PAGE_SEO.INTERVIEW.title,
            description: PAGE_SEO.INTERVIEW.description,
            path: PAGE_SEO.INTERVIEW.path,
          }),
          buildBreadcrumbJsonLd([
            { name: PAGE_SEO.HOME.title, path: PAGE_SEO.HOME.path },
            { name: PAGE_SEO.INTERVIEW.title, path: PAGE_SEO.INTERVIEW.path },
          ]),
        ]}
      />
      <Stack.Screen options={{ title: "면접 연습" }} />
      <Screen>
        <Section title="면접 연습 홈" description="문제 풀이, 복기 분석, 보이스 인터뷰를 한 곳에서 시작하세요.">
          <View className="space-y-3">
            <NavCard
              title="문제 풀이"
              description="기술 면접과 인성 면접 문제를 준비하고, 실제 질문을 빠르게 확인하세요."
              icon="book-outline"
              href={ROUTES.INTERVIEW_PRACTICE}
              showChevron
            />
            <NavCard
              title="복기 분석"
              description="면접 후 다시 정리한 내용을 입력하면 잘한 점과 개선 포인트를 자동으로 정리해줍니다."
              icon="clipboard-outline"
              href={ROUTES.INTERVIEW_ANALYSIS}
              showChevron
            />
            <NavCard
              title="보이스 인터뷰"
              description="음성 기반 인터뷰 연습을 통해 답변 흐름과 발화감을 미리 체크해보세요."
              icon="mic-outline"
              href={ROUTES.INTERVIEW_VOICE}
              showChevron
            />
          </View>
        </Section>

        <Section
          title="추천 포지션"
          description="지금 준비 중인 포지션을 선택해서 실제 질문과 관련 CS 노트를 빠르게 확인하세요."
        >
          <View className="space-y-3">
            {INTERVIEW_POSITIONS.slice(0, 3).map((position) => (
              <PositionCard key={position.id} position={position} />
            ))}
          </View>
        </Section>
      </Screen>
    </>
  );
}
