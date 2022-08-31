import { FormikProvider, useFormik } from "formik";
import { Alert, Button, View } from "react-native";
import { TextInput } from "../../components/TextInput";
import { createUserWithEmailAndPassword } from "firebase/auth";
import * as Yup from "yup";
import { auth } from "../../firebase";
import { FormContainer } from "../../components/FormContainer";

export function SignUp({ navigation }) {
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
          Alert.alert("Error signing up, please try again perhaps with a different email address");
          console.error(error);
        });
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
      confirmPassword: Yup.string()
        .required("Required")
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
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
        <TextInput
          name="confirmPassword"
          placeholder="Confirm Password"
          textContentType="password"
          autoCapitalize="none"
          autoCompleteType="password"
          autoCorrect={false}
          secureTextEntry={true}
        />
        <Button onPress={formik.submitForm} title="Sign Up" />
      </FormikProvider>
    </FormContainer>
  );
}
