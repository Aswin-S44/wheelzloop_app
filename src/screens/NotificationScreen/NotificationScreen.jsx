import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const notifications = [
  {
    id: "1",
    message: "New Car Added: Honda Civic",
    image: "https://link-to-car-image.com/honda-civic.jpg",
    timestamp: "2 minutes ago",
  },
  {
    id: "2",
    message: "New Car Added: Suzuki Alto",
    image: "https://link-to-car-image.com/suzuki-alto.jpg",
    timestamp: "5 minutes ago",
  },
  {
    id: "3",
    message: "Price Drop: Maruti Swift",
    image: "https://link-to-car-image.com/maruti-swift.jpg",
    timestamp: "1 hour ago",
  },
  {
    id: "4",
    message: "New Car Added: BMW 3 Series",
    image: "https://link-to-car-image.com/bmw-3-series.jpg",
    timestamp: "2 hours ago",
  },
  {
    id: "5",
    message: "Car Sold: Toyota Corolla",
    image: "https://link-to-car-image.com/toyota-corolla.jpg",
    timestamp: "5 hours ago",
  },
];

const NotificationScreen = () => {
  const renderNotification = ({ item }) => (
    <TouchableOpacity style={styles.notificationItem}>
      <View style={styles.imageWrapper}>
        <Image
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVkC7OfYK_4UMThwxRC1eWFfijmb9QNEJKwA&s",
          }}
          style={styles.carImage}
        />
      </View>
      <View style={styles.notificationContent}>
        <Text style={styles.notificationMessage}>{item.message}</Text>
        <Text style={styles.timestamp}>{item.timestamp}</Text>
      </View>
      <TouchableOpacity>
        <Text
          style={{
            color: "green",
            fontFamily: "sans-serif",
            fontWeight: "500",
          }}
        >
          Read
        </Text>
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
          Notifications (20)
        </Text>
      </View>
      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.notificationList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 27,
    fontWeight: "700",
    color: "#333",
    marginBottom: 20,
    textAlign: "left",
    fontFamily: "sans-serif",
    fontWeight: "500",
  },
  notificationList: {
    paddingBottom: 20,
  },
  notificationItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 15,
    padding: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  imageWrapper: {
    borderRadius: 12,
    overflow: "hidden",
    marginRight: 15,
  },
  carImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationMessage: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5,
  },
  timestamp: {
    fontSize: 12,
    color: "#888",
  },
  arrowIcon: {
    marginLeft: 10,
    color: "#0078D4",
  },
});

export default NotificationScreen;
