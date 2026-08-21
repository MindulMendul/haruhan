import { RadarChart } from "@/components/interview/RadarChart";
import { Card } from "@/components/ui/Card";
import { Screen } from "@/components/ui/Screen";
import { Section } from "@/components/ui/Section";
import { PAGE_SEO } from "@/constants/seo";
import { INTERVIEW_POSITIONS } from "@/content/positions";
import { Seo, buildBreadcrumbJsonLd, buildWebPageJsonLd } from "@/lib/seo";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

// 간단한 객관식 예시 데이터 (문제 탭에서 즉시 사용 가능)
const SAMPLE_QUIZ = [
  {
    question: "데이터베이스에서 인덱스의 주된 목적은 무엇인가요?",
    options: ["데이터 무결성 보장", "쿼리 성능 향상", "동시성 제어", "백업 가속"],
    answerIndex: 1,
  },
  {
    question: "HTTP 403 상태 코드는 어떤 상황을 나타내나요?",
    options: ["리소스 없음", "서버 오류", "권한 없음", "잘못된 요청"],
    answerIndex: 2,
  },
  {
    question: "REST에서 PUT은 일반적으로 무엇을 의미하나요?",
    options: ["부분 수정", "전체 교체", "조회", "삭제"],
    answerIndex: 1,
  },
  {
    question: "React에서 props가 바뀌면 무엇을 먼저 확인해야 하나요?",
    options: ["컴포넌트 렌더링 여부", "API 경로", "쿠키 만료", "CSS 클래스"],
    answerIndex: 0,
  },
  {
    question: "API 캐시를 사용할 때 가장 중요한 설계 고려사항은 무엇인가요?",
    options: ["만료 정책", "모든 응답 캐시", "클라이언트 로그 저장", "프론트엔드 번들 크기"],
    answerIndex: 0,
  },
];

export default function PositionPracticeScreen() {
  const params = useLocalSearchParams<{ id: string }>();
  const id = params.id || "";
  const position = INTERVIEW_POSITIONS.find((p) => p.id === id) || INTERVIEW_POSITIONS[0];

  // 객관식 상태 — 포지션별 MCQ가 있으면 사용, 없으면 SAMPLE_QUIZ 사용
  interface QuizResult {
    question: string;
    selected: string;
    correct: string;
    isCorrect: boolean;
    durationSeconds: number;
  }

  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [results, setResults] = useState<QuizResult[]>([]);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());

  const QUIZ_SOURCE = position.mcq && position.mcq.length ? position.mcq : SAMPLE_QUIZ;
  const completed = quizIndex >= QUIZ_SOURCE.length;

  useEffect(() => {
    if (!completed) {
      setQuestionStartTime(Date.now());
    }
  }, [quizIndex, completed]);

  function selectOption(i: number) {
    if (answered || completed) return;
    const question = QUIZ_SOURCE[quizIndex];
    const durationSeconds = Math.max(1, Math.round((Date.now() - questionStartTime) / 1000));
    const questionText = (question && (question.question || (question as any).title)) || "질문 없음";

    setSelectedIndex(i);
    setAnswered(true);
    setResults((prev) => [
      ...prev,
      {
        question: questionText,
        selected: question?.options?.[i] ?? String(i),
        correct: question?.options?.[question?.answerIndex ?? 0] ?? "",
        isCorrect: i === question?.answerIndex,
        durationSeconds,
      },
    ]);
  }

  function nextQuiz() {
    if (!answered) return;
    if (quizIndex + 1 >= QUIZ_SOURCE.length) {
      setQuizIndex(QUIZ_SOURCE.length);
      setSelectedIndex(null);
      setAnswered(false);
      return;
    }
    setQuizIndex((q) => q + 1);
    setSelectedIndex(null);
    setAnswered(false);
  }

  const answeredCount = results.length;
  const correctCount = results.filter((result) => result.isCorrect).length;
  const durations = results.map((result) => result.durationSeconds);
  const totalSeconds = durations.reduce((sum, value) => sum + value, 0);
  const avgSeconds = answeredCount ? totalSeconds / answeredCount : 0;

  // 이상적인 문항당 응답 시간(초) — 속도/효율 점수의 기준값
  const IDEAL_SECONDS = 20;

  const accuracy = answeredCount ? correctCount / answeredCount : 0;
  const speed = avgSeconds ? Math.min(1, IDEAL_SECONDS / avgSeconds) : 0;
  const completion = QUIZ_SOURCE.length ? answeredCount / QUIZ_SOURCE.length : 0;
  // 효율: 맞힌 문제 수를 들인 시간으로 나눈 값(빠르게 많이 맞힐수록 높음)
  const efficiency = totalSeconds ? Math.min(1, (correctCount * IDEAL_SECONDS) / totalSeconds) : 0;
  // 일관성: 응답 시간의 변동(변동계수)이 작을수록 높음
  let consistency = answeredCount > 0 ? 1 : 0;
  if (answeredCount > 1 && avgSeconds > 0) {
    const variance = durations.reduce((sum, value) => sum + (value - avgSeconds) ** 2, 0) / answeredCount;
    const coefficientOfVariation = Math.sqrt(variance) / avgSeconds;
    consistency = Math.max(0, Math.min(1, 1 - coefficientOfVariation));
  }
  // 집중력: 최장 연속 정답 비율
  let longestStreak = 0;
  let currentStreak = 0;
  for (const result of results) {
    if (result.isCorrect) {
      currentStreak += 1;
      longestStreak = Math.max(longestStreak, currentStreak);
    } else {
      currentStreak = 0;
    }
  }
  const focus = answeredCount ? longestStreak / answeredCount : 0;

  return (
    <>
      <Seo
        title={`${position.title} 연습`}
        description={`포지션 ${position.title}의 면접 질문을 하나씩 연습합니다.`}
        path={`${PAGE_SEO.INTERVIEW.path}/practice/${position.id}`}
        keywords={[...PAGE_SEO.INTERVIEW.keywords, position.title, "면접 연습"]}
        jsonLd={[
          buildWebPageJsonLd({
            title: `${position.title} 연습`,
            description: `포지션 ${position.title}의 면접 질문을 하나씩 연습합니다.`,
            path: `${PAGE_SEO.INTERVIEW.path}/practice/${position.id}`,
          }),
          buildBreadcrumbJsonLd([
            { name: PAGE_SEO.HOME.title, path: PAGE_SEO.HOME.path },
            { name: PAGE_SEO.INTERVIEW.title, path: PAGE_SEO.INTERVIEW.path },
            { name: "문제 풀이", path: `${PAGE_SEO.INTERVIEW.path}/practice` },
            { name: position.title, path: `${PAGE_SEO.INTERVIEW.path}/practice/${position.id}` },
          ]),
        ]}
      />
      <Stack.Screen options={{ title: position.title }} />
      <Screen>
        <Section title={position.title} description={`${position.subtitle}. 면접 문제를 하나씩 연습합니다.`}>
          <View className="space-y-4">
            {!completed ? (
              <Card className="p-6">
                <Text className="text-xs font-bold uppercase tracking-[0.18em] text-ink-500 dark:text-ink-300">
                  문제 {quizIndex + 1} / {QUIZ_SOURCE.length}
                </Text>
                <Text className="mt-3 text-lg font-semibold text-ink-900 dark:text-white">
                  {QUIZ_SOURCE[quizIndex].question}
                </Text>

                <View className="mt-4 space-y-3">
                  {QUIZ_SOURCE[quizIndex].options.map((opt, i) => {
                    const selected = selectedIndex === i;
                    const correct = QUIZ_SOURCE[quizIndex].answerIndex === i;
                    const optionClass = answered
                      ? selected
                        ? correct
                          ? "border-emerald-400 bg-emerald-50 dark:bg-emerald-500/10"
                          : "border-rose-400 bg-rose-50 dark:bg-rose-500/10"
                        : "border-ink-200 bg-white dark:border-ink-700 dark:bg-ink-800"
                      : "border-ink-200 bg-white dark:border-ink-700 dark:bg-ink-800";

                    return (
                      <TouchableOpacity
                        key={opt}
                        activeOpacity={0.86}
                        onPress={() => selectOption(i)}
                        accessibilityRole="button"
                        accessibilityLabel={`보기: ${opt}`}
                        accessibilityState={{ selected, disabled: answered }}
                        className={`rounded-3xl border px-4 py-4 ${optionClass}`}
                      >
                        <Text
                          className={`text-sm font-semibold ${selected ? "text-ink-900 dark:text-white" : "text-ink-700 dark:text-ink-200"}`}
                        >
                          {opt}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>

                {answered ? (
                  <View className="mt-4 rounded-[28px] border border-ink-200 bg-ink-50 p-4 dark:border-ink-700 dark:bg-ink-900">
                    <Text className="text-sm font-bold text-ink-900 dark:text-white">
                      {selectedIndex === QUIZ_SOURCE[quizIndex].answerIndex ? "정답입니다!" : "아쉽지만 오답입니다."}
                    </Text>
                    <Text className="mt-2 text-sm leading-6 text-ink-600 dark:text-ink-300">
                      {selectedIndex === QUIZ_SOURCE[quizIndex].answerIndex
                        ? "잘 선택했어요. 다음으로 넘어갈까요?"
                        : `정답은 “${QUIZ_SOURCE[quizIndex].options[QUIZ_SOURCE[quizIndex].answerIndex]}”입니다.`}
                    </Text>
                  </View>
                ) : null}

                <View className="mt-4 flex-row justify-end">
                  <TouchableOpacity
                    onPress={nextQuiz}
                    disabled={!answered}
                    accessibilityRole="button"
                    accessibilityLabel="다음 문제로"
                    className="rounded-full bg-ink-100 px-4 py-2 dark:bg-ink-700"
                  >
                    <Text className="text-sm text-ink-900 dark:text-white">다음</Text>
                  </TouchableOpacity>
                </View>
              </Card>
            ) : (
              <Card className="p-6">
                <Text className="text-sm font-bold text-ink-900 dark:text-white">모든 문제를 완료했습니다.</Text>
                <Text className="mt-2 text-sm text-ink-600 dark:text-ink-300">
                  아래 결과지에서 정답을 확인해보세요.
                </Text>
                <View className="mt-4 flex-row justify-end">
                  <TouchableOpacity
                    onPress={() => {
                      setQuizIndex(0);
                      setSelectedIndex(null);
                      setAnswered(false);
                      setResults([]);
                      setQuestionStartTime(Date.now());
                    }}
                    accessibilityRole="button"
                    accessibilityLabel="문제 다시 시작"
                    className="rounded-full bg-brand-600 px-4 py-2"
                  >
                    <Text className="text-sm text-white">다시 시작</Text>
                  </TouchableOpacity>
                </View>
              </Card>
            )}

            {completed && results.length > 0 ? (
              <Card className="rounded-[28px] p-5">
                <Text className="text-sm font-bold uppercase tracking-[0.18em] text-ink-500 dark:text-ink-300">
                  결과지
                </Text>
                <Text className="mt-3 text-lg font-semibold text-ink-900 dark:text-white">
                  맞은 문제 {correctCount} / {answeredCount}
                </Text>
                <Text className="mt-2 text-sm text-ink-600 dark:text-ink-300">
                  평균과 내 실력을 함께 볼 수 있도록 분석 차트를 추가했습니다.
                </Text>

                <View className="mt-5 rounded-[28px] border border-ink-200 bg-white p-4 dark:border-ink-700 dark:bg-ink-950">
                  <RadarChart
                    axes={["정확도", "속도", "완료도", "효율", "일관성", "집중력"]}
                    current={[accuracy, speed, completion, efficiency, consistency, focus]}
                    average={[0.7, 0.7, 1, 0.6, 0.7, 0.6]}
                  />

                  <View className="mt-4 space-y-3">
                    <View className="flex-row items-center justify-between">
                      <Text className="text-sm text-ink-700 dark:text-ink-200">정확도</Text>
                      <Text className="text-sm font-semibold text-ink-900 dark:text-white">
                        {Math.round(accuracy * 100)}%
                      </Text>
                    </View>
                    <View className="flex-row items-center justify-between">
                      <Text className="text-sm text-ink-700 dark:text-ink-200">속도</Text>
                      <Text className="text-sm font-semibold text-ink-900 dark:text-white">
                        {Math.round(speed * 100)}% · 평균 {Math.round(avgSeconds)}초
                      </Text>
                    </View>
                    <View className="flex-row items-center justify-between">
                      <Text className="text-sm text-ink-700 dark:text-ink-200">완료도</Text>
                      <Text className="text-sm font-semibold text-ink-900 dark:text-white">
                        {Math.round(completion * 100)}%
                      </Text>
                    </View>
                    <View className="flex-row items-center justify-between">
                      <Text className="text-sm text-ink-700 dark:text-ink-200">효율</Text>
                      <Text className="text-sm font-semibold text-ink-900 dark:text-white">
                        {Math.round(efficiency * 100)}%
                      </Text>
                    </View>
                    <View className="flex-row items-center justify-between">
                      <Text className="text-sm text-ink-700 dark:text-ink-200">일관성</Text>
                      <Text className="text-sm font-semibold text-ink-900 dark:text-white">
                        {Math.round(consistency * 100)}%
                      </Text>
                    </View>
                    <View className="flex-row items-center justify-between">
                      <Text className="text-sm text-ink-700 dark:text-ink-200">집중력</Text>
                      <Text className="text-sm font-semibold text-ink-900 dark:text-white">
                        {Math.round(focus * 100)}%
                      </Text>
                    </View>
                  </View>
                </View>

                <View className="mt-4 space-y-3">
                  {results.map((result, index) => (
                    <View
                      key={`${result.question || index}-${index}`}
                      className="rounded-2xl border border-ink-200 bg-ink-50 p-4 dark:border-ink-700 dark:bg-ink-900"
                    >
                      <Text className="text-sm font-semibold text-ink-900 dark:text-white">문제 {index + 1}</Text>
                      <Text className="mt-1 text-sm text-ink-700 dark:text-ink-200">
                        {result.question || `문제 ${index + 1}`}
                      </Text>
                      <Text className="mt-2 text-sm text-ink-600 dark:text-ink-300">
                        선택: {result.selected || "-"}
                      </Text>
                      <Text className="text-sm text-ink-600 dark:text-ink-300">정답: {result.correct || "-"}</Text>
                      <Text
                        className={`mt-2 text-sm font-semibold ${result.isCorrect ? "text-emerald-600 dark:text-emerald-300" : "text-rose-600 dark:text-rose-300"}`}
                      >
                        {result.isCorrect ? "O" : "X"}
                      </Text>
                    </View>
                  ))}
                </View>
              </Card>
            ) : null}
          </View>
        </Section>
      </Screen>
    </>
  );
}
