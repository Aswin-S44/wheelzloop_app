import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  Modal,
  Pressable,
} from "react-native";
import axios from "axios";
import Ionicons from "react-native-vector-icons/Ionicons";
import { BACKEND_URL } from "../../constants/url";
import BannerCarousel from "../../components/Banner/Banner";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFavorites } from "../../context/FavoritesContext";

const HomeScreen = ({ navigation }) => {
  const [cars, setCars] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedTab, setSelectedTab] = useState("All");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  // const [favorites, setFavorites] = useState([]);
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const fetchCars = async (newPage = 1) => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const res = await axios.get(`${BACKEND_URL}/api/v1/customer/cars/all`, {
        params: { page: newPage, limit: 10, name: searchQuery },
      });
      const newCars = res.data.cars;
      setCars((prevCars) =>
        newPage === 1 ? newCars : [...prevCars, ...newCars]
      );
      setHasMore(newCars.length > 0);
      setPage(newPage);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const loadFavorites = async () => {
    try {
      const existingFavorites = await AsyncStorage.getItem("favorites");
      // setFavorites(existingFavorites ? JSON.parse(existingFavorites) : []);
    } catch (error) {
      console.error("Error loading favorites:", error);
    }
  };

  useEffect(() => {
    fetchCars(1);
    loadFavorites();
  }, [searchQuery]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleTabPress = (tab) => {
    setSelectedTab(tab);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={{
        flex: 1,
        margin: 10,
        backgroundColor: "#fff",
        borderRadius: 10,
        elevation: 3,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        overflow: "hidden",
      }}
      onPress={() => navigation.navigate("Details", { car: item })}
    >
      <TouchableOpacity
        style={{ margin: 5 }}
        // onPress={() => handleFavoriteToggle(item)}
        onPress={() =>
          favorites.includes(item._id)
            ? removeFavorite(item)
            : addFavorite(item)
        }
      >
        <AntDesign
          name="heart"
          size={18}
          color={favorites.includes(item._id) ? "rgb(222, 49, 99)" : "#ccc"}
        />
      </TouchableOpacity>
      <Image
        source={{ uri: item.images[0] }}
        style={{ width: "100%", height: 120 }}
        resizeMode="contain"
      />
      <View style={{ padding: 10 }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            color: "#4e8178",
            marginBottom: 5,
          }}
        >
          {item.name}
        </Text>
        <Text>
          {item?.fuelType} | {item?.transmission} | {item?.year}
        </Text>
        <Text style={{ fontSize: 14, color: "#666" }}>{item.place}</Text>
        <Text
          style={{
            fontSize: 16,
            color: "rgb(222, 49, 99)",
            fontWeight: "bold",
            marginTop: 5,
          }}
        >
          ₹{item.rate.toLocaleString()}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", padding: 10 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#fff",
          padding: 10,
          borderRadius: 8,
          elevation: 2,
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: 1 },
        }}
      >
        <TextInput
          value={searchQuery}
          onChangeText={handleSearch}
          placeholder="Search cars..."
          style={{
            flex: 1,
            paddingHorizontal: 10,
            fontSize: 16,
            color: "#333",
            padding: 6,
          }}
        />
        <TouchableOpacity onPress={() => setFilterModalVisible(true)}>
          <Ionicons name="filter" size={24} color="rgb(222, 49, 99)" />
        </TouchableOpacity>
      </View>
      <View>
        <BannerCarousel />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginVertical: 10,
        }}
      >
        {["All", "XUV", "Sedan", "Hatchback"].map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => handleTabPress(tab)}
            style={{
              paddingVertical: 8,
              paddingHorizontal: 16,
              backgroundColor:
                selectedTab === tab ? "rgb(222, 49, 99)" : "#f0f0f0",
              borderRadius: 20,
            }}
          >
            <Text
              style={{
                color: selectedTab === tab ? "#fff" : "#333",
                fontSize: 14,
              }}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={cars}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        numColumns={2}
        contentContainerStyle={{ paddingBottom: 20 }}
        onEndReached={() => fetchCars(page + 1)}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading && (
            <Text style={{ textAlign: "center", marginVertical: 10 }}>
              Loading...
            </Text>
          )
        }
      />
      <Modal
        visible={isFilterModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setFilterModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              padding: 20,
            }}
          >
            <Text
              style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}
            >
              Filters
            </Text>
            <Pressable
              style={{
                padding: 15,
                backgroundColor: "rgb(222, 49, 99)",
                borderRadius: 8,
                alignItems: "center",
                marginTop: 10,
              }}
              onPress={() => setFilterModalVisible(false)}
            >
              <Text style={{ color: "#fff", fontSize: 16 }}>Apply Filters</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default HomeScreen;
