import * as React from "react";
import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import GameScreen from "./GameScreen";
import HomeScreen from "./HomeScreen";
import InstructionsScreen from "./InstructionsScreen";

const RootStack = createNativeStackNavigator({
  screens: {
    Home: HomeScreen,
    Game: GameScreen,
    Instructions: InstructionsScreen,
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return <Navigation />;
}
