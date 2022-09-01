import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTranslation } from "react-i18next";

import { useAuthContext } from "../contexts/AuthContext";
import { AuthNav } from "./AuthNav";
import { SettingsStack } from "./SettingsStack";
import { UserStack } from "./UserStack";
import { WalletStack } from "./WalletStack";

export function TabNavigation() {
  const { t } = useTranslation("navigation");
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
      })}>
      <Tab.Screen
        name="WalletTab"
        component={WalletStack}
        options={{
          tabBarLabel: t("wallet"),
        }}
      />
      <Tab.Screen
        name="UserTab"
        component={UserStack}
        options={{
          tabBarLabel: t("user"),
        }}
      />
      <Tab.Screen
        name="SettingsTab"
        component={SettingsStack}
        options={{
          tabBarLabel: t("settings"),
        }}
      />
    </Tab.Navigator>
  );
}
