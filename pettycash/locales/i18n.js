import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { resources } from "./locales";

export const languages = ["en", "fr", "es"];

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  supportedLngs: languages,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
