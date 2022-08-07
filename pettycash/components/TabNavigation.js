import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { Settings } from "../screens/Settings";
import { User } from "../screens/User";
import { Wallet } from "./Wallet";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AuthNav } from "./AuthNav";

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

          if (route.name === "Wallet") {
            iconName = focused ? "wallet" : "wallet-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
          } else if (route.name === "User") {
            iconName = focused ? "at-circle" : "at-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerShown: false,
      })}
      // tabBarOptions={{
      //   activeTintColor: "#673ab7",
      //   inactiveTintColor: "#222",
      // }}
    >
      <Tab.Screen name="Wallet" component={Wallet} />
      <Tab.Screen name="User" component={User} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}
