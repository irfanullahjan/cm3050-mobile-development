import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Home } from "./screens/Home";
import { SignUp } from "./screens/Signup";
import { Login } from "./screens/Login";
import { auth } from "./firebase";
import { Transaction } from "./screens/Transaction";

export default function App() {
  const Stack = createStackNavigator();

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1, width: "100%" }}>
        <NavigationContainer>
          <Stack.Navigator>
            {!auth.currentUser && (
              <>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="SignUp" component={SignUp} />
              </>
            )}
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Transaction" component={Transaction} />
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar style="auto" />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
