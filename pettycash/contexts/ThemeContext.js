import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useColorScheme } from "react-native";

const ThemeContext = createContext({});

export const useThemeContext = () => useContext(ThemeContext);

export const themes = ["system", "light", "dark"];

export function ThemeContextProvider({ children }) {
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem("theme")
      .then((theme) => {
        if (theme) {
          setTheme(theme);
        } else {
          setTheme("system");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const isSystemDarkMode = useColorScheme() === "dark";

  const darkMode = useMemo(() => {
    if (theme === "system") {
      return isSystemDarkMode;
    } else {
      return theme === "dark";
    }
  }, [theme]);

  const value = useMemo(
    () => ({
      darkMode,
      theme,
      setTheme: (theme) => {
        AsyncStorage.setItem("theme", theme)
          .then(() => {
            setTheme(theme);
          })
          .catch((error) => {
            console.log(error);
          });
      },
    }),
    [theme, darkMode]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
