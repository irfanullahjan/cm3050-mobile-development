import { useContext } from "react";
import { Button, ScrollView, Text, View } from "react-native";
import { Cell, Section, TableView } from "react-native-tableview-simple";
import { LoadingScreen } from "../../components/LoadingScreen";
import { AppContext } from "../../contexts/AppContext";
import { auth } from "../../firebase";

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
    return <LoadingScreen />;
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <TableView>
          <Section>
            {userTransactions.map((transaction) => (
              <Cell
                key={transaction.id}
                cellStyle="RightDetail"
                title={transaction.description}
                detail={(+transaction.amount).toLocaleString()}
                onPress={() =>
                  navigation.navigate("Transaction", {
                    transactionId: transaction.id,
                  })
                }
              />
            ))}
          </Section>
          <Section>
            <Cell
              cellStyle="RightDetail"
              title="Balance"
              detail={(+userTransactions.reduce((acc, curr) => curr.type === "INCOME" ? acc + curr.amount : acc - curr.amount, 0)).toLocaleString()}
            />
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
