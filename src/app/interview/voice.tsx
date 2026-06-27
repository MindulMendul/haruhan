import { RadarChart } from "@/components/interview/RadarChart";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Screen } from "@/components/ui/Screen";
import { Section } from "@/components/ui/Section";
import { PAGE_SEO } from "@/constants/seo";
import { Seo, buildBreadcrumbJsonLd, buildWebPageJsonLd } from "@/lib/seo";
import { Stack } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";

const BEHAVIORAL_QUESTIONS = [
  "가장 도전적이었던 프로젝트와 그 과정에서 배운 점을 설명해보세요.",
  "갈등이 있었던 팀원과 어떻게 협업을 개선했나요?",
  "실패 경험을 어떻게 극복했는지 구체적으로 말씀해주세요.",
];

interface VoiceResponse {
  question: string;
  transcript: string;
  duration: number;
}

export default function InterviewVoiceScreen() {
  const [supported, setSupported] = useState(false);
  const [listening, setListening] = useState(false);
  const [recorded, setRecorded] = useState(false);
  const [transcript, setTranscript] = useState("");
  const transcriptRef = useRef("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);
  const [responses, setResponses] = useState<VoiceResponse[]>([]);

  const addResponse = useCallback((r: VoiceResponse) => setResponses((prev) => [...prev, r]), []);
  const resetResponses = useCallback(() => setResponses([]), []);
  const recognitionRef = useRef<any>(null);
  const intervalRef = useRef<any>(null);
  // 사용자가 계속 듣기를 원하는지(stop을 누르지 않았는지) 추적
  const shouldListenRef = useRef(false);
  // network 등 일시적 오류로 인한 자동 재시작 횟수
  const retryRef = useRef(0);
  const [elapsed, setElapsed] = useState(0);

  const MAX_RETRIES = 3;

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "ko-KR";

    recognition.onresult = (event: any) => {
      try {
        // event.results는 세션 누적 목록이므로, 매번 전체를 다시 조립한다.
        // (덧붙이면 같은 발화가 중복으로 쌓인다)
        let full = "";
        for (let i = 0; i < event.results.length; i++) {
          const r = event.results[i];
          if (!r || !r[0]) continue;
          full += r[0].transcript;
        }
        full = full.trim();
        transcriptRef.current = full;
        setTranscript(full);
        // 정상 인식이 들어오면 일시적 오류 카운터를 초기화하고 에러 메시지를 지운다.
        retryRef.current = 0;
        setError(null);
      } catch (e) {
        // ignore parsing errors
      }
    };

    recognition.onend = () => {
      // 사용자가 멈추지 않았는데 세션이 끝났다면(크롬은 주기적으로 끊는다) 자동 재개한다.
      if (shouldListenRef.current && retryRef.current <= MAX_RETRIES) {
        try {
          recognition.start();
          return;
        } catch (e) {
          // 재시작 실패 시 아래로 떨어져 듣기 상태를 정리한다.
        }
      }
      setListening(false);
    };

    recognition.onerror = (event: any) => {
      const code = event?.error;
      // 무음/중단은 오류로 취급하지 않고, onend의 자동 재개에 맡긴다.
      if (code === "no-speech" || code === "aborted") {
        return;
      }
      // 네트워크 오류는 일시적인 경우가 많아 몇 번까지는 조용히 재시도한다.
      if (code === "network") {
        retryRef.current += 1;
        if (retryRef.current <= MAX_RETRIES) {
          return;
        }
        shouldListenRef.current = false;
        setError("음성 인식 서버 연결이 불안정합니다. 네트워크 상태를 확인하고 잠시 후 다시 시도해 주세요.");
        setListening(false);
        return;
      }
      if (code === "not-allowed" || code === "service-not-allowed") {
        shouldListenRef.current = false;
        setError("마이크 권한이 필요합니다. 브라우저에서 마이크 사용을 허용해 주세요.");
        setListening(false);
        return;
      }
      shouldListenRef.current = false;
      setError("음성 인식 중 오류가 발생했습니다.");
      setListening(false);
    };

    recognitionRef.current = recognition;
    setSupported(true);

    return () => {
      shouldListenRef.current = false;
      recognition.stop?.();
      clearInterval(intervalRef.current);
    };
  }, []);

  // stop listening only; do NOT auto-advance. user will press '다음' to save & advance.
  const stopAndNext = useCallback(() => {
    if (!recognitionRef.current) return;
    if (!listening) return;

    // 사용자가 직접 멈췄으므로 자동 재개를 막는다.
    shouldListenRef.current = false;

    try {
      recognitionRef.current.stop();
    } catch (e) {
      // ignore
    }

    clearInterval(intervalRef.current);
    // elapsed는 confirmNext에서 소요 시간으로 사용하므로 여기서 초기화하지 않는다.
    setListening(false);
    setRecorded(true);
    // leave transcriptRef.current and transcript intact so user can review before advancing
  }, [listening]);

  // When user confirms next, push stored transcript into responses and advance index
  const confirmNext = useCallback(() => {
    const finalTranscript = transcriptRef.current.trim() || transcript.trim();
    const response: VoiceResponse = {
      question: BEHAVIORAL_QUESTIONS[currentIndex],
      transcript: finalTranscript || "응답 없음",
      duration: elapsed,
    };
    addResponse(response);

    // reset transcript and elapsed for next question
    setTranscript("");
    transcriptRef.current = "";
    setElapsed(0);
    setRecorded(false);

    setCurrentIndex((prev) => {
      const nextIndex = prev + 1;
      if (nextIndex >= BEHAVIORAL_QUESTIONS.length) {
        setCompleted(true);
        return prev;
      }
      return nextIndex;
    });
  }, [transcript, currentIndex, elapsed, addResponse]);

  const startListening = useCallback(() => {
    if (!recognitionRef.current) return;
    try {
      setError(null);
      setTranscript("");
      transcriptRef.current = "";
      setRecorded(false);
      shouldListenRef.current = true;
      retryRef.current = 0;
      recognitionRef.current.start();
      setListening(true);
      setElapsed(0);
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setElapsed((s) => s + 1);
      }, 1000);
    } catch (e) {
      setError("음성 인식 시작에 실패했습니다.");
    }
  }, []);

  const answeredCount = responses.length;
  const durations = responses.map((item: VoiceResponse) => item.duration);
  const avgDuration = answeredCount ? durations.reduce((sum, value) => sum + value, 0) / answeredCount : 0;
  const avgLength = answeredCount
    ? responses.reduce((sum: number, item: VoiceResponse) => sum + item.transcript.length, 0) / answeredCount
    : 0;
  const nonEmptyCount = responses.filter(
    (item: VoiceResponse) => item.transcript && item.transcript !== "응답 없음",
  ).length;

  // 발화량: 답변 길이(말한 양)
  const volumeScore = answeredCount ? Math.min(1, avgLength / 120) : 0;
  // 충실도: 더 높은 기준의 답변 길이(자세히 답했는지)
  const depthScore = answeredCount ? Math.min(1, avgLength / 250) : 0;
  // 완료도: 시도한 질문 비율
  const completionScore = answeredCount / BEHAVIORAL_QUESTIONS.length;
  // 적극성: 실제로 내용이 있는 답변 비율
  const engagementScore = answeredCount ? nonEmptyCount / answeredCount : 0;
  // 지속력: 충분히 길게 말했는지(평균 응답 시간 기준)
  const enduranceScore = avgDuration ? Math.min(1, avgDuration / 45) : 0;
  // 일관성: 답변 시간의 변동(변동계수)이 작을수록 높음
  let consistencyScore = answeredCount > 0 ? 1 : 0;
  if (answeredCount > 1 && avgDuration > 0) {
    const variance = durations.reduce((sum, value) => sum + (value - avgDuration) ** 2, 0) / answeredCount;
    const coefficientOfVariation = Math.sqrt(variance) / avgDuration;
    consistencyScore = Math.max(0, Math.min(1, 1 - coefficientOfVariation));
  }

  return (
    <>
      <Seo
        title="보이스 인터뷰"
        description="인성 면접 질문을 읽고 말하면, 수정 없이 다음 질문으로 넘어가는 연습을 합니다."
        path={`${PAGE_SEO.INTERVIEW.path}/voice`}
        keywords={[...PAGE_SEO.INTERVIEW.keywords, "보이스 인터뷰", "음성 연습", "인성 면접"]}
        jsonLd={[
          buildWebPageJsonLd({
            title: "보이스 인터뷰",
            description: "인성 면접 질문을 읽고 말하면, 수정 없이 다음 질문으로 넘어가는 연습을 합니다.",
            path: `${PAGE_SEO.INTERVIEW.path}/voice`,
          }),
          buildBreadcrumbJsonLd([
            { name: PAGE_SEO.HOME.title, path: PAGE_SEO.HOME.path },
            { name: PAGE_SEO.INTERVIEW.title, path: PAGE_SEO.INTERVIEW.path },
            { name: "보이스 인터뷰", path: `${PAGE_SEO.INTERVIEW.path}/voice` },
          ]),
        ]}
      />
      <Stack.Screen options={{ title: "면접" }} />
      <Screen>
        <Section
          title="면접"
          description="인성 질문을 듣고 바로 말하며, 수정 없이 다음 질문으로 넘어가는 흐름을 연습합니다."
        >
          <View className="rounded-[28px] p-5">
            <Text className="text-sm font-extrabold text-ink-900 dark:text-white">인성 면접 질문</Text>
            <Text className="mt-3 text-lg font-semibold text-ink-900 dark:text-white">
              {completed ? "모든 질문을 완료했습니다." : BEHAVIORAL_QUESTIONS[currentIndex]}
            </Text>
            <Text className="mt-3 text-sm leading-6 text-ink-600 dark:text-ink-300">
              {completed
                ? `축하합니다! ${BEHAVIORAL_QUESTIONS.length}개의 인성 질문을 모두 연습했습니다.`
                : `질문 ${currentIndex + 1} / ${BEHAVIORAL_QUESTIONS.length}`}
            </Text>

            {!completed ? (
              <View className="mt-5 flex-row items-center justify-between">
                <View className="flex-row items-center gap-3">
                  {!recorded ? (
                    <Button variant="primary" onPress={listening ? stopAndNext : startListening}>
                      {listening ? "말하기 종료" : "말하기 시작"}
                    </Button>
                  ) : null}
                  {listening ? (
                    <Text className="text-sm font-mono text-ink-900 dark:text-white">{`${Math.floor(elapsed / 60)}:${String(elapsed % 60).padStart(2, "0")}`}</Text>
                  ) : (
                    <Text className="text-sm text-ink-500 dark:text-ink-400">{recorded ? "녹음 완료" : "준비"}</Text>
                  )}
                </View>
                <Button
                  variant="secondary"
                  onPress={confirmNext}
                  disabled={!recorded || listening}
                  className={!recorded || listening ? "opacity-40" : undefined}
                >
                  다음으로 넘어가기
                </Button>
              </View>
            ) : (
              <View className="mt-5 flex-row justify-end">
                <Button
                  variant="primary"
                  onPress={() => {
                    setCurrentIndex(0);
                    resetResponses();
                    setCompleted(false);
                    setTranscript("");
                    setElapsed(0);
                    setRecorded(false);
                  }}
                >
                  다시 시작
                </Button>
              </View>
            )}
          </View>

          {!supported ? (
            <Card className="rounded-[28px] p-5 bg-yellow-50 dark:bg-yellow-900/20">
              <Text className="text-sm font-extrabold text-ink-900 dark:text-white">
                음성 인식이 지원되지 않습니다.
              </Text>
              <Text className="mt-2 text-sm leading-6 text-ink-700 dark:text-ink-200">
                Chrome 기반 웹 브라우저에서만 동작합니다. 네이티브 앱에서는 다음 버전에서 지원을 확장할 수 있습니다.
              </Text>
            </Card>
          ) : null}

          {error ? (
            <Card className="rounded-[28px] p-5 bg-red-50 dark:bg-red-900/20">
              <Text className="text-sm font-extrabold text-red-700 dark:text-red-200">오류</Text>
              <Text className="mt-2 text-sm leading-6 text-red-700 dark:text-red-200">{error}</Text>
            </Card>
          ) : null}

          {!completed ? (
            <Section
              title="발화 결과"
              description="말한 내용이 자동으로 텍스트로 기록되고, 수정 없이 다음 문제로 넘어갑니다."
            >
              <View className="rounded-[28px] border border-ink-200 bg-white p-4 dark:border-ink-700 dark:bg-ink-900">
                <Text className="text-sm leading-6 text-ink-700 dark:text-ink-200">
                  {transcript || "말하기를 시작하면 여기에 텍스트가 표시됩니다."}
                </Text>
              </View>
            </Section>
          ) : null}

          {completed && responses.length ? (
            <Card className="rounded-[28px] p-5">
              <Text className="text-sm font-bold uppercase tracking-[0.18em] text-ink-500 dark:text-ink-300">
                연습 결과
              </Text>
              <Text className="mt-3 text-lg font-semibold text-ink-900 dark:text-white">
                총 {responses.length}개 질문을 연습했습니다.
              </Text>
              <Text className="mt-2 text-sm leading-6 text-ink-600 dark:text-ink-300">
                평균 대비 현재 연습 수준을 한눈에 확인하세요.
              </Text>

              <View className="mt-5 rounded-[28px] border border-ink-200 bg-white p-4 dark:border-ink-700 dark:bg-ink-950">
                <RadarChart
                  axes={["발화량", "충실도", "완료도", "적극성", "지속력", "일관성"]}
                  current={[
                    volumeScore,
                    depthScore,
                    completionScore,
                    engagementScore,
                    enduranceScore,
                    consistencyScore,
                  ]}
                  average={[0.7, 0.5, 1, 0.8, 0.6, 0.7]}
                />

                <View className="mt-4 space-y-3">
                  <View className="flex-row items-center justify-between">
                    <Text className="text-sm text-ink-700 dark:text-ink-200">발화량</Text>
                    <Text className="text-sm font-semibold text-ink-900 dark:text-white">
                      {Math.round(volumeScore * 100)}% · 평균 {Math.round(avgLength)}자
                    </Text>
                  </View>
                  <View className="flex-row items-center justify-between">
                    <Text className="text-sm text-ink-700 dark:text-ink-200">충실도</Text>
                    <Text className="text-sm font-semibold text-ink-900 dark:text-white">
                      {Math.round(depthScore * 100)}%
                    </Text>
                  </View>
                  <View className="flex-row items-center justify-between">
                    <Text className="text-sm text-ink-700 dark:text-ink-200">완료도</Text>
                    <Text className="text-sm font-semibold text-ink-900 dark:text-white">
                      {Math.round(completionScore * 100)}%
                    </Text>
                  </View>
                  <View className="flex-row items-center justify-between">
                    <Text className="text-sm text-ink-700 dark:text-ink-200">적극성</Text>
                    <Text className="text-sm font-semibold text-ink-900 dark:text-white">
                      {Math.round(engagementScore * 100)}%
                    </Text>
                  </View>
                  <View className="flex-row items-center justify-between">
                    <Text className="text-sm text-ink-700 dark:text-ink-200">지속력</Text>
                    <Text className="text-sm font-semibold text-ink-900 dark:text-white">
                      {Math.round(enduranceScore * 100)}% · 평균 {Math.round(avgDuration)}초
                    </Text>
                  </View>
                  <View className="flex-row items-center justify-between">
                    <Text className="text-sm text-ink-700 dark:text-ink-200">일관성</Text>
                    <Text className="text-sm font-semibold text-ink-900 dark:text-white">
                      {Math.round(consistencyScore * 100)}%
                    </Text>
                  </View>
                </View>
              </View>

              <View className="mt-4 space-y-3">
                {responses.map((response, index) => (
                  <View
                    key={`${response.question}-${index}`}
                    className="rounded-2xl border border-ink-200 bg-ink-50 p-4 dark:border-ink-700 dark:bg-ink-900"
                  >
                    <Text className="text-sm font-semibold text-ink-900 dark:text-white">질문 {index + 1}</Text>
                    <Text className="mt-1 text-sm text-ink-700 dark:text-ink-200">{response.question}</Text>
                    <Text className="mt-2 text-sm text-ink-600 dark:text-ink-300">답변: {response.transcript}</Text>
                    <Text className="mt-2 text-sm text-ink-600 dark:text-ink-300">
                      소요 시간: {Math.floor(response.duration / 60)}:{String(response.duration % 60).padStart(2, "0")}
                    </Text>
                  </View>
                ))}
              </View>
            </Card>
          ) : null}
        </Section>
      </Screen>
    </>
  );
}
