import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Markdown from "react-native-markdown-display";

interface WordCardProps {
  item: Word;
}
const WordCard = React.memo(({ item }: WordCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <View className="w-full items-center">
      <View className="w-full max-w-6xl">
        <TouchableOpacity
          className={`p-8 rounded-[20px] bg-white items-center justify-center border shadow-md mx-5 my-3 min-h-[150px] ${
            isExpanded ? "border-[#f2a65a]" : "border-gray-100"
          }`}
          onPress={() => setIsExpanded(!isExpanded)}
          activeOpacity={0.9}
        >
          <View className="w-full px-5">
            <Text className="text-[21px] text-[#3b3b3b] mb-2 font-semibold text-center">{item.term || "Title"}</Text>
            {isExpanded ? (
              <Markdown
                style={{
                  body: { color: "#333", fontSize: 14 },
                  strong: { fontWeight: "bold", color: "#f2a65a" },
                  code_inline: { backgroundColor: "#f3f4f6", padding: 2 },
                }}
              >
                {item.definition}
              </Markdown>
            ) : (
              <Text className="text-[12px] text-[#a7b0d9] mt-2 text-center italic">탭하여 설명 보기</Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
});

export default WordCard;
