import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {
  createStaticNavigation,
  useNavigation
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import GameScreen from "./GameScreen";
import HomeScreen from "./HomeScreen";

const RootStack = createNativeStackNavigator({
  screens: {
    Home: HomeScreen,
    Game: GameScreen,
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return <Navigation />;
}
