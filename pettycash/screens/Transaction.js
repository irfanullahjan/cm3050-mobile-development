import { FormikProvider, useFormik } from "formik";
import { Button, View } from "react-native";
import { TextInputFormik } from "../components/TextInput";
import { auth, firestore } from "../firebase";

export function Transaction({ navigation }) {
  const formik = useFormik({
    initialValues: {},
    onSubmit: (values) => {
      console.log(values);
      firestore
        .collection(`users/${auth.currentUser.uid}/transactions`)
        .add({
          ...values,
          createdAt: new Date(),
        })
        .then(() => {
          navigation.navigate("Home");
        })
        .catch((error) => {
          console.error(error);
        });
    },
  });
  return (
    <View>
      <FormikProvider value={formik}>
        <TextInputFormik name="description" placeholder="Description" />
        <TextInputFormik name="amount" placeholder="Amount" />
        <Button onPress={formik.submitForm} title="Submit" />
      </FormikProvider>
    </View>
  );
}
