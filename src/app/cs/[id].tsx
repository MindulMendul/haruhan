import { getCsMarkdown, getTopicById } from "@/content/cs";
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import Markdown from "react-native-markdown-display";

const markdownStyles = {
  body: { color: "#1e293b", fontSize: 15, lineHeight: 24 },
  heading1: { fontSize: 22, fontWeight: "700" as const, color: "#0f172a", marginBottom: 12 },
  heading2: { fontSize: 17, fontWeight: "600" as const, color: "#1d4ed8", marginTop: 16, marginBottom: 8 },
  strong: { fontWeight: "700" as const },
  code_inline: { backgroundColor: "#f1f5f9", paddingHorizontal: 4, borderRadius: 4 },
  bullet_list: { marginVertical: 6 },
  paragraph: { marginBottom: 10 },
};

export default function CsTopicDetailScreen() {
  const { id: rawId } = useLocalSearchParams<{ id: string | string[] }>();
  const id = Array.isArray(rawId) ? rawId[0] : rawId;
  const topic = id ? getTopicById(id) : undefined;
  const body = id ? getCsMarkdown(id) : "";

  if (!id || !topic) {
    return (
      <View className="flex-1 justify-center items-center p-6 bg-white">
        <Text className="text-slate-600">존재하지 않는 주제입니다.</Text>
      </View>
    );
  }

  const shortTitle = `${topic.emoji} ${topic.title.split("(")[0].trim()}`;

  return (
    <>
      <Stack.Screen options={{ title: shortTitle }} />
      <ScrollView className="flex-1 bg-white px-4 py-4" contentContainerStyle={{ paddingBottom: 48 }}>
        <Text className="text-sm text-slate-500 mb-2">{topic.subtitle}</Text>
        <Markdown style={markdownStyles}>{body}</Markdown>
      </ScrollView>
    </>
  );
}
