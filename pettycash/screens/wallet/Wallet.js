import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, ScrollView, View } from "react-native";
import { Cell, Section, TableView } from "react-native-tableview-simple";

import { LoadingScreen } from "../../components/LoadingScreen";
import { useAuthContext } from "../../contexts/AuthContext";
import { themeTypes, useThemeContext } from "../../contexts/ThemeContext";
import { firestore } from "../../firebase";

export function Wallet({ navigation }) {
  const { t } = useTranslation("wallet");
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

  if (!userTransactions) {
    return <LoadingScreen />;
  }

  const total = userTransactions.reduce((total, curr) => {
    return total + (curr.type === "INCOME" ? +curr.amount : -curr.amount);
  }, 0);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <TableView appearance={darkMode ? themeTypes.DARK : themeTypes.LIGHT}>
          <Section
            header={t("youHaveXTransactions", {
              count: userTransactions.length,
            })}>
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
          title={t("addTransaction")}
          onPress={() => navigation.navigate("Transaction", {})}
        />
      </ScrollView>
    </View>
  );
}
