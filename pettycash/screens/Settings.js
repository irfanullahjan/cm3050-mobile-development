import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { StyleSheet, View, Switch, useColorScheme } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Cell, Section, TableView } from "react-native-tableview-simple";
import { useThemeContext } from "../contexts/ThemeContext";

export function Settings() {
  const systemDarkMode = useColorScheme() === "dark" ? true : false;
  const { darkMode, setDarkMode } = useThemeContext();
  const [userDarkModeSwitch, setUserDarkModeSwitch] = useState(false);
  const [systemDarkModeSwitch, setSystemDarkModeSwitch] = useState(false);

  const toggleUserDarkModeSwitch = () => {
    setUserDarkModeSwitch((previous) => {
      const nextValue = !previous;
      AsyncStorage.setItem(
        "settings",
        JSON.stringify({
          userDarkModeSwitch: nextValue,
          systemDarkModeSwitch,
        })
      );
      return nextValue;
    });
  };

  const toggleSystemDarkModeSwitch = () => {
    setSystemDarkModeSwitch((previous) => {
      const nextValue = !previous;
      AsyncStorage.setItem(
        "settings",
        JSON.stringify({
          userDarkModeSwitch,
          systemDarkModeSwitch: nextValue,
        })
      );
      return nextValue;
    });
  };

  useEffect(() => {
    if (!systemDarkModeSwitch) {
      setDarkMode(userDarkModeSwitch);
    } else {
      setDarkMode(systemDarkMode);
    }
  }, [userDarkModeSwitch, systemDarkModeSwitch]);

  useEffect(() => {
    AsyncStorage.getItem("settings").then((value) => {
      const settings = JSON.parse(value);
      setSystemDarkModeSwitch(settings.systemDarkModeSwitch);
      setUserDarkModeSwitch(settings.userDarkModeSwitch);
    });
  }, []);

  return (
    <View style={[styles.container, darkMode && styles.containerDark]}>
      <ScrollView>
        <TableView appearance={darkMode ? "dark" : "light"}>
          <Section>
            <Cell
              cellStyle="Basic"
              title="Dark mode"
              cellAccessoryView={
                <Switch
                  value={userDarkModeSwitch}
                  onValueChange={toggleUserDarkModeSwitch}
                  disabled={systemDarkModeSwitch}
                />
              }
              isDisabled={systemDarkModeSwitch}
            />
            <Cell
              cellStyle="Basic"
              title="Use system theme"
              cellAccessoryView={
                <Switch
                  value={systemDarkModeSwitch}
                  onValueChange={toggleSystemDarkModeSwitch}
                />
              }
            />
          </Section>
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
