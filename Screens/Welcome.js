import React from "react";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

function useStyles() {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#009387",
    },
    Button: {
      fontWeight: "bold",
      marginVertical: 10,
      alignSelf: "center",
      color: "black",
      alignItems: "center",
      alignContent: "center",
      padding: 8,
      borderRadius: 10,
      backgroundColor: "white",
      marginTop: 100,
    },
    image: {
      alignSelf: "center",
      height: "30%",
      width: "80%",
      marginBottom: 25,
      marginTop: 100,
      borderRadius: 20,
    },
    Line: {
      alignSelf: "center",
      height: 2,
      width: 350,
      backgroundColor: "black",
      marginVertical: 20,
      marginTop: 100,
    },
    FR: {
      padding: 25,
      width: "80%",
      backgroundColor: "white",
      alignSelf: "center",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 20,
      marginVertical: 10,
      height: 80,
      flexDirection: "row",
    },
    ButtonText: {
      color: "black",
      alignItems: "center",
      alignContent: "center",
      fontWeight: "bold",
      padding: 25,
      fontSize: 20,
    },
    logout: {
      padding: 25,
      width: "80%",
      backgroundColor: "white",
      alignSelf: "center",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 20,
      marginTop: 200,
      height: 50,
      flexDirection: "row",
    },
    textSign: {
      fontSize: 19,
      fontWeight: "bold",
    },
  });
}

const Welcome = ({ navigation }) => {
  const styles = useStyles();
  const handleLogoutClicked = () => {
    // Alert.alert("Loginout")/
    AsyncStorage.clear();
    AsyncStorage.getItem("token").then((value) => {
      if (value) {
        Alert.alert(value)
      }
    });
    navigation.navigate("Login")
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.Line} />
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("AllRides");
          }}
          style={styles.FR}
        >
          <AntDesign name="search1" size={28} color="black" />
          <Text style={styles.ButtonText}>Find Rides</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("AddRide");
          }}
          style={styles.FR}
        >
          <Ionicons name="ios-add-circle" size={28} color="black" />
          <Text style={styles.ButtonText}>Add a Ride</Text>
        </TouchableOpacity>
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Profile");
            }}
            style={[styles.FR, { marginTop: 40 }]}
          >
            <AntDesign name="profile" size={28} color="black" />
            <Text style={styles.ButtonText}>Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleLogoutClicked}
            style={styles.logout}
          >
            <Text
              style={[
                styles.textSign,
                {
                  color: "black",
                  fontWeight: "bold",
                },
              ]}
            >
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Welcome;
