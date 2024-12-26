import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { dummyCars } from "../../data";

const FavouriteScreen = () => {
  const [count, setCount] = useState(10);
  const renderCarItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.images[0] }} style={styles.carImage} />
      <View style={styles.carDetails}>
        <Text style={styles.carName}>{item.name}</Text>
        <Text style={styles.carInfo}>Year: {item.year}</Text>
        <Text style={styles.carInfo}>Brand: {item.brand}</Text>
        <Text style={styles.carInfo}>Mileage: {item.mileage} km/l</Text>
        <Text style={styles.carInfo}>Price: ₹{item.rate}</Text>
      </View>
      <TouchableOpacity style={styles.favoriteIcon}>
        <Ionicons name="heart" size={30} color={item.isSold ? "gray" : "red"} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "500",
            marginLeft: 14,
            marginBottom: 10,
          }}
        >
          Favourites ({count})
        </Text>
      </View>
      <FlatList
        data={dummyCars}
        renderItem={renderCarItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    paddingTop: 10,
  },
  flatListContainer: {
    paddingHorizontal: 15,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 15,
    marginBottom: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    padding: 10,
    position: "relative", // This allows absolute positioning of the heart icon
  },
  carImage: {
    width: 120,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  carDetails: {
    flex: 1,
    justifyContent: "space-between",
  },
  carName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  carInfo: {
    fontSize: 14,
    color: "#555",
    marginVertical: 2,
  },
  favoriteIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});

export default FavouriteScreen;
