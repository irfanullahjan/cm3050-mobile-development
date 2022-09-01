import { createStackNavigator } from "@react-navigation/stack";
import { Button } from "react-native";

import { LoadingScreen } from "../components/LoadingScreen";
import { useAuthContext } from "../contexts/AuthContext";
import { Login } from "../screens/auth/Login";
import { SignUp } from "../screens/auth/Signup";

export function AuthNav() {
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
          headerRight: () => (
            <Button
              title="Signup"
              onPress={() => navigation.navigate("Signup")}
            />
          ),
        })}
      />
      <Stack.Screen name="Signup" component={SignUp} />
    </Stack.Navigator>
  );
}
