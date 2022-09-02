import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useColorScheme } from "react-native";

const ThemeContext = createContext({});

export const useThemeContext = () => useContext(ThemeContext);

export const themes = ["system", "light", "dark"];

export const themeTypes = {
  SYSTEM: themes[0],
  LIGHT: themes[1],
  DARK: themes[2],
};

const THEME_STORAGE_KEY = "theme";

export function ThemeContextProvider({ children }) {
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem(THEME_STORAGE_KEY)
      .then((theme) => {
        if (theme) {
          setTheme(theme);
        } else {
          setTheme(themeTypes.SYSTEM);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const isSystemDark = useColorScheme() === themeTypes.DARK;

  const value = useMemo(
    () => ({
      darkMode:
        theme === themeTypes.SYSTEM ? isSystemDark : theme === themeTypes.DARK,
      theme,
      setTheme: (theme) => {
        AsyncStorage.setItem(THEME_STORAGE_KEY, theme)
          .then(() => {
            setTheme(theme);
          })
          .catch((error) => {
            console.log(error);
          });
      },
    }),
    [theme, isSystemDark]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
