import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useAuthContext } from "../contexts/AuthContext";
import { UserStack } from "./UserStack";
import { WalletStack } from "./WalletStack";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AuthNav } from "./AuthNav";
import { SettingsStack } from "./SettingsStack";

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
        tabBarShowLabel: false,
        headerShown: false,
      })}
    >
      <Tab.Screen name="WalletTab" component={WalletStack} />
      <Tab.Screen name="UserTab" component={UserStack} />
      <Tab.Screen name="SettingsTab" component={SettingsStack} />
    </Tab.Navigator>
  );
}
