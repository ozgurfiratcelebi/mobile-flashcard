import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { white, gray } from "../../utils/color";

export default function DeckItem({ id, name, cardCount, navigation }) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate("DeckDetail", { deckId: id, name: name })
      }
    >
      <Text style={styles.name}> {name} ({` ${cardCount} `} Card)</Text> 
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    justifyContent: "center",
    alignItems: "flex-start"
  },
  name: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    padding: 10,
    marginBottom: 5
  }, 
  actions: {
    marginTop: 20
  }
});
