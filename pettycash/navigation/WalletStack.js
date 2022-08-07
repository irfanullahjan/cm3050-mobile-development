import { createStackNavigator } from "@react-navigation/stack";
import { Wallet } from "../screens/wallet/Wallet";
import { Transaction } from "../screens/wallet/Transaction";

export function WalletStack() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Wallet" component={Wallet} />
      <Stack.Screen name="Transaction" component={Transaction} />
    </Stack.Navigator>
  );
}
