import { signInWithEmailAndPassword } from "firebase/auth";
import { FormikProvider, useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { Button } from "react-native";
import * as Yup from "yup";

import { FormContainer } from "../../components/FormContainer";
import { LoadingScreen } from "../../components/LoadingScreen";
import { TextInput } from "../../components/TextInput";
import { auth } from "../../firebase";
import { confirm } from "../../utils/confirm";

export function Login({ navigation }) {
  const { t } = useTranslation("auth");
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: ({ email, password }) => {
      signInWithEmailAndPassword(auth, email, password).catch((error) => {
        formik.setSubmitting(false);
        confirm(
          t("loginFailedDialog.title"),
          t("loginFailedDialog.message"),
          [
            {
              text: t("loginFailedDialog.options.retry"),
              style: "cancel",
            },
            {
              text: t("loginFailedDialog.options.resetPassword"),
              style: "destructive",
              onPress: () => navigation.navigate("ResetPass"),
            },
          ],
          { cancelable: false }
        );
        console.error(error);
      });
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email(t("translation:validation.email"))
        .required(t("translation:validation.required")),
      password: Yup.string().required(t("translation:validation.required")),
    }),
  });

  if (formik.isSubmitting) {
    return <LoadingScreen />;
  }

  return (
    <FormContainer>
      <FormikProvider value={formik}>
        <TextInput
          name="email"
          label={t("email")}
          textContentType="emailAddress"
          autoCapitalize="none"
          autoCompleteType="email"
          autoCorrect={false}
          keyboardType="email-address"
        />
        <TextInput
          name="password"
          label={t("password")}
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
