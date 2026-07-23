import { Button, Screen, useToast } from "@/components/ui";
import { ROUTES } from "@/constants/routes";
import { PAGE_SEO } from "@/constants/seo";
import { useHaruhanChat } from "@/hooks/useHaruhanChat";
import { Seo, buildBreadcrumbJsonLd, buildWebPageJsonLd } from "@/lib/seo";
import { Stack, useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import React, { useRef, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

interface ChatMessage {
  id: number;
  role: "user" | "assistant";
  content: string;
}

let nextMessageId = 0;

export default function CsIndexScreen() {
  const router = useRouter();
  const { toast } = useToast();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const chat = useHaruhanChat();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const scrollRef = useRef<ScrollView>(null);

  const handleSend = () => {
    const prompt = input.trim();
    if (!prompt || chat.isPending) return;

    setMessages((prev) => [...prev, { id: nextMessageId++, role: "user", content: prompt }]);
    setInput("");

    chat.mutate(prompt, {
      onSuccess: (result) => {
        setMessages((prev) => [...prev, { id: nextMessageId++, role: "assistant", content: result }]);
      },
      onError: () => {
        toast({
          title: "응답을 받지 못했습니다",
          description: "잠시 후 다시 시도해 주세요.",
          variant: "destructive",
        });
      },
    });
  };

  return (
    <>
      <Seo
        title={PAGE_SEO.CS_INDEX.title}
        description={PAGE_SEO.CS_INDEX.description}
        path={PAGE_SEO.CS_INDEX.path}
        keywords={[...PAGE_SEO.CS_INDEX.keywords]}
        jsonLd={[
          buildWebPageJsonLd({
            title: PAGE_SEO.CS_INDEX.title,
            description: PAGE_SEO.CS_INDEX.description,
            path: PAGE_SEO.CS_INDEX.path,
          }),
          buildBreadcrumbJsonLd([
            { name: PAGE_SEO.HOME.title, path: PAGE_SEO.HOME.path },
            { name: "공부", path: PAGE_SEO.CS_INDEX.path },
          ]),
        ]}
      />
      <Stack.Screen options={{ title: PAGE_SEO.CS_INDEX.title }} />
      <Screen scroll={false}>
        <KeyboardAvoidingView
          className="flex-1"
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
        >
          <View className="mx-auto w-full max-w-[760px] flex-1 px-5 pt-5">
            <View className="flex-row items-start justify-between">
              <View className="flex-1 pr-3">
                <Text className="text-lg font-extrabold text-ink-900 dark:text-white">공부 AI 채팅</Text>
                <Text className="mt-1 text-xs leading-5 text-ink-500 dark:text-ink-300">
                  궁금한 CS 개념이나 면접 질문을 하루한 AI에게 물어보세요.
                </Text>
              </View>
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityLabel="기존 학습 자료로 이동"
                onPress={() => router.push(ROUTES.CS_LEGACY)}
                className="mt-1"
              >
                <Text className="text-xs font-bold text-brand-600 dark:text-brand-200">기존 학습 자료 →</Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              ref={scrollRef}
              className="mt-4 flex-1 rounded-[28px] border border-ink-200 bg-white dark:border-ink-700 dark:bg-ink-800"
              contentContainerStyle={{ padding: 16, flexGrow: 1 }}
              onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
            >
              {messages.length === 0 ? (
                <Text className="text-sm leading-6 text-ink-500 dark:text-ink-300">
                  아직 대화가 없습니다. 아래 입력창에 궁금한 점을 적어보세요.
                </Text>
              ) : (
                <View className="gap-2.5">
                  {messages.map((message) => (
                    <View key={message.id} className={message.role === "user" ? "items-end" : "items-start"}>
                      <View
                        className={
                          message.role === "user"
                            ? "max-w-[85%] rounded-2xl rounded-tr-sm bg-brand-600 px-4 py-2.5"
                            : "max-w-[85%] rounded-2xl rounded-tl-sm border border-ink-200 bg-ink-50 px-4 py-2.5 dark:border-ink-700 dark:bg-ink-900"
                        }
                      >
                        <Text
                          className={
                            message.role === "user"
                              ? "text-sm leading-6 text-white"
                              : "text-sm leading-6 text-ink-900 dark:text-white"
                          }
                        >
                          {message.content}
                        </Text>
                      </View>
                    </View>
                  ))}
                  {chat.isPending ? (
                    <View className="items-start">
                      <View className="rounded-2xl rounded-tl-sm border border-ink-200 bg-ink-50 px-4 py-2.5 dark:border-ink-700 dark:bg-ink-900">
                        <Text className="text-sm text-ink-500 dark:text-ink-300">답변을 생각하는 중...</Text>
                      </View>
                    </View>
                  ) : null}
                </View>
              )}
            </ScrollView>

            <View className="my-3 flex-row items-end gap-2">
              <TextInput
                value={input}
                onChangeText={setInput}
                placeholder="메시지를 입력하세요"
                placeholderTextColor={isDark ? "#cbd5e1" : "#94a3b8"}
                multiline
                accessibilityLabel="채팅 메시지 입력"
                className="max-h-28 flex-1 rounded-2xl border border-ink-200 bg-white px-4 py-2.5 text-sm text-ink-900 dark:border-ink-700 dark:bg-ink-800 dark:text-white"
              />
              <Button
                onPress={handleSend}
                disabled={!input.trim() || chat.isPending}
                className={!input.trim() || chat.isPending ? "opacity-40" : undefined}
              >
                전송
              </Button>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Screen>
    </>
  );
}
