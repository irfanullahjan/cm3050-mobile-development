import { StatusBar } from "react-native";
import { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function App() {
  const buttonsDefault = [
    [
      { text: "AC", intent: "secondary" },
      { text: "±", intent: "secondary" },
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

  const [buttons, setButtons] = useState(buttonsDefault);
  const [answerValue, setAnswerValue] = useState(0);
  const [memoryValue, setMemoryValue] = useState(0);
  const [operatorValue, setOperatorValue] = useState(0);
  const [readyToReplace, setReadyToReplace] = useState(true);

  const operations = ["+", "−", "×", "÷"];

  const handleButtonPress = (button) => {
    if (parseInt(button) >= 0 || button === ".") {
      handleNumberInput(button);
    } else if (operations.includes(button)) {
      setMemoryValue(operatorValue === 0 ? answerValue : calculateEquals());
      setOperatorValue(button);
      setReadyToReplace(true);
    } else if (button === "=") {
      calculateEquals();
      setMemoryValue(0);
      setReadyToReplace(true);
    } else if (button === "±") {
      setAnswerValue(answerValue * -1);
    } else if (button === "%") {
      setAnswerValue(answerValue / 100);
    } else if (button === "AC") {
      setAnswerValue(0);
      setMemoryValue(0);
      setOperatorValue(0);
      setReadyToReplace(true);
    } else if (button === "C") {
      setAnswerValue(0);
      setReadyToReplace(true);
    }
  }

  const handleNumberInput = (number) => {
    if (readyToReplace || parseInt(answerValue) === 0) {
      setAnswerValue(number);
      setReadyToReplace(false);
    } else {
      setAnswerValue(answerValue + number);
    }
  }

  const calculateEquals = () => {
    const current = parseFloat(answerValue);
    const previous = parseFloat(memoryValue);
    let result = 0;
    switch (operatorValue) {
      case "+":
        result = previous + current; break;
      case "−":
        result = previous - current; break;
      case "×":
        result = previous * current; break;
      case "÷":
        result = previous / current; break;
      default:
        break;
    }
    setAnswerValue(result);
    return result;
  }

  // Convert AC to C and vice versa
  useEffect(() => {
    let newButtons = [...buttons];
    if (answerValue === 0) {
      newButtons[0][0].text = "AC";
    } else {
      newButtons[0][0].text = "C";
    }
    setButtons(newButtons);
  }, [answerValue]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar style="auto" />
        <View style={{ flex: 1 }}>
          <View style={styles.display}>
            <Text style={styles.displayText}>{answerValue}</Text>
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
    flex: 1,
  },
  displayText: {
    paddingLeft: 10,
    paddingRight: 10,
    textAlign: "right",
    fontSize: 70,
    color: "white",
  },
  keypad: {
  },
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
    fontSize: 40,
    color: "black",
  },
  buttonTextDark: {
    color: "white",
  },
});
