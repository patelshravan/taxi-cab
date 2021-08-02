import React, { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Card } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

function tConv24(time24) {
  var ts = time24;
  var H = +ts.substr(0, 2);
  var h = H % 12 || 12;
  h = h < 10 ? "0" + h : h; // leading 0 at the left for 1 digit hours
  var ampm = H < 12 ? " AM" : " PM";
  ts = h + ts.substr(2, 3) + ampm;
  return ts;
}

function useStyles() {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#009387",
    },
    header: {
      alignSelf: "stretch",
      marginLeft: 10,
      marginRight: 10,
      marginTop: 50,
    },
    footer: {
      flex: 4,
      backgroundColor: "#fff",
      borderTopLeftRadius: 30,
      borderBottomLeftRadius: 30,
      borderTopRightRadius: 30,
      borderBottomRightRadius: 30,
      paddingHorizontal: 20,
      paddingVertical: 30,
    },
    action: {
      flexDirection: "row",
      marginTop: 5,
      borderBottomWidth: 1,
      borderBottomColor: "#f2f2f2",
      paddingBottom: 5,
    },
    text_header: {
      color: "#fff",
      alignSelf: "center",
      fontWeight: "bold",
      fontSize: 25,
    },
    text_footer: {
      color: "#05375a",
      fontSize: 18,
    },
  });
}

const AllRides = ({ navigation }) => {
  const styles = useStyles();
  const [data, setData] = useState([]);
  
  const [fromSearchQuery, setFromSearchQuery] = useState("");
  const [toSearchQuery, setToSearchQuery] = useState("");
  
  const [reload, setReload] = useState(1);
  const [authToken, setAuthToken] = useState("");

  useEffect(() => {
    AsyncStorage.getItem("token").then((value) => {
      if (value) {
        setAuthToken(value);
        fetch("http://192.168.1.16:5000/api/v1/ride/list", {
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
            // console.warn(response);
            setData(response);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    });
  }, [reload]);

  const getRideCard = (ride, idx) => {
    const incomingDate = new Date(ride.date);
    const dateFormated =
      incomingDate.getDate() +
      "-" +
      parseInt(incomingDate.getMonth() + 1) +
      "-" +
      incomingDate.getFullYear();

    const incomingTime = new Date(ride.time);
    const formatedTime = tConv24(incomingTime.toLocaleTimeString());

    const cardBackgroundColor = idx % 2 == 0 ? "#fff" : "#eff";

    return (
      <Card
        id={ride._id}
        containerStyle={{ backgroundColor: cardBackgroundColor }}
      >
        <Text style={styles.text_footer}>From</Text>
        <View style={styles.action}>
          <Ionicons name="md-location-outline" size={22} color="black" />
          <Text>{ride.from}</Text>
        </View>

        <Text style={styles.text_footer}>To</Text>
        <View style={styles.action}>
          <Ionicons name="md-location-outline" size={22} color="black" />
          <Text>{ride.to}</Text>
        </View>

        <Text style={styles.text_footer}>Date</Text>
        <View style={styles.action}>
          <Ionicons name="calendar-outline" size={24} color="black" />
          <Text>{dateFormated}</Text>
        </View>

        <Text style={styles.text_footer}>Time</Text>
        <View style={styles.action}>
          <Ionicons name="time-outline" size={24} color="black" />
          <Text>{formatedTime}</Text>
        </View>

        <Text style={styles.text_footer}>Vacant Seats</Text>
        <View style={[styles.action, { alignContent: "space-between" }]}>
          <MaterialCommunityIcons name="seat-outline" size={24} color="black" />
          <Text>{ride.vacant_seats}</Text>
        </View>

        <Text style={styles.text_footer}>Fare</Text>
        <View style={styles.action}>
          <Text style={{ fontSize: 20 }}>{"\u20B9"}</Text>
          <Text>{ride.fare}</Text>
        </View>

        <Text style={styles.text_footer}>Mobile</Text>
        <View>
          <TouchableOpacity style={styles.action}>
            <MaterialIcons name="phone" size={24} color="black" />
            <Text>{ride.mobile}</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.text_footer}>Comment</Text>
        <View style={styles.action}>
          <MaterialIcons name="comment" size={22} color="black" />
          <Text>{ride.comment}</Text>
        </View>
      </Card>
    );
  };

  const filterRides = (ride) => {
    return ride.from.toLowerCase().includes(fromSearchQuery.toLowerCase())
    && ride.to.toLowerCase().includes(toSearchQuery.toLowerCase())
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text_header}>Your Rides!</Text>
        <Fontisto
          name="taxi"
          size={24}
          color="white"
          style={{ alignSelf: "center", marginBottom: 15 }}
        />
      </View>
      <View style={styles.footer}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'row'}}>
          <FontAwesome5 name="search-location" size={24} color="black" />
          <TextInput
            style={{ marginLeft: 10, borderBottomWidth: 1}}
            placeholder="From Location"
            onChangeText={(query) => setFromSearchQuery(query)}
          />
          </View>
          <View style={{flexDirection: 'row', marginRight: 10}}>
          <FontAwesome5 name="search-location" size={24} color="black" />
          <TextInput
            style={{ marginLeft: 10, borderBottomWidth: 1}}
            placeholder="To Location"
            onChangeText={(query) => setToSearchQuery(query)}
          />
          </View>

        </View>
        <Text style={{alignSelf: 'center', marginTop: 30}}>
          ----------------------------------------------------------------------------------
        </Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          {data.filter(filterRides).map((ride, idx) => getRideCard(ride, idx))}
        </ScrollView>
      </View>
    </View>
  );
};
export default AllRides;
