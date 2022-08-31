import { FormikProvider, useFormik } from "formik";
import { Alert, Button } from "react-native";
import { TextInput } from "../../components/TextInput";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import * as Yup from "yup";
import { FormContainer } from "../../components/FormContainer";

export function Login() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: ({ email, password }) => {
      signInWithEmailAndPassword(auth, email, password).catch((error) => {
        Alert.alert("Error logging in");
        console.error(error);
      });
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),
  });

  return (
    <FormContainer>
      <FormikProvider value={formik}>
        <TextInput
          name="email"
          placeholder="Email"
          textContentType="emailAddress"
          autoCapitalize="none"
          autoCompleteType="email"
          autoCorrect={false}
          keyboardType="email-address"
        />
        <TextInput
          name="password"
          placeholder="Password"
          textContentType="password"
          autoCapitalize="none"
          autoCompleteType="password"
          autoCorrect={false}
          secureTextEntry={true}
        />
        <Button onPress={formik.submitForm} title="Login" />
      </FormikProvider>
    </FormContainer>
  );
}
