import React from "react";
import { TouchableOpacity,StyleSheet, Text } from "react-native";
import { lightPurp, white, red } from "../utils/color";

export default function CustomButton({ children, onPress, style = {} }) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      <Text style={[styles.reset, style]}> {children} </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    backgroundColor: red,
    margin: 10,
    padding: 15,
    width: 250
  },
  reset: {
    textAlign: "center",
    fontSize: 17,
    fontWeight: "bold",
    color: white
  }
});
