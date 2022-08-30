import { createStackNavigator } from "@react-navigation/stack";
import { SignUp } from "../screens/auth/Signup";
import { Login } from "../screens/auth/Login";
import { useAppContext } from "../contexts/AppContext";
import { LoadingScreen } from "../components/LoadingScreen";

export function AuthNav() {
  const Stack = createStackNavigator();
  const { user } = useAppContext();

  if (user === undefined) {
    // auth is not initialized yet
    return <LoadingScreen />;
  }

  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
}
