import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { TableView } from "react-native-tableview-simple";
import { useThemeContext } from "../../contexts/ThemeContext";
import { ThemeSettingsSection } from "./components/ThemeSettingsSection";

export function Settings() {
  const { darkMode } = useThemeContext();
  return (
    <View style={[styles.container, darkMode && styles.containerDark]}>
      <ScrollView>
        <TableView appearance={darkMode ? "dark" : "light"}>
          <ThemeSettingsSection />
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
