import AsyncStorage from "@react-native-async-storage/async-storage";
import i18next from "i18next";
import { useEffect } from "react";

import { AuthContextProvider } from "./contexts/AuthContext";
import { ThemeContextProvider } from "./contexts/ThemeContext";
import { MainView } from "./navigation/MainView";

import "./firebase";
import "./locales/i18n";

export default function App() {
  useEffect(() => {
    AsyncStorage.getItem("language")
      .then((value) => value && i18next.changeLanguage(value))
      .catch((error) => console.log(error));
  }, []);

  return (
    <ThemeContextProvider>
      <AuthContextProvider>
        <MainView />
      </AuthContextProvider>
    </ThemeContextProvider>
  );
}
