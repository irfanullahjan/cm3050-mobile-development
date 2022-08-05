import { useContext } from "react";
import { Alert, Button, View } from "react-native";
import { AppContext } from "../contexts/AppContext";
import { auth } from "../firebase";

export function User() {
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
    <View>
      <Button title="Logout" onPress={confirmLogout} />
    </View>
  );
}
