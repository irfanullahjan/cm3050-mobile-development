import { useContext } from "react";
import { Button, ScrollView, Text, View } from "react-native";
import { Cell, Section, TableView } from "react-native-tableview-simple";
import { AppContext } from "../contexts/AppContext";
import { firestore } from "../firebase";

export function Home({ navigation }) {
  const { user, userTransactions } = useContext(AppContext);

  if (!user) {
    return (
      <View>
        <Text>No user logged in</Text>
      </View>
    );
  }

  const deleteTransaction = (id) => {
    firestore
      .collection("users")
      .doc(user.uid)
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
      <Button
        title="Add Transaction"
        onPress={() => navigation.navigate("Transaction")}
      />
      <ScrollView>
        <TableView>
          <Section>
            {userTransactions.map((transaction) => (
              <Cell
                key={transaction.id}
                cellStyle="Basic"
                cellContentView={
                  <View
                    style={{
                      flexDirection: "row",
                      width: "100%",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text>{transaction.description}</Text>
                    <Text>{transaction.amount}</Text>
                    <Button
                      title="Delete"
                      onPress={() => deleteTransaction(transaction.id)}
                    />
                  </View>
                }
              />
            ))}
          </Section>
        </TableView>
      </ScrollView>
    </View>
  );
}
