import { useField } from "formik";
import { StyleSheet, Text, TextInput, View } from "react-native";

export function TextInputFormik({ name, ...props }) {
  const [field, meta, helpers] = useField({ name });
  return (
    <View style={styles.container}>
      <TextInput
        style={{ fontSize: 20 }}
        {...props}
        onChangeText={helpers.setValue}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
      />
      {meta.touched && meta.error ? (
        <Text style={{ color: "red" }}>{meta.error}</Text>
      ) : (
        <Text> </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
  },
});
