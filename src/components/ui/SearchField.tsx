import { cn } from "@/lib/cn";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import React from "react";
import { TextInput, TouchableOpacity, View, type TextInputProps } from "react-native";

interface SearchFieldProps extends TextInputProps {
  value: string;
  onChangeText: (value: string) => void;
  className?: string;
}

export function SearchField({ value, onChangeText, className, ...props }: SearchFieldProps) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <View
      className={cn(
        "flex-row items-center gap-2 rounded-2xl border border-ink-200 bg-white px-4 py-2.5 shadow-sm dark:border-ink-700 dark:bg-ink-800",
        className
      )}
    >
      <Ionicons name="search" size={18} color={isDark ? "#cbd5e1" : "#64748b"} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        accessibilityLabel={props.accessibilityLabel ?? "검색어 입력"}
        accessibilityHint={props.accessibilityHint ?? "검색할 키워드를 입력하세요. 초성이나 영문 키보드로 친 한글도 검색됩니다."}
        placeholderTextColor={isDark ? "#cbd5e1" : "#94a3b8"}
        className="min-h-[34px] flex-1 text-sm font-semibold text-ink-900 dark:text-white"
        autoCapitalize="none"
        autoCorrect={false}
        {...props}
      />
      {value.length > 0 ? (
        <TouchableOpacity
          className="h-8 w-8 items-center justify-center rounded-full bg-ink-100 dark:bg-ink-700"
          accessibilityRole="button"
          accessibilityLabel="검색어 지우기"
          accessibilityHint="입력한 검색어를 지웁니다."
          onPress={() => onChangeText("")}
        >
          <Ionicons name="close" size={16} color={isDark ? "#cbd5e1" : "#64748b"} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

