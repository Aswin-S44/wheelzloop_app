import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { dummyCars } from "../../data";
import BannerCarousel from "../../components/Banner/Banner";

const Cars = () => {
  const [cars, setCars] = useState(dummyCars);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCars, setFilteredCars] = useState(dummyCars);
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedTab, setSelectedTab] = useState("All");

  const handleSearch = (query) => {
    setSearchQuery(query);
    filterCars(selectedTab, query);
  };

  const filterCars = (tab, query) => {
    let filtered = dummyCars;
    if (tab !== "All") {
      filtered = filtered.filter((car) => car.type === tab.toLowerCase());
    }
    if (query) {
      filtered = filtered.filter((car) =>
        car.name.toLowerCase().includes(query.toLowerCase())
      );
    }
    setFilteredCars(filtered);
  };

  const handleTabPress = (tab) => {
    setSelectedTab(tab);
    filterCars(tab, searchQuery);
  };

  const [filters, setFilters] = useState({});
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    console.log(newFilters);
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
      <Image
        source={{ uri: item.images[0] }}
        style={{
          width: "100%",
          height: 120,
        }}
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
        data={filteredCars}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        numColumns={2}
        contentContainerStyle={{ paddingBottom: 20 }}
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
              style={{
                fontSize: 18,
                fontWeight: "bold",
                marginBottom: 10,
              }}
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

export default Cars;
