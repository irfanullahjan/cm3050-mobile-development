import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  const grid: null[][] = Array(3).fill(Array(3).fill(null));
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <View
          style={{
            backgroundColor: "white",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {grid.map((row, rowIndex) => (
            <View
              key={rowIndex}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "row",
                borderTopWidth: rowIndex !== 0 ? 2 : 0,
              }}
            >
              {row.map((col, colIndex) => (
                <View
                  key={colIndex}
                  style={{ flex: 1, borderLeftWidth: colIndex !== 0 ? 2 : 0 }}
                ></View>
              ))}
            </View>
          ))}
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    width: "100%",
    aspectRatio: 1,
    padding: 20,
  },
});
