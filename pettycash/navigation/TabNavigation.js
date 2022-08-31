import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useAuthContext } from "../contexts/AuthContext";
import { Settings } from "../screens/settings/Settings";
import { UserStack } from "./UserStack";
import { WalletStack } from "./WalletStack";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AuthNav } from "./AuthNav";
import { Text } from "react-native";

export function TabNavigation() {
  const Tab = createBottomTabNavigator();

  const { user } = useAuthContext();

  if (!user) {
    return <AuthNav />;
  }

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "WalletTab") {
            iconName = focused ? "wallet" : "wallet-outline";
          } else if (route.name === "SettingsTab") {
            iconName = focused ? "settings" : "settings-outline";
          } else if (route.name === "UserTab") {
            iconName = focused ? "at-circle" : "at-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerShown: false,
        tabBarLabel: ({ color }) => (
          <Text style={{ fontSize: 11, color }}>
            {route.name.replace(/Tab$/, "")}
          </Text>
        ),
      })}
    >
      <Tab.Screen name="WalletTab" component={WalletStack} />
      <Tab.Screen name="UserTab" component={UserStack} />
      <Tab.Screen name="SettingsTab" component={Settings} />
    </Tab.Navigator>
  );
}
