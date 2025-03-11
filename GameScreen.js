import * as React from "react";
import { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { GameEngine } from "react-native-game-engine";
import entities from "./entities/index";
import Physics from "./systems/Physics";
import Matter from "matter-js";
import Constants from "./Constants";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function GameScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const engine = Matter.Engine.create({ enableSleeping: false });
  const world = engine.world;

  const { linesCount } = route.params;
  function factorial(n) {
    if (n === 1) {
      return 1;
    }
    return n * factorial(n - 1);
  }
  const pointsToWin = factorial(linesCount);

  const [currentPoints, setCurrentPoints] = useState(0);
  const [running, setRunning] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (currentPoints >= pointsToWin) {
      setRunning(false);
      setMessage("You won!");
    }

    return () => {
      Matter.Engine.clear(engine);
    };
  }, [currentPoints]);

  function handleGameEngineEvents(e) {
    switch (e.type) {
      case "new_point":
        console.log("new_point dispatch called");
        setCurrentPoints((prevPoints) => prevPoints + 1); // Increment points
        break;
      case "game_over":
        console.log("new_point dispatch called");
        setRunning(false);
        setMessage("You lose...");
        break;
      default:
        console.log("unhandled game engine event", e.type);
        break;
    }
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("./assets/background.jpg")}
        style={styles.background}
        resizeMode="cover"
      >
        <GameEngine
          systems={[Physics]}
          entities={{
            engine: engine,
            world: world,
            ...entities(world, linesCount),
          }}
          onEvent={handleGameEngineEvents}
          style={styles.gameContainer}
        >
          <StatusBar hidden={true} />
        </GameEngine>
      </ImageBackground>
      <Text style={styles.scoreText}>Score: {currentPoints}</Text>
      {!running && (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={styles.gameStatusText}>{message}</Text>
          <TouchableOpacity
            style={styles.exitButton}
            onPress={() => navigation.navigate("Home")}
          >
            <Text style={styles.exitText}>EXIT</Text>
          </TouchableOpacity>
        </View>
      )}
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
    top: -20,
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
    fontSize: 36,
  },
  gameStatusText: {
    fontWeight: "bold",
    color: "white",
    fontSize: 50,
    marginBottom: 20,
  },
  exitButton: {
    backgroundColor: "black",
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  exitText: { fontWeight: "bold", color: "white", fontSize: 30 },
});
