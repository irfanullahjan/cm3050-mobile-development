import { FormikProvider, useFormik } from "formik";
import { useContext } from "react";
import { Button, View } from "react-native";
import { AppContext } from "../App";
import { TextInputFormik } from "../components/TextInput";
import { auth } from "../firebase";

export function Login({ navigation }) {
  const { setUser } = useContext(AppContext);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      auth
        .signInWithEmailAndPassword(values.email, values.password)
        .then(() => {
          setUser(auth.currentUser);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    validate: (values) => {
      const errors = {};
      if (!values.email) {
        errors.email = "Required";
      }
      if (!values.password) {
        errors.password = "Required";
      }
      return errors;
    },
  });

  return (
    <View>
      <FormikProvider value={formik}>
        <TextInputFormik
          name="email"
          placeholder="Email"
          textContentType="emailAddress"
          autoCapitalize="none"
          autoCompleteType="email"
          autoCorrect={false}
          keyboardType="email-address"
        />
        <TextInputFormik
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
      <Button title="Sign Up" onPress={() => navigation.navigate("SignUp")} />
    </View>
  );
}
