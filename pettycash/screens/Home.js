import { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import { auth, firestore } from "../firebase";

export function Home({ navigation }) {
  const [userCollection, setUserCollection] = useState(null);
  const [userTransactions, setUserTransactions] = useState([]);

  useEffect(() => {
    firestore
      .collection("users")
      .doc(auth.currentUser.uid)
      .get()
      .then((doc) => {
        setUserCollection(doc.data());
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    firestore
      .collection("users")
      .doc(auth.currentUser.uid)
      .collection("transactions")
      .get()
      .then((snapshot) => {
        setUserTransactions(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      })
      .catch((error) => console.error(error));
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
      {userTransactions.map((transaction) => (
        <Text key={transaction.id}>{transaction.description}</Text>
      ))}
      <Button
        title="Add Transaction"
        onPress={() => navigation.navigate("Transaction")}
      />
    </View>
  );
}
