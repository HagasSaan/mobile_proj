import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎱 Billiard Game 🎱</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Game", { ballsCount: 1 })}
      >
        <Text style={styles.buttonText}>Easy Level</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Game2", { ballsCount: 2 })}
      >
        <Text style={styles.buttonText}>Medium Level</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Game3", { ballsCount: 3 })}
      >
        <Text style={styles.buttonText}>Extra Medium</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonHard}
        onPress={() => navigation.navigate("Game4", { ballsCount: 4 })}
      >
        <Text style={styles.buttonTextHard}>🔥 Hard Level 🔥</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212", // Тёмный фон
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#1E90FF", // Синий цвет кнопки
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginVertical: 10,
    width: "80%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5, // Тень для Android
  },
  buttonHard: {
    backgroundColor: "#FF4500", // Оранжево-красный цвет для сложного уровня
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginVertical: 10,
    width: "80%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonTextHard: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
