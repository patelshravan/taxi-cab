import React, { useState } from "react";

import {
  Platform,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  StatusBar,
  Alert,
  ScrollView,
} from "react-native";
import * as Animatable from "react-native-animatable";
import Feather from "react-native-vector-icons/Feather";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNPickerSelect from "react-native-picker-select";
import DateTimePickerModal from "react-native-modal-datetime-picker";

function tConv24(time24) {
  var ts = time24;
  var H = +ts.substr(0, 2);
  var h = H % 12 || 12;
  h = h < 10 ? "0" + h : h; // leading 0 at the left for 1 digit hours
  var ampm = H < 12 ? " AM" : " PM";
  ts = h + ts.substr(2, 3) + ampm;
  return ts;
}

const AddRide = ({ navigation }) => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [pricePerSeat, setPricePerSeat] = useState("");
  const [noOfSeatVacant, setNoOfSeatVacant] = useState(1);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [rideDate, setRideDate] = useState("");
  const [rideTime, setRideTime] = useState("");
  const [comment, setComment] = useState("");
  const [authToken, setAuthToken] = useState("");

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };
  const handleDateConfirm = (date) => {
    setRideDate(date);
    hideDatePicker();
  };
  const handleTimeConfirm = (time) => {
    setRideTime(time);
    hideTimePicker();
  };

  const handleSubmitClick = (event) => {
    event.preventDefault();
    AsyncStorage.getItem("token").then((value) => {
      setAuthToken(value);
      fetch("http://192.168.43.169:5000/api/v1/ride/add", {
        method: "POST",
        cache: "no-cache",
        headers: {
          Authorization: `Bearer ${value}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: 12345,
          from: from,
          to: to,
          vacant_seats: noOfSeatVacant,
          fare: pricePerSeat,
          date: rideDate,
          time: rideTime,
          comment: comment,
        }),
      })
        .then(function (response) {
          if (response.status === 200) {
            Alert.alert("Ride Added Successfully.");
            navigation.navigate("AllRides");
          } else {
            return response.json();
          }
        })
        .then(function (data) {
          if (data) {
            Alert.alert(data.message);
          }
        })
        .catch(function (error) {
          console.warn("SEE", error);
          Alert.alert("Something went wrong.");
        });
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <StatusBar backgroundColor="#009387" barStyle="light-content" />
        <View style={styles.header}>
          <Animatable.Text animation="bounceIn" style={[styles.text_header]}>
            Add a ride!
          </Animatable.Text>
          <Feather
            style={{ alignSelf: "center", marginBottom: 12 }}
            name="plus-circle"
            color="#fff"
            size={35}
          />

          {/* FROM */}
          <Animatable.View animation="fadeInUpBig" style={styles.footer}>
            <Text
              style={[styles.text_footer, { fontSize: 20, fontWeight: "bold" }]}
            >
              From:
            </Text>
            <View style={styles.action}>
              <Feather name="map-pin" color="#05375a" size={18} />
              <TextInput
                placeholder="Enter Your Pickup Location!"
                style={styles.textInput}
                onChangeText={(from) => setFrom(from)}
              />
            </View>

            {/* FROM END */}

            {/* TO */}

            <Text
              style={[
                styles.text_footer,
                { fontSize: 20, fontWeight: "bold", marginTop: 20 },
              ]}
            >
              To:
            </Text>
            <View style={styles.action}>
              <Feather name="map-pin" color="#05375a" size={18} />
              <TextInput
                placeholder="Enter Your Destination!"
                style={styles.textInput}
                onChangeText={(to) => setTo(to)}
              />
            </View>
            {/* TO END */}

            {/* SEAT */}

            <View>
              <Text
                style={[
                  styles.text_footer,
                  {
                    fontSize: 20,
                    fontWeight: "bold",
                    marginTop: 20,
                    marginBottom: 10,
                  },
                ]}
              >
                Vacant Seats:
              </Text>
              <RNPickerSelect
                placeholder={{}}
                value={noOfSeatVacant}
                onValueChange={(value) => setNoOfSeatVacant(value)}
                items={[
                  { label: "1", value: "1" },
                  { label: "2", value: "2" },
                  { label: "3", value: "3" },
                  { label: "4", value: "4" },
                ]}
              />
            </View>
            {/* SEAT END */}

            {/* PRICE */}

            <Text
              style={[
                styles.text_footer,
                {
                  fontSize: 20,
                  fontWeight: "bold",
                  marginTop: 20,
                  marginBottom: 10,
                },
              ]}
            >
              Price Per Seats:
            </Text>
            <View style={styles.action}>
              <Text style={{ fontSize: 20 }}>{"\u20B9"}</Text>
              <TextInput
                placeholder="Enter Price!"
                style={styles.textInput}
                keyboardType="number-pad"
                maxLength={10}
                onChangeText={(pricePerSeat) => setPricePerSeat(pricePerSeat)}
              />
            </View>
            {/* PRICE END */}

            {/* DATE */}

            <View style={styles.textInput}>
              <TouchableOpacity onPress={showDatePicker} style={styles.logout}>
                <Text
                  style={[
                    styles.textSign,
                    {
                      color: "black",
                      fontWeight: "bold",
                    },
                  ]}
                >
                  Select Date!
                </Text>
                <DateTimePickerModal
                  // style={Styles.DD}
                  isVisible={isDatePickerVisible}
                  mode="date"
                  onConfirm={handleDateConfirm}
                  onCancel={hideDatePicker}
                />
              </TouchableOpacity>
              <View style={{ flexDirection: "row", alignSelf: "center" }}>
                <Text style={{ marginTop: 15, marginRight: 10 }}>
                  <Feather name="calendar" color="#05375a" size={18} />
                </Text>
                <Text style={styles.Date}>
                  {rideDate ? rideDate.toLocaleString() : ""}
                </Text>
              </View>
            </View>
            {/* DATE END */}

            {/* TIME */}

            <View style={styles.textInput}>
              <TouchableOpacity onPress={showTimePicker} style={styles.logout}>
                <Text
                  style={[
                    styles.textSign,
                    {
                      color: "black",
                      fontWeight: "bold",
                    },
                  ]}
                >
                  Select Time!
                </Text>
                <DateTimePickerModal
                  isVisible={isTimePickerVisible}
                  mode="time"
                  onConfirm={handleTimeConfirm}
                  onCancel={hideTimePicker}
                />
              </TouchableOpacity>
              <View style={{ flexDirection: "row", alignSelf: "center" }}>
                <Text style={{ marginTop: 15, marginRight: 10 }}>
                  <Feather name="clock" color="#05375a" size={18} />
                </Text>
                <Text style={styles.Time}>
                  {rideTime ? tConv24(rideTime.toLocaleTimeString()) : ""}
                </Text>
              </View>
            </View>
            {/* TIME END */}

            {/* COMMENT */}

            <Text
              style={[
                styles.text_footer,
                {
                  fontSize: 20,
                  fontWeight: "bold",
                  marginTop: 20,
                  marginBottom: 10,
                },
              ]}
            >
              Any Comment:
            </Text>
            <View style={styles.action}>
              <Feather name="message-square" color="#05375a" size={18} />
              <TextInput
                placeholder="Write Something!"
                style={styles.textInput}
                maxLength={100}
                multiline={true}
                onChangeText={(comment) => setComment(comment)}
              />
            </View>
            {/* COMMENT END */}

            {/* SUBMIT BUTTON */}

            <TouchableOpacity onPress={handleSubmitClick} style={styles.submit}>
              <Text
                style={[
                  styles.textSign,
                  {
                    color: "black",
                    fontWeight: "bold",
                  },
                ]}
              >
                SUBMIT
              </Text>
            </TouchableOpacity>
          </Animatable.View>
        </View>
      </ScrollView>
    </View>
  );
};

export default AddRide;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#009387",
  },
  Date: {
    alignSelf: "center",
    marginTop: 15,
    borderBottomColor: "#fff",
    borderBottomWidth: 1,
  },
  Time: {
    alignSelf: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
    marginTop: 15,
  },
  header: {
    alignSelf: "stretch",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 50,
  },
  submit: {
    width: "50%",
    backgroundColor: "#b0e0e6",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginTop: 50,
    height: 50,
    padding: 25,
  },
  logout: {
    padding: 25,
    width: "50%",
    backgroundColor: "#b0e0e6",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginTop: 10,
    height: 10,
    flexDirection: "row",
  },
  footer: {
    flex: 3,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: "#fff",
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 25,
    marginBottom: 20,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    marginTop: Platform.OS === "android" ? 0 : -12,
    color: "#05375a",
    fontSize: 15,
    marginLeft: 10,
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  signIn: {
    width: "80%",
    marginBottom: 10,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
