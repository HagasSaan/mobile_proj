import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Modal,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const levelInstructions = {
  easy: {
    title: "🎱 Easy Level",
    description:
      "- Suitable for beginners.\n- Fewer balls, more time to aim.\n- Wider pockets, slower game.\n- Great for learning shot mechanics.",
  },
  medium: {
    title: "⚡ Medium Level",
    description:
      "- Ideal for players with some experience.\n- More balls, requiring better strategy.\n- Pockets are slightly smaller.\n- Careful with cue ball positioning.",
  },
  hard: {
    title: "🔥 Hard Level",
    description:
      "- For experienced players seeking a challenge.\n- Many balls, requiring precise shots.\n- Pockets are even smaller.\n- One mistake can cost a turn!",
  },
  extra_hard: {
    title: "💀 Extra Hard Level",
    description:
      "- For professionals only! 🏆\n- Maximum balls on the table.\n- Tiny pockets, high accuracy needed.\n",
  },
};

export default function InstructionScreen() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ImageBackground
      source={require("./assets/background2.jpg")}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>🎱 Billiard Game 🎱</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.buttonText}>📜 Instructions</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.playButton]}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.buttonText}>▶ Play</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.creatorsContainer}>
        <Text style={styles.creatorsText}>Classic billiard game made by:</Text>
        <Text style={styles.creatorsText}>Artem Konovalov</Text>
        <Text style={styles.creatorsText}>Maksim Vinogradov</Text>
        <Text style={styles.creatorsText}>Mikhail Kulebyakin</Text>
      </View>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>📜 Game Instructions</Text>

            <ScrollView>
              {Object.entries(levelInstructions).map(([key, info]) => (
                <View key={key} style={styles.instructionBox}>
                  <Text style={styles.instructionTitle}>{info.title}</Text>
                  <Text style={styles.instructionText}>{info.description}</Text>
                </View>
              ))}
            </ScrollView>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
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
  playButton: {
    backgroundColor: "green",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  creatorsContainer: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    alignItems: "center",
  },
  creatorsText: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 2,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "90%",
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  instructionBox: {
    backgroundColor: "#f8f8f8",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  instructionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 5,
  },
  instructionText: {
    fontSize: 16,
    textAlign: "left",
    color: "#333",
  },
  closeButton: {
    backgroundColor: "#FF4500",
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 15,
    alignItems: "center",
  },
});
