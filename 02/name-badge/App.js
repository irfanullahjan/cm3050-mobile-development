import { StatusBar } from "expo-status-bar";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { lockAsync, OrientationLock } from "expo-screen-orientation";
import { useEffect, useState } from "react";

export default function App() {
  lockAsync(OrientationLock.LANDSCAPE_LEFT);

  const [randomColor, setRandomColor] = useState("rgb(255, 255, 255)");

  useEffect(() => {
    const interval = setInterval(() => {
      let randomRed = Math.floor(Math.random() * 256);
      let randomGreen = Math.floor(Math.random() * 256);
      let randomBlue = Math.floor(Math.random() * 256);
      setRandomColor(`rgb(${randomRed}, ${randomGreen}, ${randomBlue})`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={[styles.welcomeText, {color: randomColor}]}>Hello</Text>
      <Text style={styles.subtitleText}>My name is</Text>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>Irfan 🚴 (he/him)</Text>
        <Image style={styles.badgeImage} source={require('./assets/irfan.jpg')} />
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
    textShadowColor: "black",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  subtitleText: {
    fontSize: 30,
    textTransform: "uppercase",
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
    textAlign: "center",
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  badge: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    alignItems: "center",
    shadowColor: "black",
    shadowOffset: { width: 10, height: 10 },
    shadowRadius: 30,
    shadowOpacity: 0.8,
  },
  badgeText: {
    fontSize: 60,
    textAlign: "center",
    fontWeight: "bold",
  },
  badgeImage: {
    width: "20%",
    aspectRatio: 1,
    borderRadius: 10000,
    borderWidth: 1,
    borderColor: "black",
  },
});
