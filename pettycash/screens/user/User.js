import AsyncStorage from "@react-native-async-storage/async-storage";
import { signOut } from "firebase/auth";
import { useTranslation } from "react-i18next";
import { ScrollView, View } from "react-native";
import { Cell, Section, TableView } from "react-native-tableview-simple";

import { useThemeContext } from "../../contexts/ThemeContext";
import { auth } from "../../firebase";
import { alert } from "../../utils/alert";
import { confirm } from "../../utils/confirm";

export function User({ navigation }) {
  const { t } = useTranslation("user");
  const { darkMode } = useThemeContext();
  const confirmLogout = () => {
    confirm(
      t("logout"),
      t("confirmLogoutMessage"),
      [
        {
          text: t("translation:cancel"),
          style: "cancel",
        },
        {
          text: t("logout"),
          style: "destructive",
          onPress: logout,
        },
      ],
      { cancelable: false }
    );
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        AsyncStorage.clear().catch((error) => {
          console.error(error);
        });
      })
      .catch((error) => {
        alert(t("failedToLogout"));
        console.error(error);
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <TableView appearance={darkMode ? "dark" : "light"}>
          <Section
            header={`${t("currentlyLoggedInAs")} ${auth.currentUser.email}`}>
            <Cell
              cellStyle="Basic"
              title={t("logout")}
              onPress={() => confirmLogout()}
            />
            <Cell
              cellStyle="Basic"
              title={t("userDetail")}
              onPress={() => navigation.navigate("User Detail", {})}
            />
          </Section>
        </TableView>
      </ScrollView>
    </View>
  );
}
