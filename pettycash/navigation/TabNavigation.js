import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { Settings } from "../screens/Settings";
import { User } from "../screens/User";
import { WalletTab } from "../navigation/WalletTab";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AuthNav } from "./AuthNav";
import { Text } from "react-native";

export function TabNavigation() {
  const Tab = createBottomTabNavigator();

  const { user } = useContext(AppContext);

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
        tabBarLabel: ({ focused }) => {
          const label = route.name.replace(/Tab$/, "");
          const style = focused ? { color: "black" } : { color: "gray" };
          style.fontSize = 11;
          return <Text style={style}>{label}</Text>
        }
      })}
    >
      <Tab.Screen name="WalletTab" component={WalletTab} />
      <Tab.Screen name="UserTab" component={User} />
      <Tab.Screen name="SettingsTab" component={Settings} />
    </Tab.Navigator>
  );
}
