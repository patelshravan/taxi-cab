import React, { useEffect, useState } from "react";
import { View, SafeAreaView, StyleSheet, ScrollView, Share } from "react-native";
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { SimpleLineIcons } from '@expo/vector-icons';
import { FontAwesome5 } from "@expo/vector-icons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = ({ navigation }) => {

  const [name, setName] = useState("")
  const [mobile, setMobile] = useState("")
  const [email, setEmail] = useState("")
  const [reload, setReload] = useState(true)
  const [authToken, setAuthToken] = useState(1)
  
  const fetchProfileAndUpdate = () => {
    AsyncStorage.getItem("token").then((value) => {
      if (value) {
        setAuthToken(value);
        fetch("http://192.168.1.16:5000/api/v1/user/profile", {
          method: "GET",
          cache: "no-cache",
          headers: {
            "Authorization": `Bearer ${value}`,
            "Content-Type": "application/json",
          },
        })
          .then((result) => {
            return result.json();
          })
          .then((response) => {
            setEmail(response.email)
            setName(response.name)
            setMobile(response.mobile)
          })
          .catch((error) => {
            console.error(error);
          });
      }
    });
  }

  useEffect(() => {
    fetchProfileAndUpdate()
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
          onPress={() => navigation.navigate("EditProfileScreen", {
            name: name,
            mobile: mobile,
            city: "Swroopganj"
          })}
          style={{ alignSelf: "flex-end", marginRight: 25, marginTop: 20 }}
        >
          <FontAwesome5 name="user-edit" size={25} color="black" />
        </TouchableOpacity>
        <View style={styles.header}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: "row", marginTop: 50 }}>
              <Avatar.Image
                source={{
                  uri: "data:image/jpeg;base64,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",
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
