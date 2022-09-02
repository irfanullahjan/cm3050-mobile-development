import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { FormikProvider, useFormik } from "formik";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Button } from "react-native";
import * as Yup from "yup";

import { ButtonSelect } from "../../components/ButtonSelect";
import { FormContainer } from "../../components/FormContainer";
import { LoadingScreen } from "../../components/LoadingScreen";
import { TextInput } from "../../components/TextInput";
import { auth, firestore } from "../../firebase";

export function Transaction({ navigation, route }) {
  const { t } = useTranslation("wallet");
  const { transactionId } = route?.params;

  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      amount: "",
      description: "",
      type: "EXPENSE",
    },
    onSubmit: (values) => {
      const path = ["users", auth.currentUser.uid, "transactions"];
      let submitPromise;
      if (transactionId) {
        path.push(transactionId);
        submitPromise = setDoc(doc(firestore, ...path), {
          ...values,
          updatedAt: new Date(),
        });
      } else {
        submitPromise = addDoc(collection(firestore, ...path), {
          ...values,
          createdAt: new Date(),
        });
      }
      submitPromise
        .then(() => {
          navigation.navigate("Wallet");
        })
        .catch((error) => {
          console.error(error);
        });
    },
    validationSchema: Yup.object().shape({
      description: Yup.string().required(t("translation:validation.required")),
      amount: Yup.number()
        .typeError(t("translation:validation.mustBeNumber"))
        .positive(t("translation:validation.mustBePositive"))
        .required(t("translation:validation.required")),
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
          formik.setSubmitting(false);
          setLoading(false);
          console.error(error);
        });
    }
  }, [transactionId]);

  if (loading || formik.isSubmitting) {
    return <LoadingScreen />;
  }

  const deleteTransaction = (id) => {
    setLoading(true);
    deleteDoc(doc(firestore, "users", auth.currentUser.uid, "transactions", id))
      .then(() => {
        setLoading(false);
        navigation.navigate("Wallet");
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  };

  const confirmDelete = (id) => {
    Alert.alert(
      t("deleteDialog.title"),
      t("deleteDialog.message"),
      [
        {
          text: t("deleteDialog.cancel"),
          style: "cancel",
        },
        {
          text: t("deleteDialog.delete"),
          style: "destructive",
          onPress: () => deleteTransaction(id),
        },
      ],
      { cancelable: false }
    );
  };

  const transactionTypes = [
    {
      label: t("transactionForm.types.expense"),
      value: "INCOME",
    },
    {
      label: t("transactionForm.types.income"),
      value: "EXPENSE",
    },
  ];

  return (
    <FormContainer>
      <FormikProvider value={formik}>
        <TextInput
          name="description"
          label={t("transactionForm.description")}
        />
        <TextInput
          name="amount"
          label={t("transactionForm.amount")}
          keyboardType="numeric"
        />
        <ButtonSelect
          name="type"
          label={t("transactionForm.type")}
          options={transactionTypes}
        />
        <Button
          onPress={formik.submitForm}
          title={t("transactionForm.submit")}
        />
        {transactionId && (
          <Button
            onPress={() => confirmDelete(transactionId)}
            title={t("transactionForm.delete")}
            color="red"
          />
        )}
      </FormikProvider>
    </FormContainer>
  );
}
