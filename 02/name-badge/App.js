import { StatusBar } from "expo-status-bar";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { lockAsync, OrientationLock } from "expo-screen-orientation";
import { useEffect, useState } from "react";

export default function App() {
  lockAsync(OrientationLock.LANDSCAPE_LEFT);

  const [randomColor, setRandomColor] = useState("#FFFFFF");

  useEffect(() => {
    setInterval(() => {
      setRandomColor(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
    }, 1000);
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
    textShadow: "3px 3px 8px black",
  },
  subtitleText: {
    fontSize: 30,
    textTransform: "uppercase",
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
    textAlign: "center",
    textShadow: "2px 2px 5px black",
  },
  badge: {
    width: "90%",
    height: "40%",
    backgroundColor: "white",
    borderRadius: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    boxShadow: "10px 10px 50px #000",
    borderRadius: "100000px",
  },
  badgeText: {
    fontSize: 60,
    textAlign: "center",
    fontWeight: "bold",
  },
  badgeImage: {
    width: "20%",
    aspectRatio: 1,
    borderRadius: "100%",
    border: "4px double black",
  },
});
