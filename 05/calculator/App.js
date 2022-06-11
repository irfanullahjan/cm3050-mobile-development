import { StatusBar } from "expo-status-bar";
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function App() {
  const buttons = [
    ["C", "+-", "%", "/"],
    ["7", "8", "9", "X"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["0", ".", "="],
  ];

  return (
    <View style={styles.container}>
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1}}>
          <View style={styles.display}>
            <Text style={styles.displayText}>1234</Text>
          </View>
          <View style={styles.buttons}>
            {buttons.map((buttonsRow, rowIndex) => (
              <View style={styles.buttonsRow} key={rowIndex}>
                {buttonsRow.map((buttonText) => (
                  <TouchableOpacity style={styles.buttonCol} key={buttonText}>
                    <View style={styles.button}>
                      <Text style={{fontSize: 20}}>{buttonText}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>
        </View>
        <StatusBar style="auto" />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "space-between"
  },
  display: {
    flexGrow: 1,
    fontSize: 40,
  },
  displayText: {
    padding: 30,
    textAlign: "right",
    fontSize: 60,
    color: "white"
  },
  buttons: {
    padding: 10,
  },
  buttonsRow: {
    display: "flex",
    flexDirection: "row",
  },
  buttonCol: {
    width: "25%",
    aspectRatio: 1,
    padding: 10,
  },
  button: {
    borderRadius: "100%",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "gray",
    width: "100%",
    height: "100%",
  },
});
