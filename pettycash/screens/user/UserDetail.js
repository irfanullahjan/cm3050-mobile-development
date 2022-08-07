import { ScrollView, View } from "react-native";
import { Cell, Section, TableView } from "react-native-tableview-simple";
import { auth } from "../../firebase";

export function UserDetail() {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <TableView>
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
