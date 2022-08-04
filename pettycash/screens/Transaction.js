import { FormikProvider, useFormik } from "formik";
import { useEffect, useState } from "react";
import { Alert, Button, View } from "react-native";
import { TextInputFormik } from "../components/TextInput";
import { auth, firestore } from "../firebase";
import * as Yup from "yup";
import { LoadingScreen } from "../components/LoadingScreen";

export function Transaction({ navigation, route }) {
  const { transactionId } = route?.params;

  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {},
    onSubmit: (values) => {
      let objectRef = firestore
        .collection("users")
        .doc(auth.currentUser.uid)
        .collection("transactions");
      if (transactionId) {
        objectRef = objectRef.doc(transactionId).update(values);
      } else {
        objectRef = objectRef.add({
          ...values,
          createdAt: new Date(),
        });
      }
      objectRef
        .then(() => {
          navigation.navigate("Wallet");
        })
        .catch((error) => {
          console.error(error);
        });
    },
    validationSchema: Yup.object().shape({
      description: Yup.string().required("Required"),
      amount: Yup.number("Must be a number")
        .positive("Must be positive")
        .required("Required"),
    }),
  });

  useEffect(() => {
    if (transactionId) {
      setLoading(true);
      firestore
        .collection("users")
        .doc(auth.currentUser.uid)
        .collection("transactions")
        .doc(transactionId)
        .get()
        .then((doc) => {
          console.log(doc.data());
          formik.setValues({ ...doc.data() });
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    }
  }, [transactionId]);

  if (loading) {
    return (
      <LoadingScreen />
    );
  }

  const deleteTransaction = (id) => {
    firestore
      .collection("users")
      .doc(auth.currentUser.uid)
      .collection("transactions")
      .doc(id)
      .delete()
      .then(() => {
        navigation.navigate("Wallet");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  const confirmDelete = (id) => {
    Alert.alert(
      "Delete Transaction",
      "Are you sure you want to delete this transaction?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => deleteTransaction(id),
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View>
      <FormikProvider value={formik}>
        <TextInputFormik name="description" placeholder="Description" />
        <TextInputFormik
          name="amount"
          placeholder="Amount"
          keyboardType="numeric"
        />
        <Button onPress={formik.submitForm} title="Submit" />
        <Button
          onPress={() => confirmDelete(transactionId)}
          title="Delete"
          color={"red"}
        />
      </FormikProvider>
    </View>
  );
}
