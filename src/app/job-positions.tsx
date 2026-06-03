import { Button, Card, Section, useToast } from "@/components/ui";
import { getTopicsByIds } from "@/content/cs";
import { INTERVIEW_POSITIONS } from "@/content/positions";
import type { CsTopicMeta } from "@/types/cs";
import type { InterviewPositionConcept, InterviewPositionConceptGroup } from "@/content/positions";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

function BulletList({ items }: { items: string[] }) {
  return (
    <View className="gap-2">
      {items.map((item) => (
        <View key={item} className="flex-row gap-2">
          <Text className="text-sm leading-6 text-brand-600 dark:text-brand-200">•</Text>
          <Text className="flex-1 text-sm leading-6 text-ink-700 dark:text-ink-200">{item}</Text>
        </View>
      ))}
    </View>
  );
}

function TopicCard({ topic }: { topic: CsTopicMeta }) {
  const router = useRouter();

  return (
    <TouchableOpacity
      className="mb-2 rounded-2xl border border-ink-200 bg-white px-4 py-3 active:bg-ink-50 dark:border-ink-700 dark:bg-ink-800 dark:active:bg-ink-700"
      activeOpacity={0.86}
      accessibilityRole="link"
      accessibilityLabel={`${topic.title}. ${topic.cardSummary}`}
      accessibilityHint="관련 학습 노트 상세 문서로 이동합니다."
      onPress={() => router.push(`/cs/${topic.id}`)}
    >
      <View className="flex-row items-start gap-3">
        <Text className="text-xl">{topic.emoji}</Text>
        <View className="flex-1">
          <Text className="text-sm font-extrabold text-ink-900 dark:text-white">{topic.title}</Text>
          <Text className="mt-1 text-xs leading-4 text-ink-500 dark:text-ink-300">{topic.cardSummary}</Text>
        </View>
        <Text className="text-lg text-brand-600">›</Text>
      </View>
    </TouchableOpacity>
  );
}

function ConceptCard({ concept }: { concept: InterviewPositionConcept }) {
  const router = useRouter();

  const content = (
    <View className="rounded-2xl border border-ink-200 bg-white px-4 py-3 dark:border-ink-700 dark:bg-ink-800">
      <Text className="text-sm font-extrabold text-ink-900 dark:text-white">{concept.term}</Text>
      <Text className="mt-1 text-xs leading-5 text-ink-600 dark:text-ink-200">{concept.summary}</Text>
      {concept.answerHint ? (
        <View className="mt-3 rounded-2xl bg-brand-50 px-3 py-2 dark:bg-brand-600/20">
          <Text className="text-xs font-bold leading-5 text-brand-700 dark:text-brand-100">답변 힌트: {concept.answerHint}</Text>
        </View>
      ) : null}
      {concept.topicId ? (
        <Text className="mt-3 text-xs font-extrabold text-brand-600 dark:text-brand-200">관련 CS 문서 열기 ›</Text>
      ) : null}
    </View>
  );

  if (!concept.topicId) return content;

  return (
    <TouchableOpacity
      activeOpacity={0.86}
      accessibilityRole="link"
      accessibilityLabel={`${concept.term}. ${concept.summary}`}
      accessibilityHint="관련 CS 문서로 이동합니다."
      onPress={() => router.push(`/cs/${concept.topicId}`)}
    >
      {content}
    </TouchableOpacity>
  );
}

function ConceptGroup({ group }: { group: InterviewPositionConceptGroup }) {
  return (
    <View className="mb-4">
      <Text className="text-sm font-extrabold text-ink-900 dark:text-white">{group.title}</Text>
      <Text className="mt-1 text-xs leading-5 text-ink-500 dark:text-ink-300">{group.description}</Text>
      <View className="mt-3 gap-2">
        {group.concepts.map((concept) => (
          <ConceptCard key={`${group.title}-${concept.term}`} concept={concept} />
        ))}
      </View>
    </View>
  );
}

export default function JobPositionsScreen() {
  const { toast } = useToast();
  const router = useRouter();
  const { position: rawPosition } = useLocalSearchParams<{ position?: string | string[] }>();
  const positionParam = Array.isArray(rawPosition) ? rawPosition[0] : rawPosition;
  const initialPositionId = typeof positionParam === "string" && INTERVIEW_POSITIONS.some((position) => position.id === positionParam)
    ? positionParam
    : INTERVIEW_POSITIONS[0].id;
  const [selectedId, setSelectedId] = useState(initialPositionId);
  const selectedPosition = useMemo(
    () => INTERVIEW_POSITIONS.find((position) => position.id === selectedId) ?? INTERVIEW_POSITIONS[0],
    [selectedId]
  );
  const relatedTopics = useMemo(() => getTopicsByIds(selectedPosition.topicIds ?? []), [selectedPosition.topicIds]);

  useEffect(() => {
    if (positionParam && INTERVIEW_POSITIONS.some((position) => position.id === positionParam)) {
      setSelectedId(positionParam);
    }
  }, [positionParam]);

  function selectPosition(positionId: string) {
    setSelectedId(positionId);
    router.setParams({ position: positionId });
  }

  return (
    <View className="flex-1 bg-paper dark:bg-ink-900">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="max-h-[66px] border-b border-ink-200 bg-paper dark:border-ink-700 dark:bg-ink-900"
      >
        <View className="flex-row items-center gap-2 px-4 py-3">
          {INTERVIEW_POSITIONS.map((position) => {
            const selected = position.id === selectedPosition.id;
            return (
              <TouchableOpacity
                key={position.id}
                activeOpacity={0.86}
                accessibilityRole="tab"
                accessibilityLabel={`${position.title} 탭`}
                accessibilityState={{ selected }}
                onPress={() => selectPosition(position.id)}
                className={`rounded-full border px-4 py-2 ${
                  selected ? "border-brand-600 bg-brand-600" : "border-ink-200 bg-white dark:border-ink-700 dark:bg-ink-800"
                }`}
              >
                <Text className={`text-xs font-extrabold ${selected ? "text-white" : "text-ink-700 dark:text-ink-200"}`}>
                  {position.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 52 }}>
        <Card tone="inverted" className="overflow-hidden p-5">
          <Text className="text-xs font-bold uppercase tracking-wide text-brand-200">JD Position Interview Map</Text>
          <Text className="mt-2 text-[28px] font-extrabold leading-9 text-white">{selectedPosition.title}</Text>
          <Text className="mt-2 text-sm leading-6 text-ink-200 dark:text-ink-300">{selectedPosition.subtitle}</Text>
          <Text className="mt-5 text-sm leading-6 text-white/90 dark:text-ink-200">{selectedPosition.summary}</Text>

          <View className="mt-5 flex-row flex-wrap gap-2">
            {selectedPosition.keywords.map((keyword) => (
              <View key={keyword} className="rounded-full bg-white/10 px-3 py-1.5 dark:bg-brand-600/20">
                <Text className="text-xs font-bold text-white">#{keyword}</Text>
              </View>
            ))}
          </View>
        </Card>

        <Section title="면접에서 자주 보는 영역">
          <BulletList items={selectedPosition.focusAreas} />
        </Section>

        <Section title="대표 질문">
          <BulletList items={selectedPosition.questions} />
        </Section>

        {selectedPosition.conceptGroups && selectedPosition.conceptGroups.length > 0 ? (
          <Section
            title="포지션 핵심 CS/실무 개념"
            description="관련 문서로 넘어가지 않아도 이 탭 안에서 바로 훑을 수 있게 중복 정리했습니다."
          >
            {selectedPosition.conceptGroups.map((group) => (
              <ConceptGroup key={group.title} group={group} />
            ))}
          </Section>
        ) : null}

        {relatedTopics.length > 0 ? (
          <Section title="관련 학습 노트">
            <View>
              <Text className="mb-3 text-xs leading-5 text-ink-500 dark:text-ink-300">
                이 포지션에서 이어서 보면 좋은 노트입니다. 탭하면 상세 문서로 이동합니다.
              </Text>
              {relatedTopics.map((topic) => (
                <TopicCard key={topic.id} topic={topic} />
              ))}
            </View>
          </Section>
        ) : null}

        <Button
          variant="outline"
          className="mt-4"
          onPress={() =>
            toast({
              title: "JD 읽는 팁",
              description: "기술 스택보다 이 포지션이 어떤 책임을 지는지 먼저 잡고, 프로젝트 경험을 그 책임에 맞춰 재정렬해보세요.",
              variant: "warning",
            })
          }
        >
          면접 팁 보기
        </Button>
      </ScrollView>
    </View>
  );
}

