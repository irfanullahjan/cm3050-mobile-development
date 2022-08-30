import { AuthContextProvider } from "./contexts/AuthContext";
import { ThemeContextProvider } from "./contexts/ThemeContext";
import { MainView } from "./navigation/MainView";
import "./firebase";

export default function App() {
  return (
    <ThemeContextProvider>
      <AuthContextProvider>
        <MainView />
      </AuthContextProvider>
    </ThemeContextProvider>
  );
}

