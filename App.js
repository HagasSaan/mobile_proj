import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {
  createStaticNavigation,
  useNavigation
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import GameScreen from "./GameScreen";
import HomeScreen from "./HomeScreen";
import GameScreen2 from "./GameScreen2";
import GameScreen3 from "./GameScreen3";
import GameScreen4 from "./GameScreen4";


const RootStack = createNativeStackNavigator({
  screens: {
    Home: HomeScreen,
    Game: GameScreen,
    Game2: GameScreen2,
    Game3: GameScreen3,
    Game4: GameScreen4,
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return <Navigation />;
}