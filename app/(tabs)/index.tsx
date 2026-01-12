import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { supabase } from "../../lib/supabase"; // 경로 확인 필요!

// 단어 데이터 타입 정의
type Word = {
  text: { text: string };
};

export default function App() {
  const [todaysWord, setTodaysWord] = useState<Word | null>(null);
  const [loading, setLoading] = useState(true);

  // 단어 가져오기 함수
  const fetchRandomWord = async () => {
    setLoading(true);
    try {
      // 'words' 테이블에서 랜덤하게 하나 가져오는 쿼리 (가정)
      // 실제로는 테이블에 데이터가 있어야 합니다.
      const { data, error } = await supabase.from("memo").select("text").limit(1).single(); // 일단 하나만 가져와 봅니다.

      if (error) {
        console.error("에러 발생:", error);
        // 에러 시 가짜 데이터라도 보여주기 (개발용)
        setTodaysWord({ text: { text: "데이터를 불러오지 못했습니다." } });
      } else {
        setTodaysWord(data);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomWord();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={{ marginTop: 10 }}>오늘의 단어 배달 중...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>오늘의 주제</Text>

        <Text style={styles.text}>{todaysWord?.text.text || "Empty"}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={fetchRandomWord}>
        <Text style={styles.buttonText}>다른 주제 보기</Text>
      </TouchableOpacity>
    </View>
  );
}

// 일단 스타일은 StyleSheet로 깔끔하게 잡았습니다. (NativeWind 적용 전)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "white",
    width: "100%",
    padding: 30,
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 30,
  },
  title: {
    fontSize: 14,
    color: "#888",
    marginBottom: 10,
    fontWeight: "600",
  },
  text: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#333",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
