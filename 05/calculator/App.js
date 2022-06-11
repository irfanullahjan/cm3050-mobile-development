import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
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

  const [display, setDisplay] = useState("0");
  const [operation, setOperation] = useState("");
  const [previousValue, setPreviousValue] = useState("");

  const handleButtonPress = (button) => {
    if (button === "C") {
      setDisplay("0");
      setOperation("");
      setPreviousValue("");
    } else if (button === "=") {
      const result = calculate();
      setDisplay(result);
      setOperation("");
      setPreviousValue(result);
    } else if (button === "+-") {
      setDisplay(display * -1);
    } else if (["+", "-", "X", "/", "%"].includes(button)) {
      setOperation(button);
      setPreviousValue(display);
      setDisplay("");
    } else if (button === ".") {
      if (!display.includes(".")) {
        setDisplay(display + ".");
      }
    } else {
      if (display === "0") {
        setDisplay(button);
      } else {
        setDisplay(display + button);
      }
    }
  };

  const calculate = () => {
    if (operation === "X") {
      return parseFloat(previousValue) * parseFloat(display);
    } else if (operation === "/") {
      return parseFloat(previousValue) / parseFloat(display);
    } else if (operation === "-") {
      return parseFloat(previousValue) - parseFloat(display);
    } else if (operation === "+") {
      return parseFloat(previousValue) + parseFloat(display);
    } else if (operation === "%") {
      return parseFloat(previousValue) % parseFloat(display);
    } else {
      return parseFloat(display);
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <View style={styles.display}>
            <Text style={styles.displayText}>{display}</Text>
          </View>
          <View style={styles.buttons}>
            {buttons.map((buttonsRow, rowIndex) => (
              <View style={styles.buttonsRow} key={rowIndex}>
                {buttonsRow.map((buttonText) => (
                  <TouchableOpacity
                    key={buttonText}
                    style={
                      buttonText != 0
                        ? styles.buttonCol
                        : [styles.buttonCol, styles.buttonColWide]
                    }
                    onPress={() => handleButtonPress(buttonText)}
                  >
                    <View style={styles.button}>
                      <Text style={{ fontSize: 20 }}>{buttonText}</Text>
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
    maxWidth: 500,
    flex: 1,
    backgroundColor: "black",
    justifyContent: "space-between",
  },
  display: {
    flexGrow: 1,
    fontSize: 40,
  },
  displayText: {
    padding: 30,
    textAlign: "right",
    fontSize: 60,
    color: "white",
  },
  buttons: {
    padding: 10,
  },
  buttonsRow: {
    flexDirection: "row",
  },
  buttonCol: {
    flex: 1,
    aspectRatio: 1,
    padding: 10,
  },
  buttonColWide: {
    flexGrow: 2,
    aspectRatio: 2,
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
