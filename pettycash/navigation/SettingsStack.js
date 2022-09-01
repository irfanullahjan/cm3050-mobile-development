import { createStackNavigator } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";

import { Settings } from "../screens/settings/Settings";

export function SettingsStack() {
  const { t } = useTranslation("navigation");
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{
          title: t("navigation:settings"),
        }}
      />
    </Stack.Navigator>
  );
}
