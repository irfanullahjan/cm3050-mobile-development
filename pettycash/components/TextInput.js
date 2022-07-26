import { useField } from "formik";
import { Text, TextInput, View } from "react-native";

export function TextInputFormik({ name, ...props }) {
  const [field, meta, helpers] = useField({ name });
  return (
    <View style={{ margin: 10 }}>
      <TextInput
        {...field}
        {...props}
        onChangeText={helpers.setValue}
        onBlur={helpers.setTouched}
      />
      {meta.touched && meta.error ? (
        <Text style={{ color: "red" }}>{meta.error}</Text>
      ) : (
        <Text style={{ visibility: "hidden" }}></Text>
      )}
    </View>
  );
}
