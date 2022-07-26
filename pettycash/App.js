import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { firebase } from "./firebase";
import { Home } from "./screens/Home";
import { SignUp } from "./screens/Signup";
import { Login } from "./screens/Login";

const auth = firebase.auth();

export default function App() {
  console.log(auth);
  const Stack = createStackNavigator();
  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1, width: "100%" }}>
        <NavigationContainer>
          <Stack.Navigator>
            {auth.currentUser ? (
              <Stack.Screen name="Home" component={Home} />
            ) : (
              <>
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen name="Login" component={Login} />
              </>
            )}
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
