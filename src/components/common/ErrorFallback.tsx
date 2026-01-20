import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export const ErrorFallback = ({ error, resetErrorBoundary }: any) => (
  <View className="flex-1 justify-center items-center p-6 bg-white">
    <Text className="text-4xl mb-4">😵‍💫</Text>
    <Text className="text-xl font-bold text-red-500 mb-2">앱에 문제가 발생했어요</Text>
    <Text className="text-gray-500 text-center mb-6">{error.message || "알 수 없는 오류가 발생했습니다."}</Text>
    <TouchableOpacity onPress={resetErrorBoundary} className="bg-gray-800 px-8 py-3 rounded-full">
      <Text className="text-white font-bold">다시 시도하기</Text>
    </TouchableOpacity>
  </View>
);
