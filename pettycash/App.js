import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { AuthContextProvider } from "./contexts/AuthContext";
import { NavigationContainer } from "@react-navigation/native";
import { TabNavigation } from "./navigation/TabNavigation";
import "./firebase";
import { ThemeContextProvider } from "./contexts/ThemeContext";

export default function App() {
  return (
    <ThemeContextProvider>
      <AuthContextProvider>
        <View style={styles.container}>
          <SafeAreaView style={{ flex: 1, width: "100%" }}>
            <NavigationContainer>
              <TabNavigation />
            </NavigationContainer>
            <StatusBar style="auto" />
          </SafeAreaView>
        </View>
      </AuthContextProvider>
    </ThemeContextProvider>
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
