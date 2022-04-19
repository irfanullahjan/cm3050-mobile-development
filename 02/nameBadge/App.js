import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { lockAsync, OrientationLock } from "expo-screen-orientation";

export default function App() {
  lockAsync(OrientationLock.LANDSCAPE_LEFT);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.welcomeText}>Hello</Text>
      <Text style={styles.subtitleText}>My name is</Text>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>Irfan ☕ (he/him)</Text>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
  welcomeText: {
    fontSize: 90,
    textTransform: "uppercase",
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  subtitleText: {
    fontSize: 30,
    textTransform: "uppercase",
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
    textAlign: "center",
  },
  badge: {
    width: "90%",
    height: "40%",
    backgroundColor: "white",
    borderRadius: 5,
    justifyContent: "center",
  },
  badgeText: {
    fontSize: 60,
    textAlign: "center",
    fontWeight: "bold",
  },
});
