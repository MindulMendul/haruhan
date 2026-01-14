import { Link } from "expo-router";
import React from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function Home() {
  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.logoText}>하루한</Text>
        <Text style={styles.subtitle}>오늘 하나의 개념을 가볍게 정리해보는 시간</Text>
      </View>

      <View style={styles.descriptionBox}>
        <Text style={styles.description}>PoC용 서비스입니다. 아래의 버튼을 통해 개념을 학습할 수 있습니다.</Text>
      </View>

      <Link href="/network" asChild>
        <TouchableOpacity style={styles.primaryButton} activeOpacity={0.85}>
          <Text style={styles.primaryButtonText}>네트워크 개념 학습하러 가기</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

// 일단 스타일은 StyleSheet로 깔끔하게 잡았습니다. (NativeWind 적용 전)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 80,
  },
  hero: {
    marginBottom: 32,
  },
  logoText: {
    fontSize: 40,
    fontWeight: "700",
  },
  subtitle: {
    marginTop: 8,
    fontSize: 14,
  },
  descriptionBox: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    marginBottom: 24,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
  primaryButton: {
    backgroundColor: "#6a96ff",
    paddingVertical: 14,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "600",
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  card: {
    width: SCREEN_WIDTH - 40,
    padding: 30,
    borderRadius: 20,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    elevation: 5,
    marginBottom: 20,
    minHeight: 150,
  },
  title: {
    fontSize: 21,
    color: "#3b3b3b",
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
    color: "#a7b0d9",
    marginTop: 10,
    fontStyle: "italic",
  },
  emptyText: {
    fontSize: 16,
    color: "#b38b5f",
    textAlign: "center",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: "#b38b5f",
    textAlign: "center",
  },
});
