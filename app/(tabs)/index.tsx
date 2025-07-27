import { StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>HaruHan 앱</Text>
      <Text style={styles.subtitle}>환영합니다!</Text>
      <Text style={styles.text}>앱이 정상적으로 실행되고 있습니다.</Text>
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
