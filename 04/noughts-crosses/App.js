import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Button, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function App() {
  const emptyGrid = Array(3).fill(Array(3).fill(null));
  const getRandomNextPlayer = () => (Math.random() < 0.5 ? "X" : "O");
  const getAlternatePlayer = (player) => (player === "X" ? "O" : "X");
  const [nextPlayer, setNextPlayer] = useState(getRandomNextPlayer());
  const [grid, setGrid] = useState(emptyGrid);

  const handleClickSquare = (square, rowIndex, colIndex) => {
    if (square === null) {
      const newGrid = grid.map((row) => [...row]); // deep copy
      newGrid[rowIndex][colIndex] = nextPlayer;
      setGrid(newGrid);
      setNextPlayer(getAlternatePlayer(nextPlayer));
    }
  };

  const handleReset = () => {
    setGrid(emptyGrid);
    setNextPlayer(getAlternatePlayer(nextPlayer));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.nextPlayer}>Next</Text>
      <Text style={styles.nextPlayerSymbol}>{nextPlayer}</Text>
      <View style={styles.box}>
        <View style={styles.gameGrid}>
          {grid.map((row, rowIndex) => (
            <View
              key={rowIndex}
              style={[
                styles.gridRow,
                { borderTopWidth: rowIndex !== 0 ? 2 : 0 },
              ]}
            >
              {row.map((square, colIndex) => (
                <View
                  key={colIndex}
                  style={{ flex: 1, borderLeftWidth: colIndex !== 0 ? 2 : 0 }}
                >
                  <TouchableOpacity
                    style={styles.gridSquare}
                    onPress={() =>
                      handleClickSquare(square, rowIndex, colIndex)
                    }
                  >
                    <Text style={styles.gridSquareText}>{square}</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          ))}
        </View>
      </View>
      <Button onPress={handleReset} title="Reset" />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  nextPlayer: {
    fontSize: 20,
  },
  nextPlayerSymbol: {
    fontSize: 40,
  },
  box: {
    width: "100%",
    aspectRatio: 1,
    padding: 20,
  },
  gameGrid: {
    backgroundColor: "white",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  gridRow: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
  },
  gridSquare: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  gridSquareText: {
    textAlign: "center",
    fontSize: 50,
  },
});
