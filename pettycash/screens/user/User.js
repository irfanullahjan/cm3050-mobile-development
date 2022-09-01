import { signOut } from "firebase/auth";
import { ScrollView, View } from "react-native";
import { Cell, Section, TableView } from "react-native-tableview-simple";

import { useThemeContext } from "../../contexts/ThemeContext";
import { auth } from "../../firebase";
import { alert } from "../../utils/alert";
import { confirm } from "../../utils/confirm";

export function User({ navigation }) {
  const { darkMode } = useThemeContext();
  const confirmLogout = () => {
    confirm(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: logout,
        },
      ],
      { cancelable: false }
    );
  };

  const logout = () => {
    signOut(auth).catch((error) => {
      alert("Failed to logout");
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
