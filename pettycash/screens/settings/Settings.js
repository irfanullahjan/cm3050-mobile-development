import { ScrollView, StyleSheet, View } from "react-native";
import { TableView } from "react-native-tableview-simple";

import { useThemeContext } from "../../contexts/ThemeContext";
import { LanguageSettingsSection } from "./components/LanguageSettingsSection";
import { ThemeSettingsSection } from "./components/ThemeSettingsSection";

export function Settings() {
  const { darkMode } = useThemeContext();
  return (
    <View style={[styles.container, darkMode && styles.containerDark]}>
      <ScrollView>
        <TableView appearance={darkMode ? "dark" : "light"}>
          <ThemeSettingsSection />
          <LanguageSettingsSection />
        </TableView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerDark: {
    backgroundColor: "black",
  },
});
