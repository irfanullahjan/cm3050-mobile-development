import RNLanguageDetector from "@os-team/i18next-react-native-language-detector";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { Platform } from "react-native";

import { resources } from "./locales";

export const languages = ["en", "fr", "es"];

if (Platform.OS !== "web") {
  i18n.use(RNLanguageDetector);
}

i18n.use(initReactI18next).init({
  resources,
  supportedLngs: languages,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
