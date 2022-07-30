import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Home } from "./screens/Home";
import { SignUp } from "./screens/Signup";
import { Login } from "./screens/Login";
import { auth, firestore } from "./firebase";
import { Transaction } from "./screens/Transaction";
import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export default function App() {
  const Stack = createStackNavigator();

  const [user, setUser] = useState(null);
  const [userTransactions, setUserTransactions] = useState([]);

  useEffect(() => {
    if (user) {
      firestore
        .collection("users")
        .doc(user.uid)
        .collection("transactions")
        .onSnapshot((snapshot) => {
          const transactions = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setUserTransactions(transactions);
        });
    }
  }, [user]);

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1, width: "100%" }}>
        <AppContext.Provider value={{ user, setUser, userTransactions }}>
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
        </AppContext.Provider>
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
