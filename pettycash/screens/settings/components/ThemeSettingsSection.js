import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Switch, useColorScheme } from "react-native";
import { Cell, Section } from "react-native-tableview-simple";

import { useThemeContext } from "../../../contexts/ThemeContext";

export function ThemeSettingsSection() {
  const { t } = useTranslation("settings");
  const { setDarkMode } = useThemeContext();
  const [userDarkModeSwitch, setUserDarkModeSwitch] = useState();
  const [systemDarkModeSwitch, setSystemDarkModeSwitch] = useState(true);
  const systemDarkMode = useColorScheme() === "dark";

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
    if (systemDarkModeSwitch != null && userDarkModeSwitch != null) {
      if (!systemDarkModeSwitch) {
        setDarkMode(userDarkModeSwitch);
      } else {
        setDarkMode(systemDarkMode);
      }
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
    <Section header={t("settings:theme")}>
      <Cell
        cellStyle="Basic"
        title={t("settings:darkModeSwitch")}
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
        title={t("settings:systemThemeSwitch")}
        cellAccessoryView={
          <Switch
            value={systemDarkModeSwitch}
            onValueChange={toggleSystemDarkModeSwitch}
          />
        }
      />
    </Section>
  );
}
