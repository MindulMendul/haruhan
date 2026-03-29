import { getCsMarkdown } from "@/content/cs";
import type { CsTopicMeta } from "@/types/cs";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Markdown from "react-native-markdown-display";

interface CsTopicCardProps {
  topic: CsTopicMeta;
}

const markdownStyles = {
  body: { color: "#333", fontSize: 14, lineHeight: 22 },
  heading1: { fontSize: 20, fontWeight: "700" as const, color: "#1e3a5f", marginBottom: 8 },
  heading2: { fontSize: 16, fontWeight: "600" as const, color: "#2563eb", marginTop: 12, marginBottom: 6 },
  strong: { fontWeight: "700" as const, color: "#1e40af" },
  code_inline: { backgroundColor: "#f1f5f9", paddingHorizontal: 4, borderRadius: 4, color: "#0f172a" },
  bullet_list: { marginTop: 4 },
  paragraph: { marginBottom: 8 },
};

const CsTopicCardInner = ({ topic }: CsTopicCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();
  const body = getCsMarkdown(topic.id);

  return (
    <View className="w-full items-center">
      <View className="w-full max-w-6xl px-5">
        <View
          className={`rounded-2xl border bg-white px-5 py-4 mb-3 shadow-sm ${
            expanded ? "border-indigo-300 border-2" : "border-slate-200"
          }`}
        >
          <TouchableOpacity onPress={() => setExpanded(!expanded)} activeOpacity={0.92}>
            <View className="flex-row items-start gap-3">
              <Text className="text-2xl">{topic.emoji}</Text>
              <View className="flex-1">
                <Text className="text-lg font-bold text-slate-900">{topic.title}</Text>
                <Text className="text-xs text-slate-500 mt-0.5">{topic.subtitle}</Text>
                <Text className="text-sm text-slate-600 mt-2 leading-5">{topic.cardSummary}</Text>
              </View>
            </View>
            {!expanded ? (
              <Text className="text-xs text-indigo-400 mt-3 text-center">탭하여 전체 노트 보기</Text>
            ) : null}
          </TouchableOpacity>
          {expanded ? (
            <View className="mt-4 pt-4 border-t border-slate-100">
              <Markdown style={markdownStyles}>{body}</Markdown>
              <TouchableOpacity
                onPress={() => router.push(`/cs/${topic.id}`)}
                className="mt-4 self-center bg-slate-800 px-4 py-2 rounded-full"
                activeOpacity={0.85}
              >
                <Text className="text-white text-xs font-semibold">전체 화면으로</Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );
};

export const CsTopicCard = React.memo(CsTopicCardInner);
CsTopicCard.displayName = "CsTopicCard";
