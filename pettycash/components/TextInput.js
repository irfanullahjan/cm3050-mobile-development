import { useTheme } from "@react-navigation/native";
import { useField } from "formik";
import { StyleSheet, Text, TextInput as TextInputReactNative, View } from "react-native";

export function TextInput({ name, placeholder, ...props }) {
  const [field, meta, helpers] = useField({ name });
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <Text style={[styles.label, {color: colors.text}]}>{placeholder}</Text>
      <TextInputReactNative
        style={[styles.input, {color: colors.text}]}
        {...props}
        onChangeText={helpers.setValue}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
      />
      {meta.touched && meta.error ? (
        <Text style={{ color: colors.notification }}>{meta.error}</Text>
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
