import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Entypo, AntDesign, Ionicons } from "@expo/vector-icons";
import SearchScreen from "./src/screens/SearchScreen/SearchScreen";
import NotificationScreen from "./src/screens/NotificationScreen/NotificationScreen";
import Cars from "./src/screens/Cars/Cars";
import HomeScreen from "./src/screens/HomeScreen/HomeScreen";
import AboutScreen from "./src/screens/AboutScreen/AboutScreen";
import DetailsScreen from "./src/screens/DetailsScreen/DetailsScreen";
import FavouriteScreen from "./src/screens/FavouriteScreen/FavouriteScreen";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Feather from "@expo/vector-icons/Feather";

const Tab = createMaterialBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const NotificationIcon = ({ navigation }) => (
  <TouchableOpacity
    style={{ marginRight: 15 }}
    onPress={() => navigation.navigate("Notification")}
  >
    <Ionicons name="notifications" size={24} color="rgb(222, 49, 99)" />
  </TouchableOpacity>
);

const SearchIcon = ({ navigation }) => (
  <TouchableOpacity
    style={{ marginRight: 15 }}
    onPress={() => {
      // search functionaality
    }}
  >
    <Feather name="search" size={24} color="rgb(222, 49, 99)" />
  </TouchableOpacity>
);

function TabNavigator({ navigation }) {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="rgb(222, 49, 99)"
      inactiveColor="grey"
      barStyle={{ backgroundColor: "#fff" }}
      screenOptions={{
        headerRight: () => <SearchIcon navigation={navigation} />,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <Entypo name="home" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Favourites"
        component={FavouriteScreen}
        options={{
          tabBarLabel: "Favourites",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="favorite-border" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={Cars}
        options={{
          tabBarLabel: "Explore",
          tabBarIcon: ({ color }) => (
            <AntDesign name="car" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          tabBarLabel: "Notification",
          tabBarIcon: ({ color }) => (
            <Ionicons name="notifications" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props} style={styles.drawerContent}>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Stack"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={({ navigation }) => ({
        headerRight: () => <SearchIcon navigation={navigation} />,
        drawerStyle: styles.drawer,
        drawerLabelStyle: styles.drawerLabel,
        drawerActiveTintColor: "rgb(222, 49, 99)",
        drawerInactiveTintColor: "grey",
      })}
    >
      <Drawer.Screen
        name="Stack"
        component={StackNavigator}
        options={{ title: "Home" }}
      />
      <Drawer.Screen name="About" component={AboutScreen} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  drawer: {
    backgroundColor: "#f8f9fa",
    width: "80%",
  },
  drawerLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  drawerContent: {
    paddingVertical: 10,
  },
});
