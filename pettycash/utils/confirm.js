// Adopted from https://github.com/necolas/react-native-web/issues/1026#issuecomment-679102691

import { Alert, Platform } from "react-native";

const alertPolyfill = (title, description, options, extra) => {
  const result = window.confirm(
    [title, description].filter(Boolean).join("\n")
  );

  if (result) {
    const confirmOption = options.find(({ style }) => style !== "cancel");
    confirmOption?.onPress?.();
  } else {
    const cancelOption = options.find(({ style }) => style === "cancel");
    cancelOption?.onPress?.();
  }
};

export const confirm = Platform.OS === "web" ? alertPolyfill : Alert.alert;
