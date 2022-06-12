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
    [
      { text: "C", intent: "secondary" },
      { text: "+-", intent: "secondary" },
      { text: "%", intent: "secondary" },
      { text: "÷", intent: "primary" },
    ],
    [
      { text: "7" },
      { text: "8" },
      { text: "9" },
      { text: "×", intent: "primary" },
    ],
    [
      { text: "4" },
      { text: "5" },
      { text: "6" },
      { text: "−", intent: "primary" },
    ],
    [
      { text: "1" },
      { text: "2" },
      { text: "3" },
      { text: "+", intent: "primary" },
    ],
    [{ text: "0", span: 2 }, { text: "." }, { text: "=", intent: "primary" }],
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
    } else if (["+", "−", "×", "÷", "%"].includes(button)) {
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
    if (operation === "×") {
      return parseFloat(previousValue) * parseFloat(display);
    } else if (operation === "÷") {
      return parseFloat(previousValue) / parseFloat(display);
    } else if (operation === "−") {
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
          <View style={styles.keypad}>
            {buttons.map((buttonsRow, rowIndex) => (
              <View style={styles.keypadRow} key={rowIndex}>
                {buttonsRow.map((buttonObj) => (
                  <View
                    key={buttonObj.text}
                    style={[
                      styles.keypadCol,
                      buttonObj.span === 2 ? styles.keypadColSpan2 : null,
                    ]}
                  >
                    <View style={styles.buttonPadding}>
                      <TouchableOpacity
                        onPress={() => handleButtonPress(buttonObj.text)}
                        style={[
                          styles.button,
                          buttonObj.intent === "primary"
                            ? styles.buttonPrimary
                            : null,
                          buttonObj.intent === "secondary"
                            ? styles.buttonSecondary
                            : null,
                        ]}
                      >
                        <Text
                          style={[
                            styles.buttonText,
                            buttonObj.intent ? null : styles.buttonTextDark,
                          ]}
                        >
                          {buttonObj.text}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
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
  keypad: {},
  keypadRow: {
    flexDirection: "row",
  },
  keypadCol: {
    flex: 1,
    aspectRatio: 1,
  },
  keypadColSpan2: {
    flexGrow: 2,
    aspectRatio: 2,
  },
  buttonPadding: {
    padding: 10,
    height: "100%",
  },
  button: {
    borderRadius: "100000px",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#222",
    height: "100%",
  },
  buttonPrimary: {
    backgroundColor: "#1589FF",
  },
  buttonSecondary: {
    backgroundColor: "gray",
  },
  buttonText: {
    fontSize: 20,
    color: "black",
  },
  buttonTextDark: {
    color: "white",
  },
});
