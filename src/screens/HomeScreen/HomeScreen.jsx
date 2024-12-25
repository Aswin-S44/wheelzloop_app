import { View, Text } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const HomeScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ color: "#006600", fontSize: 40 }}>Home Screen!</Text>
      <Ionicons name="md-home" size={80} color="#006600" />
    </View>
  );
};

export default HomeScreen;
