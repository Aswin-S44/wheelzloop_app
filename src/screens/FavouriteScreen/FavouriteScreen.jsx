import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BACKEND_URL } from "../../constants/url";
import EmptyScreen from "../EmptyScreen/EmptyScreen";
import { useFavorites } from "../../context/FavoritesContext";

const FavouriteScreen = ({ navigation }) => {
  // const [favorites, setFavorites] = useState([]);
  const { favorites, count } = useFavorites();
  // const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [favCars, setFavCars] = useState([]);
  const { addFavorite, removeFavorite } = useFavorites();

  const fetchSavedCars = async () => {
    try {
      setLoading(true);
      const favCars = await AsyncStorage.getItem("favorites");
      const parsedFavorites = favCars ? JSON.parse(favCars) : [];
      let { data } = await axios.post(`${BACKEND_URL}/api/v1/user/cars/saved`, {
        savedIds: favorites,
      });

      if (data && data.cars && data.cars.length > 0) {
        setLoading(false);
        setFavCars(data.cars);
        setCount(data.cars.length);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const toggleFavorite = async (car) => {
    try {
      let updatedFavorites = [...favorites];
      const carIndex = updatedFavorites.findIndex((fav) => fav._id === car._id);

      if (carIndex >= 0) {
        updatedFavorites.splice(carIndex, 1);
      } else {
        updatedFavorites.push(car);
      }

      setFavCars(updatedFavorites);
      // setCount(updatedFavorites.length);

      await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error("Error updating favorites:", error);
    }
  };

  useEffect(() => {
    fetchSavedCars();
  }, [favorites]);

  const renderCarItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("Details", { car: item })}
    >
      {item && item.images && item.images.length > 0 && (
        <Image source={{ uri: item?.images[0] }} style={styles.carImage} />
      )}
      <View style={styles.carDetails}>
        {console.log("favorites----------", item ? item : "no favorites")}
        <Text style={styles.carName}>{item.name}</Text>
        <Text style={styles.carInfo}>Year: {item.year}</Text>
        <Text style={styles.carInfo}>Brand: {item.brand}</Text>
        <Text style={styles.carInfo}>Mileage: {item.mileage} km/l</Text>
        <Text style={styles.carInfo}>Price: ₹{item.rate}</Text>
      </View>
      <TouchableOpacity
        style={styles.favoriteIcon}
        // onPress={() => toggleFavorite(item)}
        onPress={() =>
          favorites.includes(item._id)
            ? removeFavorite(item)
            : addFavorite(item)
        }
      >
        <Ionicons name="heart" size={30} color={"red"} />
      </TouchableOpacity>
    </TouchableOpacity>
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
      {loading ? (
        <Text
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Loading....
        </Text>
      ) : favorites?.length > 0 ? (
        <FlatList
          data={favCars}
          renderItem={renderCarItem}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.flatListContainer}
        />
      ) : (
        <View>
          <EmptyScreen />
        </View>
      )}
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
    position: "relative",
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
