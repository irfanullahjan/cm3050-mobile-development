import { FormikProvider, useFormik } from "formik";
import { useEffect, useState } from "react";
import { Alert, Button, View, Picker, Pressable, Text } from "react-native";
import { TextInputFormik } from "../../components/TextInput";
import { auth, firestore } from "../../firebase";
import * as Yup from "yup";
import { LoadingScreen } from "../../components/LoadingScreen";
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";

export function Transaction({ navigation, route }) {
  const { transactionId } = route?.params;

  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      type: "EXPENSE",
    },
    onSubmit: (values) => {
      const path = ["users", auth.currentUser.uid, "transactions"];
      let data;
      if (transactionId) {
        path.push(transactionId);
        data = {
          ...values,
          updatedAt: new Date(),
        };
      } else {
        data = {
          ...values,
          createdAt: new Date(),
        };
      }
      setDoc(doc(firestore, ...path), data)
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
      const uid = auth.currentUser.uid;
      if (!uid) {
        return;
      }
      setLoading(true);
      getDoc(doc(firestore, "users", uid, "transactions", transactionId))
        .then((doc) => {
          setLoading(false);
          if (doc.exists()) {
            formik.setValues(doc.data());
          }
        })
        .catch((error) => {
          setLoading(false);
          console.error(error);
        });
    }
  }, [transactionId]);

  if (loading) {
    return <LoadingScreen />;
  }

  const deleteTransaction = (id) => {
    deleteDoc(doc(firestore, "users", auth.currentUser.uid, "transactions", id))
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

  const transactionTypes = [
    {
      label: "Income",
      value: "INCOME",
    },
    {
      label: "Expense",
      value: "EXPENSE",
    },
  ];

  const handlePressTransactionType = (type) => {
    formik.setFieldValue("type", type.value);
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
        <View style={{ margin: 15, flexDirection: "row" }}>
          {transactionTypes.map((type) => (
            <Pressable
              key={type.value}
              onPress={() => handlePressTransactionType(type)}
            >
              <View
                style={[
                  formik.values.type === type.value
                    ? { backgroundColor: "lightgray" }
                    : {},
                  { padding: 10 },
                ]}
              >
                <Text>{type.label}</Text>
              </View>
            </Pressable>
          ))}
        </View>
        <Button onPress={formik.submitForm} title="Submit" />
        {transactionId && (
          <Button
            onPress={() => confirmDelete(transactionId)}
            title="Delete"
            color={"red"}
          />
        )}
      </FormikProvider>
    </View>
  );
}
