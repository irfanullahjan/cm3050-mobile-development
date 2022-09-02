import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, View } from "react-native";

import { themeTypes, useThemeContext } from "../contexts/ThemeContext";
import { TabNavigation } from "./TabNavigation";

export function MainView() {
  const { darkMode } = useThemeContext();

  return (
    <View style={styles.container}>
      <SafeAreaView
        style={[
          styles.safeArea,
          darkMode && { backgroundColor: DarkTheme.colors.card },
        ]}>
        <NavigationContainer theme={darkMode ? DarkTheme : DefaultTheme}>
          <TabNavigation />
        </NavigationContainer>
      </SafeAreaView>
      <StatusBar style={darkMode ? themeTypes.LIGHT : themeTypes.DARK} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  safeArea: {
    flex: 1,
    width: "100%",
  },
});
