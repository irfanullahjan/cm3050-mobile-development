import { ActivityIndicator, View } from "react-native";

export function LoadingScreen() {
  return (
    <View style={{ flex: 1, alignContent: "center", justifyContent: "center" }}>
      <ActivityIndicator />
    </View>
  );
}
