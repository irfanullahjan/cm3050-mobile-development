import { useContext } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { Cell, Section, TableView } from "react-native-tableview-simple";
import { AppContext } from "../../contexts/AppContext";
import { auth } from "../../firebase";

export function User({ navigation }) {
  const { setUser } = useContext(AppContext);

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
    auth
      .signOut()
      .then(() => {
        setUser(null);
        console.log("Logged out");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <Text style={{margin: 15}}>Currently logged in as {auth.currentUser.email}</Text>
        <TableView>
          <Section>
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
