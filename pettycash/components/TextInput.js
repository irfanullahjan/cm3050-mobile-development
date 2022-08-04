import { useField } from "formik";
import { Text, TextInput, View } from "react-native";

export function TextInputFormik({ name, ...props }) {
  const [field, meta, helpers] = useField({ name });
  return (
    <View style={{  margin: 10, padding: 10, borderWidth: 1, borderColor: "black" }}>
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
