import React from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";

import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import * as Animatable from "react-native-animatable";

const CustomSidebarMenu = (props) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/*Top Large Image */}
      <Animatable.Image
        animation="bounceIn"
        duraton={2000}
        source={require("./assets/t.png")}
        style={styles.sideMenuProfileIcon}
        resizeMode="stretch"
      />
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <Text style={{ fontSize: 16, textAlign: "center", color: "grey" }}>
        Taxi Cab
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    resizeMode: "center",
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    alignSelf: "center",
  },
  iconStyle: {
    width: 15,
    height: 15,
    marginHorizontal: 5,
  },
  customItem: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default CustomSidebarMenu;
