import React, { useState } from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import { GameLoop } from "react-native-game-engine";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");
const RADIUS = 25;

export default function App() {
  const [coords, setCoords] = useState({
    x: WIDTH / 2 - RADIUS,
    y: HEIGHT / 2 - RADIUS,
  });

  updateHandler = ({ touches, screen, layout, time }) => {
    // console.log(touches, screen, layout, time);
    let move = touches.find((x) => x.type === "move");
    if (move) {
      setCoords({
        x: coords.x + move.delta.pageX,
        y: coords.y + move.delta.pageY,
      });
    }
  };

  return (
    <GameLoop style={styles.container} onUpdate={updateHandler}>
      <View style={[styles.player, { left: coords.x, top: coords.y }]} />
    </GameLoop>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  player: {
    position: "absolute",
    backgroundColor: "pink",
    width: RADIUS * 2,
    height: RADIUS * 2,
    borderRadius: RADIUS * 2,
  },
});
