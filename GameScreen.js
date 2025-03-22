import * as React from "react";
import { useState, useEffect, useRef } from "react";
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
import ConfettiCannon from "react-native-confetti-cannon";

export default function GameScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const engine = Matter.Engine.create({ enableSleeping: false });
  const world = engine.world;

  const { linesCount, holesSize } = route.params;

  function arithmeticProgression(n) {
    if (n === 1) {
      return 1;
    }
    return n + arithmeticProgression(n - 1);
  }

  const pointsToWin = arithmeticProgression(linesCount);

  const [currentPoints, setCurrentPoints] = useState(0);
  const [currentTurns, setCurrentTurns] = useState(0);
  const [running, setRunning] = useState(true);
  const [message, setMessage] = useState("");
  const gameEngine = useRef(null);

  useEffect(() => {
    gameEngine.current.swap({
      engine: engine,
      world: world,
      ...entities(world, linesCount, holesSize),
    });
    return () => {
      Matter.Engine.clear(engine);
    };
  }, []);

  function handleGameEngineEvents(e) {
    switch (e.type) {
      case "new_point":
        console.log("new_point dispatch called");
        setCurrentPoints((prevPoints) => {
          const newPoints = prevPoints + 1;
          if (newPoints >= pointsToWin) {
            setRunning(false);
            setMessage("You win!");
          }
          return newPoints;
        });
        break;
      case "new_turn":
        console.log("new_turn dispatch called");
        setCurrentTurns((prevTurns) => prevTurns + 1);
        break;
      case "game_over":
        console.log("game_over dispatch called");
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
          ref={gameEngine}
          systems={[Physics]}
          onEvent={handleGameEngineEvents}
          style={styles.gameContainer}
        >
          <StatusBar hidden={true} />
        </GameEngine>
      </ImageBackground>

      <Text style={styles.scoreText}>
        Score: {currentPoints} / {pointsToWin}
      </Text>
      <Text style={styles.turnsText}>Turns: {currentTurns}</Text>

      {!running && (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          {message === "You win!" && (
            <>
              <ConfettiCannon
                count={450}
                origin={{ x: 0, y: 0 }}
                fallSpeed={3000}
                fadeOut
                colors={[
                  "#ff0a54",
                  "#ff477e",
                  "#ff7096",
                  "#ff85a1",
                  "#fbb1bd",
                  "#f9bec7",
                ]}
              />
              <ConfettiCannon
                count={150}
                origin={{ x: Constants.WINDOW_WIDTH, y: 0 }}
                fallSpeed={3000}
                fadeOut
                colors={[
                  "#00f5d4",
                  "#00bbf9",
                  "#3c096c",
                  "#f72585",
                  "#4895ef",
                  "#560bad",
                ]}
              />
            </>
          )}
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
  turnsText: {
    position: "absolute",
    color: "white",
    top: Constants.WINDOW_HEIGHT - 105,
    right: 40,
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
  exitText: {
    fontWeight: "bold",
    color: "white",
    fontSize: 30,
  },
});
