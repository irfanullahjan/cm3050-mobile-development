import { useTranslation } from "react-i18next";
import { Image } from "react-native";
import { Cell, Section } from "react-native-tableview-simple";

import {
  themes,
  themeTypes,
  useThemeContext,
} from "../../../contexts/ThemeContext";

export function ThemeSettingsSection() {
  const { t } = useTranslation("settings");

  const { theme, setTheme } = useThemeContext();

  // Theme icons credites: https://iconscout.com

  return (
    <Section header={t("settings:theme")}>
      {themes.map((value) => (
        <Cell
          cellStyle="Basic"
          key={value}
          title={t(`settings:themes.${value}`)}
          accessory={value === theme ? "Checkmark" : null}
          onPress={() => setTheme(value)}
          image={
            <Image
              source={
                value === themeTypes.DARK
                  ? require(`../../../assets/settings/theme-dark.png`)
                  : value === themeTypes.LIGHT
                  ? require(`../../../assets/settings/theme-light.png`)
                  : require(`../../../assets/settings/theme-system.png`)
              }
            />
          }
        />
      ))}
    </Section>
  );
}
