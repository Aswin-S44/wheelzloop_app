import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createAppContainer } from "react-navigation";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import SearchScreen from "./src/screens/SearchScreen/SearchScreen";
import NotificationScreen from "./src/screens/NotificationScreen/NotificationScreen";
import Cars from "./src/screens/Cars/Cars";
import HomeScreen from "./src/screens/HomeScreen/HomeScreen";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";

const TabNavigator = createMaterialBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarLabel: "Home",
        tabBarIcon: (tabInfo) => (
          <Entypo
            name="home"
            size={tabInfo.focused ? 26 : 20}
            color={tabInfo.focused ? "rgb(222, 49, 99)" : "grey"}
          />
        ),
      },
    },
    Search: {
      screen: SearchScreen,
      navigationOptions: {
        tabBarLabel: "Search",
        tabBarIcon: (tabInfo) => (
          <Feather
            name="search"
            size={tabInfo.focused ? 26 : 20}
            color={tabInfo.focused ? "rgb(222, 49, 99)" : "grey"}
          />
        ),
      },
    },
    Cars: {
      screen: Cars,
      navigationOptions: {
        tabBarLabel: "Explore",
        tabBarIcon: (tabInfo) => (
          <AntDesign
            name="car"
            size={tabInfo.focused ? 26 : 20}
            color={tabInfo.focused ? "rgb(222, 49, 99)" : "grey"}
          />
        ),
      },
    },
    Notification: {
      screen: NotificationScreen,
      navigationOptions: {
        tabBarLabel: "Notification",
        tabBarIcon: (tabInfo) => (
          <Ionicons
            name="notifications"
            size={tabInfo.focused ? 26 : 20}
            color={tabInfo.focused ? "rgb(222, 49, 99)" : "grey"}
          />
        ),
      },
    },
  },
  {
    initialRouteName: "Home",
    barStyle: { backgroundColor: "#fff" },
  }
);

const Navigator = createAppContainer(TabNavigator);

export default function App() {
  return (
    <Navigator>
      <HomeScreen />
    </Navigator>
  );
}
