import { useField } from "formik";
import { StyleSheet, Text, TextInput as TextInputReactNative, View } from "react-native";

export function TextInput({ name, placeholder, ...props }) {
  const [field, meta, helpers] = useField({ name });
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{placeholder}</Text>
      <TextInputReactNative
        style={styles.input}
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
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginVertical: 5,
  },
});
