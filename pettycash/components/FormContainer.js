import { StyleSheet, View } from "react-native";

export function FormContainer({ children }) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
});
