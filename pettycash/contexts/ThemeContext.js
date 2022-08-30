import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ThemeContext = createContext({});

export const useThemeContext = () => useContext(ThemeContext);

export function ThemeContextProvider({ children }) {
  const [darkMode, setDarkMode] = useState();

  // load user theme from local storage AsyncStorage
  useEffect(() => {
    AsyncStorage.getItem("darkMode")
      .then((darkMode) => {
        if (darkMode != null) {
          setDarkMode(JSON.parse(darkMode));
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const value = useMemo(
    () => ({
      darkMode,
      setDarkMode: (darkMode) => {
        setDarkMode(darkMode);
        AsyncStorage.setItem("darkMode", JSON.stringify(darkMode));
      },
    }),
    [darkMode]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
