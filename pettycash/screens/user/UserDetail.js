import { ScrollView, View } from "react-native";
import { Cell, Section, TableView } from "react-native-tableview-simple";
import { useThemeContext } from "../../contexts/ThemeContext";
import { auth } from "../../firebase";

export function UserDetail() {
  const {darkMode} = useThemeContext();
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <TableView appearance={darkMode ? "dark" : "light"}>
          <Section>
            <Cell
              cellStyle="RightDetail"
              title="User ID"
              detail={auth.currentUser.uid}
            />
            <Cell
              cellStyle="RightDetail"
              title="Email"
              detail={auth.currentUser.email}
            />
            <Cell
              cellStyle="RightDetail"
              title="Created"
              detail={auth.currentUser.metadata.creationTime}
            />
            <Cell
              cellStyle="RightDetail"
              title="Last login"
              detail={auth.currentUser.metadata.lastSignInTime}
            />
          </Section>
        </TableView>
      </ScrollView>
    </View>
  );
}
