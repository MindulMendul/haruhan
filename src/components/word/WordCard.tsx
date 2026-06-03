import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Markdown from "react-native-markdown-display";
import { useColorScheme } from "nativewind";

interface WordCardProps {
  item: Word;
}
const WordCardInner = ({ item }: WordCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { colorScheme } = useColorScheme();
  const markdownStyle =
    colorScheme === "dark"
      ? {
          body: { color: "#e2e8f0", fontSize: 14, lineHeight: 23 },
          strong: { fontWeight: "bold" as const, color: "#bfdbfe" },
          code_inline: { backgroundColor: "#334155", color: "#f8fafc", padding: 2 },
        }
      : {
          body: { color: "#334155", fontSize: 14, lineHeight: 23 },
          strong: { fontWeight: "bold" as const, color: "#245fdb" },
          code_inline: { backgroundColor: "#f1f5f9", color: "#1e293b", padding: 2 },
        };

  return (
    <View className="w-full items-center">
      <View className="w-full max-w-6xl">
        <TouchableOpacity
          className={`p-8 rounded-[20px] bg-white items-center justify-center border shadow-md mx-5 my-3 min-h-[150px] dark:bg-ink-800 ${
            isExpanded ? "border-brand-600" : "border-ink-200 dark:border-ink-700"
          }`}
          onPress={() => setIsExpanded(!isExpanded)}
          activeOpacity={0.9}
        >
          <View className="w-full px-5">
            <Text className="text-[21px] text-ink-900 mb-2 font-semibold text-center dark:text-white">{item.term || "Title"}</Text>
            {isExpanded ? (
              <Markdown style={markdownStyle}>
                {item.definition}
              </Markdown>
            ) : (
              <Text className="text-[12px] text-ink-500 mt-2 text-center italic dark:text-ink-300">탭하여 설명 보기</Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const WordCard = React.memo(WordCardInner);
WordCard.displayName = "WordCard";

export default WordCard;
