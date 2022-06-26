import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { createStackNavigator, } from "@react-navigation/stack";
import Restaurants from "./components/Restaurants";
import Menu from "./components/Menu";

export default function App() {
  // stack navigator is a container for the screens
  // each screen is a component

  const Stack = createStackNavigator();

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Restaurants">
            <Stack.Screen name="Restaurants" component={Restaurants} />
            <Stack.Screen name="Menu" component={Menu} />
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
