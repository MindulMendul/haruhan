import { StyleSheet, Text, View } from "react-native";

export default function ExploreScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>탐색 화면</Text>
      <Text style={styles.subtitle}>여기서 다양한 기능을 탐색할 수 있습니다.</Text>
      <Text style={styles.text}>앱이 정상적으로 작동하고 있습니다!</Text>
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
    marginBottom: 10,
    color: "#333",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    color: "#666",
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    color: "#888",
  },
});
