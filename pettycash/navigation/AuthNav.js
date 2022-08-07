import { createStackNavigator } from "@react-navigation/stack";
import { SignUp } from "../screens/auth/Signup";
import { Login } from "../screens/auth/Login";

export function AuthNav() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
}
