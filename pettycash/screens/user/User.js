import AsyncStorage from "@react-native-async-storage/async-storage";
import { deleteUser, signOut } from "firebase/auth";
import { deleteDoc, doc } from "firebase/firestore";
import { useTranslation } from "react-i18next";
import { Image, ScrollView, View } from "react-native";
import { Cell, Section, TableView } from "react-native-tableview-simple";

import { themeTypes, useThemeContext } from "../../contexts/ThemeContext";
import { auth, firestore } from "../../firebase";
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

  const confirmDeleteAccountAndData = () => {
    confirm(
      t("confirmDeleteAccount.title"),
      t("confirmDeleteAccount.message"),
      [
        {
          text: t("translation:cancel"),
          style: "cancel",
        },
        {
          text: t("confirmDeleteAccount.confirm"),
          style: "destructive",
          onPress: deleteAccountAndData,
        },
      ],
      { cancelable: false }
    );
  };

  const deleteAccountAndData = () =>
    deleteDoc(doc(firestore, "users", auth.currentUser.uid))
      .then(() => {
        deleteUser(auth.currentUser)
          .then(() => {
            AsyncStorage.clear().catch((error) => console.error(error));
            alert(t("accountDeleted"));
          })
          .catch((error) => {
            alert(t("accountDeleteFailed"));
            console.error(error);
          });
      })
      .catch((error) => {
        alert(t("accountDataDeleteFailed"));
        console.error(error);
      });

  // Icons from https://iconscout.com

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <TableView appearance={darkMode ? themeTypes.DARK : themeTypes.LIGHT}>
          <Section
            header={`${t("currentlyLoggedInAs")} ${auth.currentUser.email}`}>
            <Cell
              cellStyle="Basic"
              title={t("userDetail")}
              onPress={() => navigation.navigate("User Detail", {})}
              image={<Image source={require("../../assets/user/info.png")} />}
            />
            <Cell
              cellStyle="Basic"
              title={t("deleteAccount")}
              onPress={() => confirmDeleteAccountAndData()}
              image={<Image source={require("../../assets/user/remove.png")} />}
            />
            <Cell
              cellStyle="Basic"
              title={t("logout")}
              onPress={() => confirmLogout()}
              image={
                <Image source={require("../../assets/user/signout.png")} />
              }
            />
          </Section>
        </TableView>
      </ScrollView>
    </View>
  );
}
