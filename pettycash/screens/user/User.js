import { useTheme } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import { Alert, ScrollView, Text, View } from "react-native";
import { Cell, Section, TableView } from "react-native-tableview-simple";
import { useThemeContext } from "../../contexts/ThemeContext";
import { auth } from "../../firebase";

export function User({ navigation }) {
  const { darkMode } = useThemeContext();
  const { colors } = useTheme();
  const confirmLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          onPress: () => logout(),
        },
      ],
      { cancelable: false }
    );
  };

  const logout = () => {
    signOut(auth).catch((error) => {
      console.error(error);
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <TableView appearance={darkMode ? "dark" : "light"}>
          <Section header={`Currently logged in as ${auth.currentUser.email}`}>
            <Cell
              cellStyle="Basic"
              title="Logout"
              onPress={() => confirmLogout()}
            />
            <Cell
              cellStyle="Basic"
              title="User Detail"
              onPress={() => navigation.navigate("User Detail", {})}
            />
          </Section>
        </TableView>
      </ScrollView>
    </View>
  );
}
