import { createStackNavigator } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";

import { Transaction } from "../screens/wallet/Transaction";
import { Wallet } from "../screens/wallet/Wallet";

export function WalletStack() {
  const { t } = useTranslation("navigation");
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Wallet"
        component={Wallet}
        options={{
          headerTitle: t("wallet"),
        }}
      />
      <Stack.Screen
        name="Transaction"
        component={Transaction}
        options={{
          headerTitle: t("transaction"),
        }}
      />
    </Stack.Navigator>
  );
}
