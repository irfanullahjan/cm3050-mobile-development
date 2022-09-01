import { createUserWithEmailAndPassword } from "firebase/auth";
import { FormikProvider, useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { Button } from "react-native";
import * as Yup from "yup";

import { FormContainer } from "../../components/FormContainer";
import { TextInput } from "../../components/TextInput";
import { auth } from "../../firebase";
import { alert } from "../../utils/alert";

export function SignUp({ navigation }) {
  const { t } = useTranslation("auth");
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: ({ email, password }) => {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          navigation.navigate("Login");
        })
        .catch((error) => {
          alert(
            "Error signing up, please try again perhaps with a different email address"
          );
          console.error(error);
        });
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email(t("translation:validation.email"))
        .required(t("translation:validation.required")),
      password: Yup.string().required(t("translation:validation.required")),
      confirmPassword: Yup.string()
        .required(t("translation:validation.required"))
        .oneOf([Yup.ref("password"), null], t("validation.confirmPassword")),
    }),
  });

  return (
    <FormContainer>
      <FormikProvider value={formik}>
        <TextInput
          name="email"
          placeholder={t("email")}
          textContentType="emailAddress"
          autoCapitalize="none"
          autoCompleteType="email"
          autoCorrect={false}
          keyboardType="email-address"
        />
        <TextInput
          name="password"
          placeholder={t("password")}
          textContentType="password"
          autoCapitalize="none"
          autoCompleteType="password"
          autoCorrect={false}
          secureTextEntry
        />
        <TextInput
          name="confirmPassword"
          placeholder={t("confirmPassword")}
          textContentType="password"
          autoCapitalize="none"
          autoCompleteType="password"
          autoCorrect={false}
          secureTextEntry
        />
        <Button onPress={formik.submitForm} title={t("buttons.submit")} />
      </FormikProvider>
    </FormContainer>
  );
}
