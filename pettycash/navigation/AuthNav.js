import { createStackNavigator } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";
import { Button } from "react-native";

import { LoadingScreen } from "../components/LoadingScreen";
import { useAuthContext } from "../contexts/AuthContext";
import { Login } from "../screens/auth/Login";
import { SignUp } from "../screens/auth/Signup";

export function AuthNav() {
  const { t } = useTranslation("navigation");
  const Stack = createStackNavigator();
  const { user } = useAuthContext();

  if (user === undefined) {
    // auth is not initialized yet
    return <LoadingScreen />;
  }

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={({ navigation }) => ({
          headerTitle: t("login"),
          headerRight: () => (
            <Button
              title={t("signup")}
              onPress={() => navigation.navigate("Signup")}
            />
          ),
        })}
      />
      <Stack.Screen
        name="Signup"
        component={SignUp}
        options={{
          headerTitle: t("signup"),
        }}
      />
    </Stack.Navigator>
  );
}
