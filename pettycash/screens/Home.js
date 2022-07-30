import { useContext } from "react";
import { Button, Text, View } from "react-native";
import { AppContext } from "../App";
import { auth, firestore } from "../firebase";

export function Home({ navigation }) {
  const { userTransactions } = useContext(AppContext);

  if (!auth.currentUser) {
    return (
      <View>
        <Text>No user logged in</Text>
      </View>
    );
  }

  const deleteTransaction = (id) => {
    firestore
      .collection("users")
      .doc(auth.currentUser.uid)
      .collection("transactions")
      .doc(id)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>My Wallets</Text>
      {userTransactions.map((transaction) => (
        <>
          <Text key={transaction.id}>{transaction.description}</Text>
          <Button
            onPress={() => deleteTransaction(transaction.id)}
            title="Delete"
          />
        </>
      ))}
      <Button
        title="Add Transaction"
        onPress={() => navigation.navigate("Transaction")}
      />
    </View>
  );
}
