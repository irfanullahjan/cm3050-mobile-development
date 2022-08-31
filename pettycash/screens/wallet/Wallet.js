import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Button, ScrollView, Text, View } from "react-native";
import { Cell, Section, TableView } from "react-native-tableview-simple";
import { LoadingScreen } from "../../components/LoadingScreen";
import { useAuthContext } from "../../contexts/AuthContext";
import { useThemeContext } from "../../contexts/ThemeContext";
import { auth, firestore } from "../../firebase";

export function Wallet({ navigation }) {
  const { user } = useAuthContext();
  const { darkMode } = useThemeContext();
  const [userTransactions, setUserTransactions] = useState(null);

  useEffect(() => {
    if (user) {
      return onSnapshot(
        query(
          collection(firestore, "users", user.uid, "transactions"),
          orderBy("createdAt", "asc")
        ),
        (snapshot) => {
          const transactions = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setUserTransactions(transactions);
        }
      );
    }
  }, [user]);

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

  const total = userTransactions.reduce((total, curr) => {
    return total + (curr.type === "INCOME" ? +curr.amount : -curr.amount);
  }, 0);

  const header = `You have ${userTransactions.length} transactions in the wallet`;

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <TableView appearance={darkMode ? "dark" : "light"}>
          <Section header={header}>
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
                accessory="DisclosureIndicator"
              />
            ))}
          </Section>
          <Section>
            <Cell
              cellStyle="RightDetail"
              title="Balance"
              detail={total.toLocaleString()}
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
