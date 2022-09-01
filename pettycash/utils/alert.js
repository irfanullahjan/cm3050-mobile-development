import { Alert, Platform } from "react-native";

export function alert(description) {
  if (Platform.OS === "web") {
    return window.alert(description);
  } else {
    return Alert.alert(description);
  }
}
