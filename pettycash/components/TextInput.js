import { useTheme } from "@react-navigation/native";
import { useField } from "formik";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput as TextInputReactNative,
  View,
} from "react-native";

export function TextInput({ name, placeholder, ...props }) {
  const [field, meta, helpers] = useField(name);
  const [focused, setFocused] = useState(false);
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: colors.text }]}>{placeholder}</Text>
      <TextInputReactNative
        style={[
          styles.input,
          {
            color: colors.text,
            borderColor: focused ? colors.primary : colors.border,
            ...(focused ? {backgroundColor: colors.card} : {}),
          },
        ]}
        {...props}
        onChangeText={helpers.setValue}
        onBlur={() => {
          helpers.setTouched(true);
          setFocused(false);
        }}
        onFocus={() => setFocused(true)}
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
    padding: 10,
    marginVertical: 5,
  },
});
