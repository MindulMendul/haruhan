import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View, FlatList, Dimensions, TouchableOpacity } from "react-native";
import { supabase } from "../../lib/supabase"; // 경로 확인 필요!

// 단어 데이터 타입 정의
type Word = {
  term: string;
  definition: string;
};

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function App() {
  const [words, setWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  // 모든 단어 가져오기 함수
  const fetchAllWords = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from("network_terms").select("*");

      if (error) {
        console.error("에러 발생:", error);
        setWords([]);
      } else {
        setWords(data || []);
      }
    } catch (e) {
      console.log(e);
      setWords([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllWords();
  }, []);

  // 카드 접기/펼치기 토글 함수
  const toggleExpand = (index: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedItems(newExpanded);
  };

  // 카드 렌더링 함수
  const renderCard = ({ item, index }: { item: Word; index: number }) => {
    const isExpanded = expandedItems.has(index);
    
    return (
      <TouchableOpacity 
        style={styles.card}
        onPress={() => toggleExpand(index)}
        activeOpacity={0.9}
      >
        <Text style={styles.title}>{item.term || "Title"}</Text>
        {isExpanded && (
          <Text style={styles.text}>{item.definition || "Empty"}</Text>
        )}
        {!isExpanded && (
          <Text style={styles.hintText}>탭하여 설명 보기</Text>
        )}
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={{ marginTop: 10 }}>단어 목록 불러오는 중...</Text>
      </View>
    );
  }

  if (words.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>표시할 데이터가 없습니다.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={words}
        renderItem={renderCard}
        keyExtractor={(item, index) => `${item.term}-${index}`}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

// 일단 스타일은 StyleSheet로 깔끔하게 잡았습니다. (NativeWind 적용 전)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
  },
  listContent: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  card: {
    backgroundColor: "white",
    width: SCREEN_WIDTH - 40,
    padding: 30,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 20,
    minHeight: 150,
  },
  title: {
    fontSize: 21,
    color: "#000",
    marginBottom: 10,
    fontWeight: "600",
    textAlign: "center",
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginTop: 10,
    textAlign: "center",
  },
  hintText: {
    fontSize: 12,
    color: "#aaa",
    marginTop: 10,
    fontStyle: "italic",
  },
  emptyText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
  },
});
