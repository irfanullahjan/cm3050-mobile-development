import RNLanguageDetector from "@os-team/i18next-react-native-language-detector";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { resources } from "./locales";

export const languages = ["en", "fr", "es"];

i18n
  .use(initReactI18next)
  .use(RNLanguageDetector)
  .init({
    resources,
    supportedLngs: languages,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
