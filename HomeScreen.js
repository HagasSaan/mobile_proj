import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Game', { ballsCount: 1 })}
      >
        <Text>Easy level</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Game2', { ballsCount: 2 }) }
      >
        <Text>Medium level</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Game3', { ballsCount: 3 }) }
      >
        <Text>Extra Medium</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Game4', { ballsCount: 4 }) }
      >
        <Text>Hard level</Text>
      </TouchableOpacity>
    </View>
  );
}
