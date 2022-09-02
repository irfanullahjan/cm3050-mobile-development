import { useTranslation } from "react-i18next";
import { ScrollView, View } from "react-native";
import { Cell, Section, TableView } from "react-native-tableview-simple";

import { themeTypes, useThemeContext } from "../../contexts/ThemeContext";
import { auth } from "../../firebase";

export function UserDetail() {
  const { t } = useTranslation("user");
  const { darkMode } = useThemeContext();
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <TableView appearance={darkMode ? themeTypes.DARK : themeTypes.LIGHT}>
          <Section header={t("userId")}>
            <Cell cellStyle="Basic" title={auth.currentUser.uid} />
          </Section>
          <Section header={t("email")}>
            <Cell cellStyle="Basic" title={auth.currentUser.email} />
          </Section>
          <Section header={t("createdAt")}>
            <Cell
              cellStyle="Basic"
              title={auth.currentUser.metadata.creationTime}
            />
          </Section>
          <Section header={t("lastLogin")}>
            <Cell
              cellStyle="Basic"
              title={auth.currentUser.metadata.lastSignInTime}
            />
          </Section>
        </TableView>
      </ScrollView>
    </View>
  );
}
