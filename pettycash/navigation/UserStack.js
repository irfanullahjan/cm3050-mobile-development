import { createStackNavigator } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";

import { User } from "../screens/user/User";
import { UserDetail } from "../screens/user/UserDetail";

export function UserStack() {
  const { t } = useTranslation("navigation");
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="User"
        component={User}
        options={{
          headerTitle: t("user"),
        }}
      />
      <Stack.Screen
        name="User Detail"
        component={UserDetail}
        options={{
          headerTitle: t("userDetail"),
        }}
      />
    </Stack.Navigator>
  );
}
