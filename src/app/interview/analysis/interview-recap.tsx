import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Screen } from "@/components/ui/Screen";
import { Section } from "@/components/ui/Section";
import { PAGE_SEO } from "@/constants/seo";
import { useKeyboardVisibilityStore } from "@/lib/keyboardVisibility";
import { Seo, buildBreadcrumbJsonLd, buildWebPageJsonLd } from "@/lib/seo";
import { Stack } from "expo-router";
import React, { useMemo, useState } from "react";
import { Text, TextInput, View } from "react-native";

interface AnalysisResult {
  highlight: string[];
  improvement: string[];
  nextSteps: string[];
}

function summarizeRecap(text: string): AnalysisResult {
  const sentences = text
    .split(/(?<=[\.\!\?\n])/)
    .map((line) => line.trim())
    .filter(Boolean);

  const positives = ["잘", "명확", "적절", "구체", "좋", "현실", "성공"];
  const issues = ["아쉬", "부족", "긴장", "실수", "떨", "막혔", "어려웠", "현실적이지"];

  const highlight: string[] = [];
  const improvement: string[] = [];

  for (const sentence of sentences) {
    const lower = sentence.toLowerCase();
    if (positives.some((keyword) => lower.includes(keyword))) {
      highlight.push(sentence);
    }
    if (issues.some((keyword) => lower.includes(keyword))) {
      improvement.push(sentence);
    }
  }

  if (highlight.length === 0) {
    highlight.push("답변의 핵심을 빠르게 정리한 점을 잘 기억해보세요. 예시나 결과를 더 명확히 담으면 좋습니다.");
  }

  if (improvement.length === 0) {
    improvement.push("다음에는 질문 의도를 먼저 파악하고, 경험을 구조화해서 답해보세요.");
  }

  const nextSteps = [
    "핵심 용어와 역할을 먼저 정리한 뒤 답변을 시작하세요.",
    "구체적인 사례와 숫자를 함께 제시하면 신뢰도가 올라갑니다.",
    "유사 질문을 2~3개 더 만들어서 연습하면 복잡한 상황에서도 빠르게 대응할 수 있습니다.",
  ];

  return { highlight, improvement, nextSteps };
}

export default function InterviewRecapScreen() {
  const [recap, setRecap] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const analysis = useMemo(() => summarizeRecap(recap), [recap]);

  return (
    <>
      <Seo
        title="면접 복기"
        description="면접 복기 내용을 입력하면 잘한 점과 개선 사항을 자동으로 정리해드립니다."
        path={`${PAGE_SEO.INTERVIEW.path}/analysis/interview-recap`}
        keywords={[...PAGE_SEO.INTERVIEW.keywords, "면접 복기", "기록", "피드백", "회고"]}
        jsonLd={[
          buildWebPageJsonLd({
            title: "면접 복기",
            description: "면접 복기 내용을 입력하면 잘한 점과 개선 사항을 자동으로 정리해드립니다.",
            path: `${PAGE_SEO.INTERVIEW.path}/analysis/interview-recap`,
          }),
          buildBreadcrumbJsonLd([
            { name: PAGE_SEO.HOME.title, path: PAGE_SEO.HOME.path },
            { name: PAGE_SEO.INTERVIEW.title, path: PAGE_SEO.INTERVIEW.path },
            { name: "기록", path: `${PAGE_SEO.INTERVIEW.path}/analysis` },
            { name: "면접 복기", path: `${PAGE_SEO.INTERVIEW.path}/analysis/interview-recap` },
          ]),
        ]}
      />
      <Stack.Screen options={{ title: "면접 복기" }} />
      <Screen>
        <Section title="면접 복기 입력" description="면접 후 답변 흐름과 느낀 점을 그대로 입력해보세요.">
          <TextInput
            multiline
            value={recap}
            onChangeText={setRecap}
            placeholder="무엇을 물어봤고, 어떻게 답변했는지, 다음에는 무엇을 다르게 말할지 적어보세요."
            onFocus={() => useKeyboardVisibilityStore.getState().show()}
            onBlur={() => useKeyboardVisibilityStore.getState().hide()}
            className="min-h-[180px] rounded-3xl border border-ink-200 bg-white px-4 py-4 text-sm leading-6 text-ink-900 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-100"
            placeholderTextColor="#94a3b8"
          />
          <Button className="mt-4" onPress={() => setSubmitted(true)} disabled={recap.trim().length === 0}>
            분석 실행
          </Button>
        </Section>

        {submitted ? (
          <Section title="분석 결과" description="입력한 복기를 기반으로 강점과 개선점을 자동으로 정리합니다.">
            <View className="space-y-4">
              <Card className="rounded-[28px] p-5">
                <Text className="text-sm font-extrabold text-ink-900 dark:text-white">잘한 점</Text>
                <View className="mt-3 space-y-2">
                  {analysis.highlight.map((item) => (
                    <Text key={item} className="text-sm leading-6 text-ink-700 dark:text-ink-200">
                      • {item}
                    </Text>
                  ))}
                </View>
              </Card>

              <Card className="rounded-[28px] p-5">
                <Text className="text-sm font-extrabold text-ink-900 dark:text-white">개선 포인트</Text>
                <View className="mt-3 space-y-2">
                  {analysis.improvement.map((item) => (
                    <Text key={item} className="text-sm leading-6 text-ink-700 dark:text-ink-200">
                      • {item}
                    </Text>
                  ))}
                </View>
              </Card>

              <Card className="rounded-[28px] p-5">
                <Text className="text-sm font-extrabold text-ink-900 dark:text-white">다음 연습</Text>
                <View className="mt-3 space-y-2">
                  {analysis.nextSteps.map((item) => (
                    <Text key={item} className="text-sm leading-6 text-ink-700 dark:text-ink-200">
                      • {item}
                    </Text>
                  ))}
                </View>
              </Card>
            </View>
          </Section>
        ) : null}

        <Section title="복기 작성 팁" description="더 좋은 복기를 위해 다음 항목을 확인해보세요.">
          <View className="space-y-2">
            <Text className="text-sm leading-6 text-ink-700 dark:text-ink-200">
              • 질문 의도와 내가 전달한 핵심 메시지를 분리해서 써보세요.
            </Text>
            <Text className="text-sm leading-6 text-ink-700 dark:text-ink-200">
              • 행동, 결과, 배운 점을 구조화하면 복기가 명확해집니다.
            </Text>
            <Text className="text-sm leading-6 text-ink-700 dark:text-ink-200">
              • 다음에는 왜 그렇게 했는지, 왜 다른 선택을 하지 않았는지도 함께 정리해보세요.
            </Text>
          </View>
        </Section>
      </Screen>
    </>
  );
}
