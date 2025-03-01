import * as React from "react";
import { useState } from "react";
import { View, StyleSheet, Text, ImageBackground, Dimensions } from "react-native";
import { StatusBar } from "expo-status-bar";
import { GameEngine } from "react-native-game-engine";
import entities from "./entities";
import Physics from "./systems/Physics";
import Matter from "matter-js";

const { width, height } = Dimensions.get("window");

export default function App() {
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
        <Text style={styles.scoreText}>{currentPoints}</Text>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    width: width * 1.04,
    height: height * 1.02,
    alignSelf: "center",
    position: "absolute",
    top: 2,
    left: -10,
  },
  gameContainer: {
    flex: 1,
  },
});



