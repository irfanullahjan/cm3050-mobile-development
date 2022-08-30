import { FormikProvider, useFormik } from "formik";
import { Button, View } from "react-native";
import { TextInputFormik } from "../../components/TextInput";
import { createUserWithEmailAndPassword } from "firebase/auth";
import * as Yup from "yup";
import { auth } from "../../firebase";

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
          console.error(error);
        });
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
      confirmPassword: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Passwords must match"
      ),
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
        <TextInputFormik
          name="confirmPassword"
          placeholder="Confirm Password"
          textContentType="password"
          autoCapitalize="none"
          autoCompleteType="password"
          autoCorrect={false}
          secureTextEntry={true}
        />
        <Button onPress={formik.handleSubmit} title="Sign Up" />
      </FormikProvider>
      <Button title="Login" onPress={() => navigation.navigate("Login")} />
    </View>
  );
}
