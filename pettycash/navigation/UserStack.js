import { createStackNavigator } from "@react-navigation/stack";
import { User } from "../screens/user/User";
import { UserDetail } from "../screens/user/UserDetail";

export function UserStack() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="User" component={User} />
      <Stack.Screen name="User Detail" component={UserDetail} />
    </Stack.Navigator>
  );
}
