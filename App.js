import * as React from "react";
import { View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { GameEngine } from "react-native-game-engine";
import entities from "./entities";
import Physics from "./systems/Physics";
import Matter from "matter-js";

export default function App() {
  const engine = Matter.Engine.create({ enableSleeping: false });
  const world = engine.world;

  return (
    <View style={styles.container}>
      <GameEngine
        systems={[Physics]}
        entities={{
          engine: engine,
          world: world,
          ...entities(world),
        }}
        style={styles.gameContainer}
      >
        <StatusBar hidden={true} />
      </GameEngine>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "green",
  },
  gameContainer: {
    flex: 1,
    // paddingTop: Constants.statusBarHeight,
    // backgroundColor: "blue",
    padding: 0,
  },
});
