import { ScrollView, StyleSheet, Text, View } from "react-native";
import { TableView, Cell, Section } from "react-native-tableview-simple";

export default function Menu() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <TableView>
          <Section>
            <Cell>
              <Text>Item 1</Text>
            </Cell>
            <Cell>
              <Text>Item 2</Text>
            </Cell>
          </Section>
        </TableView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
