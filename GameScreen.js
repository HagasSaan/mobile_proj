import * as React from "react";
import { useState } from "react";
import { View, StyleSheet, Text, ImageBackground, Dimensions } from "react-native";
import { StatusBar } from "expo-status-bar";
import { GameEngine } from "react-native-game-engine";
import entities from "./entities";
import Physics from "./systems/Physics";
import Matter from "matter-js";
import Constants from "./Constants";

export default function GameScreen() {
  const engine = Matter.Engine.create({ enableSleeping: false });
  const world = engine.world;
  const gameEngineRef = React.useRef(null);

  const [currentPoints, setCurrentPoints] = useState(0);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("./assets/background.jpg")}
        style={styles.background}
        resizeMode="cover"
      >
        <GameEngine
          ref={gameEngineRef}
          systems={[Physics]}
          entities={{
            engine: engine,
            world: world,
            gameEngineRef: gameEngineRef,
            ...entities(world),
          }}
          onEvent={(e) => {
            switch (e.type) {
              case "new_point":
                setCurrentPoints(currentPoints + 1);
                break;
            }
          }}
          style={styles.gameContainer}
        >
          <StatusBar hidden={true} />
        </GameEngine>
      </ImageBackground>
      <Text style={styles.scoreText}>Score: {currentPoints}</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    width: Constants.WINDOW_WIDTH,
    height: Constants.WINDOW_HEIGHT,
    alignSelf: "center",
    position: "absolute",
    top: -50,
    left: 0,
  },
  gameContainer: {
    flex: 1,
  },
  scoreText: {
    position: "absolute",
    color: "white",
    top: Constants.WINDOW_HEIGHT - 105,
    left: 20,
    fontSize: 36
  }
});



