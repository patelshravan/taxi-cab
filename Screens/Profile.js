import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Share,
} from "react-native";
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = ({ navigation }) => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [reload, setReload] = useState(true);
  const [authToken, setAuthToken] = useState(1);

  const fetchProfileAndUpdate = () => {
    AsyncStorage.getItem("token").then((value) => {
      if (value) {
        setAuthToken(value);
        fetch("http://192.168.43.169:5000/api/v1/user/profile", {
          method: "GET",
          cache: "no-cache",
          headers: {
            Authorization: `Bearer ${value}`,
            "Content-Type": "application/json",
          },
        })
          .then((result) => {
            return result.json();
          })
          .then((response) => {
            setEmail(response.email);
            setName(response.name);
            setMobile(response.mobile);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    });
  };

  useEffect(() => {
    fetchProfileAndUpdate();
  }, []);

  const onShare = (event) => {
    event.preventDefault();
    let text = "Hey, This is my profile!";
    if (Platform.OS === "android")
      text = text.concat("https://www.text-cab-app.com");
    else text = text.concat("https://www.text-cab-app.com");
    Share.share(
      {
        subject: "Taxi-Cab",
        titile: "Taxi Cab",
        message: text,
        url: "exp://192.168.1.57:19001",
      },
      {
        // Android
        dialogTitle: "Taxt Cab App ",
        // IOS
        excludedActivityTypes: [],
      }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("EditProfileScreen", {
              name: name,
              mobile: mobile,
              city: "Swroopganj",
            })
          }
          style={{ alignSelf: "flex-end", marginRight: 25, marginTop: 20 }}
        >
          <FontAwesome5 name="user-edit" size={25} color="black" />
        </TouchableOpacity>
        <View style={styles.header}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: "row", marginTop: 50 }}>
              <Avatar.Image
                source={{
                  uri: "",
                }}
                size={80}
              />
              <View style={{ marginLeft: 20 }}>
                <Title
                  style={[styles.title, { marginTop: 15, marginBottom: 5 }]}
                >
                  {name}
                </Title>
                <Caption style={styles.caption}>{`@${name}`}</Caption>
              </View>
            </View>
          </View>
        </View>
        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.userInfoSection}>
            <View style={styles.row}>
              <Icon name="email" color="black" size={25} />
              <Text style={{ color: "black", marginLeft: 20, fontSize: 18 }}>
                {email}
              </Text>
            </View>
            <View style={styles.row}>
              <Icon name="phone" color="black" size={25} />
              <Text style={{ color: "black", marginLeft: 20, fontSize: 18 }}>
                {mobile}
              </Text>
            </View>
            <View style={styles.row}>
              <Icon name="map-marker-radius" color="black" size={25} />
              <Text style={{ color: "black", marginLeft: 20, fontSize: 18 }}>
                Swaroopganj, Rajasthan
              </Text>
            </View>
          </View>

          <View style={styles.Line} />

          <View style={styles.menuWrapper}>
            <TouchableRipple onPress={() => navigation.navigate("AllRides")}>
              <View style={styles.menuItem}>
                <Ionicons
                  name="md-car-sport-outline"
                  color="#ff6347"
                  size={25}
                />
                <Text style={styles.menuItemText}>Your Rides</Text>
              </View>
            </TouchableRipple>
            <TouchableRipple onPress={() => navigation.navigate("AddRide")}>
              <View style={styles.menuItem}>
                <Ionicons name="add-circle-outline" color="#ff6347" size={25} />
                <Text style={styles.menuItemText}>Add More Rides</Text>
              </View>
            </TouchableRipple>
            <TouchableRipple onPress={() => {}}>
              <View style={styles.menuItem}>
                <Icon name="credit-card" color="#ff6347" size={25} />
                <Text style={styles.menuItemText}>Payments</Text>
              </View>
            </TouchableRipple>
            <TouchableRipple onPress={onShare}>
              <View style={styles.menuItem}>
                <Icon name="share-outline" color="#ff6347" size={25} />
                <Text style={styles.menuItemText}>Tell Your Friends</Text>
              </View>
            </TouchableRipple>
            <TouchableRipple onPress={() => {}}>
              <View style={styles.menuItem}>
                <Icon name="account-check-outline" color="#ff6347" size={25} />
                <Text style={styles.menuItemText}>Support</Text>
              </View>
            </TouchableRipple>
            <TouchableRipple onPress={() => navigation.navigate("Login")}>
              <View style={styles.menuItem}>
                <SimpleLineIcons name="logout" size={25} color="#ff6347" />
                <Text style={styles.menuItemText}>Logout</Text>
              </View>
            </TouchableRipple>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#009387",
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
  },
  Line: {
    alignSelf: "center",
    height: 2,
    width: 350,
    backgroundColor: "black",
    marginVertical: 20,
    marginTop: 20,
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    flexDirection: "row",
    height: 100,
  },
  infoBox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: "black",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
});
