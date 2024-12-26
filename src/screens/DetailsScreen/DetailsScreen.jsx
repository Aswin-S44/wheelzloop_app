import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Linking,
  Dimensions,
} from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const DetailsScreen = ({ route }) => {
  const { car } = route.params;
  const [lightboxVisible, setLightboxVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(car.images[0]);

  const openLightbox = (image) => {
    setSelectedImage(image);
    setLightboxVisible(true);
  };

  const closeLightbox = () => {
    setLightboxVisible(false);
    setSelectedImage(null);
  };

  const callSeller = () => {
    const phoneNumber = "tel:+919876543210";
    Linking.openURL(phoneNumber);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: car.images[0] }}
            style={styles.mainImage}
            resizeMode="contain"
          />
          <View style={styles.titleRow}>
            <Text style={styles.carName}>{car.name}</Text>
            <TouchableOpacity style={styles.favouriteButton}>
              <AntDesign name="hearto" size={24} color="rgb(222, 49, 99)" />
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.thumbnailScroll}
          >
            {car.images.map((image, index) => (
              <TouchableOpacity key={index} onPress={() => openLightbox(image)}>
                <Image source={{ uri: image }} style={styles.thumbnail} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <View style={styles.detailsCard}>
          <Text style={styles.carDetails}>
            {car.brand} • {car.year} • {car.bodyType}
          </Text>
          <Text style={styles.carPrice}>₹{car.rate.toLocaleString()}</Text>
          <View style={styles.sectionDivider} />
          <Text style={styles.sectionTitle}>Key Specifications</Text>
          <View style={styles.infoRow}>
            <Ionicons name="speedometer-outline" size={20} color="#555" />
            <Text style={styles.infoText}>
              {car.kilometer.toLocaleString()} km
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="car-sport-outline" size={20} color="#555" />
            <Text style={styles.infoText}>{car.transmission}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="flame-outline" size={20} color="#555" />
            <Text style={styles.infoText}>{car.fuelType}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="shield-checkmark-outline" size={20} color="#555" />
            <Text style={styles.infoText}>
              {car.underWarrenty ? "Under Warranty" : "No Warranty"}
            </Text>
          </View>
          <View style={styles.sectionDivider} />
          <Text style={styles.sectionTitle}>Additional Details</Text>
          <Text style={styles.infoText}>Variant: {car.varient}</Text>
          <Text style={styles.infoText}>Seats: {car.totalSeats}</Text>
          <Text style={styles.infoText}>Ownership: {car.ownership}</Text>
          <Text style={styles.infoText}>
            Insurance Validity: {car.insuranceValidity}
          </Text>
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.callButton} onPress={callSeller}>
        <Ionicons name="call" size={20} color="#fff" />
        <Text style={styles.callButtonText}>Call Seller</Text>
      </TouchableOpacity>
      <Modal visible={lightboxVisible} transparent={true}>
        <View style={styles.lightboxContainer}>
          <TouchableOpacity onPress={closeLightbox} style={styles.closeButton}>
            <Ionicons name="close" size={30} color="#fff" />
          </TouchableOpacity>
          <View style={styles.lightboxImageContainer}>
            <Image
              source={{ uri: selectedImage }}
              style={styles.lightboxImage}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    backgroundColor: "#fff",
    paddingBottom: 10,
  },
  mainImage: {
    width: width,
    height: width * 0.75,
  },
  thumbnailScroll: {
    marginTop: 10,
    paddingLeft: 10,
  },
  thumbnail: {
    width: 90,
    height: 60,
    borderRadius: 8,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.8)",
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 10,
  },
  carName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  favouriteButton: {
    padding: 8,
  },
  carDetails: {
    fontSize: 16,
    color: "#777",
    marginVertical: 5,
  },
  carPrice: {
    fontSize: 20,
    fontWeight: "bold",
    color: "rgb(222, 49, 99)",
    marginVertical: 10,
  },
  sectionDivider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  infoText: {
    fontSize: 14,
    color: "#555",
    marginLeft: 10,
  },
  detailsCard: {
    marginHorizontal: 15,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  callButton: {
    position: "absolute",
    bottom: 10,
    left: 20,
    right: 20,
    backgroundColor: "rgb(222, 49, 99)",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  callButtonText: {
    fontSize: 18,
    color: "#fff",
    marginLeft: 10,
  },
  lightboxContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 1,
  },
  lightboxImageContainer: {
    width: "90%",
    height: "auto",
  },
  lightboxImage: {
    width: "100%",
    height: "70%",
    borderRadius: 10,
  },
});

export default DetailsScreen;
