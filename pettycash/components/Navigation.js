import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Home } from "../screens/Home";
import { SignUp } from "../screens/Signup";
import { Login } from "../screens/Login";
import { Transaction } from "../screens/Transaction";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

export function Navigation() {
  const Stack = createStackNavigator();
  const { user } = useContext(AppContext);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Transaction" component={Transaction} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
