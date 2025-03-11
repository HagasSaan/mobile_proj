import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const navigation = useNavigation();

  const levelSettings = [
    {linesCount: 1, buttonText: "Easy Level", buttonStyle: styles.button, textStyle: styles.buttonText},
    {linesCount: 2, buttonText: "Medium Level", buttonStyle: styles.button, textStyle: styles.buttonText},
    {linesCount: 3, buttonText: "Hard Level", buttonStyle: styles.button, textStyle: styles.buttonText},
    {linesCount: 4, buttonText: "🔥 Extra Hard Level 🔥", buttonStyle: styles.buttonHard, textStyle: styles.buttonTextHard},
  ];

  return (
    <ImageBackground source={require("./assets/background2.jpg")} style={styles.background}>
      <View style={styles.overlay}>
        <Text style={styles.title}>🎱 Billiard Game 🎱</Text>

        {
          levelSettings.map((settings) => (
            <TouchableOpacity
              key={settings.linesCount}
              style={settings.buttonStyle}
              onPress={() => navigation.navigate("Game", { linesCount: settings.linesCount })}
            >
              <Text style={settings.textStyle}>{settings.buttonText}</Text>
            </TouchableOpacity>
          ))
        }
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
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
    backgroundColor: "#1E90FF",
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
  buttonHard: {
    backgroundColor: "#FF4500",
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
