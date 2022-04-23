import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function App() {
  type Square = "X" | "O" | null;
  const emptyGrid: Square[][] = Array(3).fill(Array(3).fill(null));
  const [nextPlayer, setNextPlayer] = useState<Square>(
    Math.random() < 0.5 ? "X" : "O"
  );
  const [grid, setGrid] = useState<Square[][]>(emptyGrid);

  return (
    <View style={styles.container}>
      <Text>Player: {nextPlayer}</Text>
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
              {row.map((square, colIndex) => (
                <View
                  key={colIndex}
                  style={{ flex: 1, borderLeftWidth: colIndex !== 0 ? 2 : 0 }}
                >
                  <TouchableOpacity
                    style={{ width: "100%", height: "100%", display: "flex" }}
                    onPress={() => {
                      console.log(rowIndex, colIndex);
                      if (square === null) {
                        const newGrid = [...grid];
                        const newRow = [...newGrid[rowIndex]];
                        newRow[colIndex] = nextPlayer;
                        newGrid[rowIndex] = newRow;
                        setGrid(newGrid);
                        setNextPlayer(nextPlayer === "X" ? "O" : "X");
                      }
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        justifyContent: "center",
                        height: "100%",
                        display: "flex",
                        margin: 0,
                        padding: 0,
                        fontSize: 50,
                      }}
                    >
                      {square}
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          ))}
        </View>
      </View>
      <Button onPress={() => setGrid(emptyGrid)} title="Reset" />
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
