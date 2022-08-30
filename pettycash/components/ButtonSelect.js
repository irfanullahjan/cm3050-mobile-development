import { useField } from "formik";
import { Pressable, StyleSheet, Text, View } from "react-native";

export function ButtonSelect({ name, label, options }) {
  const [field, meta, helpers] = useField(name);

  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.container}>
        <View style={styles.buttons}>
          {options.map((option) => (
            <Pressable
              key={option.value}
              onPress={() => helpers.setValue(option.value)}
            >
              <View
                style={[
                  field.value === option.value ? styles.buttonSelected : {},
                  styles.button,
                ]}
              >
                <Text>{option.label}</Text>
              </View>
            </Pressable>
          ))}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
  },
  container: {
    flexDirection: "row",
    marginBottom: 15,
  },
  buttons: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "gray",
    marginVertical: 5,
  },
  button: {
    padding: 10,
  },
  buttonSelected: {
    backgroundColor: "lightgray",
  },
});
