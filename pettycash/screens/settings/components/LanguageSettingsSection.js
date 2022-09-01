import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Cell, Section } from "react-native-tableview-simple";

import i18n, { languages } from "../../../locales/i18n";

export function LanguageSettingsSection() {
  const { t } = useTranslation(["settings", "translation"]);
  const [selectedLanguage, setSelectedLanguage] = useState();

  useEffect(() => {
    AsyncStorage.getItem("language")
      .then((value) => {
        setSelectedLanguage(value);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const toggleLanguage = (language) => {
    setSelectedLanguage(language);
    AsyncStorage.setItem("language", language);
    i18n.changeLanguage(language);
  };

  return (
    <Section header={t("settings:language")}>
      {languages.map((language) => (
        <Cell
          key={language}
          title={t(`translation:languages.${language}`)}
          onPress={() => toggleLanguage(language)}
          accessory={selectedLanguage === language ? "Checkmark" : null}
        />
      ))}
    </Section>
  );
}
