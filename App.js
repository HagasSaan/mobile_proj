import * as React from "react";
import {useState} from "react";
import { View, StyleSheet, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { GameEngine } from "react-native-game-engine";
import entities from "./entities";
import Physics from "./systems/Physics";
import Matter from "matter-js";

export default function App() {
  const engine = Matter.Engine.create({ enableSleeping: false });
  const world = engine.world;
  const gameEngineRef = React.useRef(null);

  const [currentPoints, setCurrentPoints] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.scoreText}>{currentPoints}</Text>
      <GameEngine
        ref={gameEngineRef}
        systems={[Physics]}
        entities={{
          engine: engine,
          world: world,
          gameEngineRef: gameEngineRef, // Pass gameEngineRef as a prop
          ...entities(world),
        }}
        onEvent={(e) => {
          switch (e.type) {
            case 'new_point':
              setCurrentPoints(currentPoints + 1)
              break;
          }
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
  scoreText: {
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold',
    backgroundColor: 'white',
    color: 'black', 
    marginTop: 10,
  },
});
