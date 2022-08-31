import { createStackNavigator } from "@react-navigation/stack";
import { SignUp } from "../screens/auth/Signup";
import { Login } from "../screens/auth/Login";
import { useAuthContext } from "../contexts/AuthContext";
import { LoadingScreen } from "../components/LoadingScreen";
import { Button } from "react-native";

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
