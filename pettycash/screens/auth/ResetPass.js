import { useTheme } from "@react-navigation/native";
import { sendPasswordResetEmail } from "firebase/auth";
import { FormikProvider, useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { Button, Text } from "react-native";
import * as Yup from "yup";

import { FormContainer } from "../../components/FormContainer";
import { LoadingScreen } from "../../components/LoadingScreen";
import { TextInput } from "../../components/TextInput";
import { auth } from "../../firebase";
import { alert } from "../../utils/alert";

export function ResetPass({ navigation }) {
  const { t } = useTranslation("auth");
  const { colors } = useTheme();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: ({ email }) => {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          navigation.goBack();
          alert(t("resetPasswordSuccess"));
        })
        .catch((error) => {
          formik.setSubmitting(false);
          alert(t("resetPasswordFailed"));
          console.error(error);
        });
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email(t("translation:validation.email"))
        .required(t("translation:validation.required")),
    }),
  });

  if (formik.isSubmitting) {
    return <LoadingScreen />;
  }

  return (
    <FormContainer>
      <Text style={{ marginBottom: 16, color: colors.text }}>
        {t("resetPasswordInfo")}
      </Text>
      <FormikProvider value={formik}>
        <TextInput
          name="email"
          label={t("email")}
          autoCapitalize="none"
          autoCompleteType="email"
          textContentType="emailAddress"
          keyboardType="email-address"
        />
        <Button title={t("buttons.submit")} onPress={formik.handleSubmit} />
      </FormikProvider>
    </FormContainer>
  );
}
