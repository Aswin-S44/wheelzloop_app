import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
} from "react-native";

const { width } = Dimensions.get("window");

const banners = [
  "Best Price!",
  "Wide selection of Cars",
  "Find your car today",
  "Quality Cars",
];

const BannerCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.carousel}
      >
        {banners.map((banner, index) => (
          <View key={index} style={styles.bannerItem}>
            <Image
              source={{
                uri: "https://cdn.pixabay.com/photo/2015/10/01/19/05/car-967470_640.png",
              }}
              style={styles.image}
              resizeMode="contain"
            />
            <Text style={styles.bannerText}>{banner}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 160,
    backgroundColor: "#4e8178",
    justifyContent: "center",
    borderRadius: 20,
    marginTop: 15,
  },
  carousel: {
    flexDirection: "row",
  },
  bannerItem: {
    width: width - 40,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  image: {
    width: "100%",
    height: 120,
    marginBottom: 0,
    marginTop: 20,
  },
  bannerText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
    fontFamily: "sans-serif",
  },
});

export default BannerCarousel;
