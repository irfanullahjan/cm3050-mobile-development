import { useTranslation } from "react-i18next";
import { Cell, Section } from "react-native-tableview-simple";

import { themes, useThemeContext } from "../../../contexts/ThemeContext";

export function ThemeSettingsSection() {
  const { t } = useTranslation("settings");

  const { theme, setTheme } = useThemeContext();

  return (
    <Section header={t("settings:theme")}>
      {themes.map((value) => (
        <Cell
          cellStyle="Basic"
          key={value}
          title={t(`settings:themes.${value}`)}
          accessory={value === theme ? "Checkmark" : null}
          onPress={() => setTheme(value)}
        />
      ))}
    </Section>
  );
}
