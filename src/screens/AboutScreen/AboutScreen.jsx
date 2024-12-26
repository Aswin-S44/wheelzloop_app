import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const AboutScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome to WheelzLoop</Text>
      </View>
      <Image
        source={{
          uri: "https://cdn.pixabay.com/photo/2024/09/08/08/52/car-9031576_1280.png",
        }}
        style={styles.image}
      />
      <Text style={styles.paragraph}>
        Your trusted platform for buying and selling used cars in Kerala. We
        provide an easy and reliable way for car buyers and sellers to connect
        directly with dealers and individuals, ensuring a seamless car buying
        experience.
      </Text>
      <Text style={styles.paragraph}>
        At WheelzLoop, we believe in making the process of buying and selling
        used cars as transparent and efficient as possible. Whether you're
        looking for your next vehicle or looking to sell your car, we offer a
        range of services to help you make informed decisions.
      </Text>
      <Text style={styles.paragraph}>
        Our platform connects car buyers with trusted dealers in Kerala, giving
        you the opportunity to browse a wide selection of vehicles, from
        affordable cars to premium options, all in one place. Our easy-to-use
        interface makes the buying and selling process simple and stress-free.
      </Text>
      <Text style={styles.paragraph}>
        Join the WheelzLoop community today and take the first step towards
        finding the perfect car or selling your vehicle with confidence!
      </Text>
    </ScrollView>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#006600",
    marginTop: 10,
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: 300,
    maxHeight: 400,
    borderRadius: 10,
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 16,
    color: "#333",
    lineHeight: 24,
    marginBottom: 10,
  },
});
