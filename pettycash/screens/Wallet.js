import { useContext } from "react";
import {
  ActivityIndicator,
  Button,
  ScrollView,
  Text,
  View,
} from "react-native";
import { Cell, Section, TableView } from "react-native-tableview-simple";
import { AppContext } from "../contexts/AppContext";
import { auth } from "../firebase";

export function Wallet({ navigation }) {
  const { userTransactions } = useContext(AppContext);

  if (!auth.currentUser) {
    return (
      <View>
        <Text>No user logged in</Text>
      </View>
    );
  }

  if (!userTransactions) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
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
                      title="View"
                      onPress={() =>
                        navigation.navigate("Transaction", {
                          transactionId: transaction.id,
                        })
                      }
                    />
                  </View>
                }
              />
            ))}
          </Section>
        </TableView>
        <Button
          title="Add Transaction"
          onPress={() => navigation.navigate("Transaction", {})}
        />
      </ScrollView>
    </View>
  );
}
