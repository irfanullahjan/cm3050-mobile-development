import { useEffect } from "react";
import { Button, Text, View } from "react-native";
import { auth, firestore } from "../firebase";

export function Home() {
  useEffect(() => {
    const books = firestore
      .collection("books")
      .where("uid", "==", auth.currentUser.uid)
      .get();
    console.log(books);
  }, []);

  if (!auth.currentUser) {
    return (
      <View>
        <Text>No user logged in</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>My Wallets</Text>
      <Text>Work</Text>
    </View>
  );
}
