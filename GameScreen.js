import * as React from "react";
import { useState, useEffect } from "react";
import { View, StyleSheet, Text, ImageBackground, Dimensions, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { GameEngine } from "react-native-game-engine";
import entities from "./entities/index";
import Physics from "./systems/Physics";
import Matter from "matter-js";
import Constants from "./Constants";
import { useNavigation, useRoute } from '@react-navigation/native';

export default function GameScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { ballsCount } = route.params;
  const engine = Matter.Engine.create({ enableSleeping: false });
  const world = engine.world;

  const [currentPoints, setCurrentPoints] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (currentPoints === 1) {
      setRunning(true);
    }

    return () => {
        Matter.Engine.clear(engine);
    };
  }, [currentPoints]);

  function handleGameEngineEvents(e) {
    switch (e.type) {
      case "new_point":
        console.log("new_point dispatch called");
        setCurrentPoints(prevPoints => prevPoints + 1);  // Increment points
        break;
      case "game_over":
        console.log("new_point dispatch called");
        setRunning(true);
        break;
      default:
        console.log('unhandled game engine event', e.type);
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
            ...entities(world, ballsCount),
          }}
          onEvent={handleGameEngineEvents}
          style={styles.gameContainer}
        >
          <StatusBar hidden={true} />
        </GameEngine>
      </ImageBackground>
      <Text style={styles.scoreText}>Score: {currentPoints}</Text>
      {running && (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 50, marginBottom: 20 }}>
      GAME OVER
    </Text>
    <TouchableOpacity
      style={{ backgroundColor: 'black', paddingHorizontal: 30, paddingVertical: 10 }}
      onPress={() => navigation.navigate('Home')} 
    >
      <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 30 }}>
        EXIT
      </Text>
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