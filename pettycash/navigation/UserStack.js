import { createStackNavigator } from "@react-navigation/stack";
import { User } from "../screens/user/User";

export function UserStack() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="User" component={User} />
    </Stack.Navigator>
  );
}
