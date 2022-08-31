import { createStackNavigator } from "@react-navigation/stack";
import { Settings } from "../screens/settings/Settings";
import { UserDetail } from "../screens/user/UserDetail";

export function SettingsStack() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
}
