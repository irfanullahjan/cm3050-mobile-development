import { FormikProvider, useFormik } from "formik";
import { useContext } from "react";
import { Alert, Button, View } from "react-native";
import { TextInputFormik } from "../components/TextInput";
import { AppContext } from "../contexts/AppContext";
import { auth } from "../firebase";
import * as Yup from "yup";

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
          console.log("User signed in");
          setUser(auth.currentUser);
        })
        .catch((error) => {
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
