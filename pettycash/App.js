import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { AppContextProvider } from "./contexts/AppContext";
import { Navigation } from "./components/Navigation";

export default function App() {
  return (
    <AppContextProvider>
      <View style={styles.container}>
        <SafeAreaView style={{ flex: 1, width: "100%" }}>
          <Navigation />
          <StatusBar style="auto" />
        </SafeAreaView>
      </View>
    </AppContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
