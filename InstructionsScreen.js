import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function InstructionsScreen() {
  return (
    <View style={{ gap: 5 }}>
      <Text style={styles.creatorsText}>Classic billiard game made by:</Text>
      <Text style={styles.creatorsText}>Artem Konovalov</Text>
      <Text style={styles.creatorsText}>Maxim Vinogradov</Text>
      <Text style={styles.creatorsText}>Mikhail Kulebyakin</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  creatorsText: {
    color: "#000",
    fontSize: 14,
    textAlign: "center",
    fontWeight: "bold",
  },
});
