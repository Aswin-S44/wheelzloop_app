import { View, Text, Image } from "react-native";
import React from "react";

const EmptyScreen = () => {
  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={{
          uri: "https://cdni.iconscout.com/illustration/premium/thumb/young-boy-pointing-at-blank-paper-on-monitor-screen-illustration-download-in-svg-png-gif-file-formats--analytics-logo-find-data-search-no-results-pack-miscellaneous-illustrations-8881963.png?f=webp",
        }}
        style={{ width: "75%", height: 250 }}
      />
      <Text style={{ fontSize: 25 }}>No Favourites</Text>
    </View>
  );
};

export default EmptyScreen;
