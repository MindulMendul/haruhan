import { StyleSheet, Text, View } from "react-native";

export default function TestScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>테스트 화면</Text>
      <Text style={styles.text}>이 화면이 보인다면 앱이 정상 작동합니다!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
  },
});
