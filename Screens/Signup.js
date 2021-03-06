import React, { useState } from "react";
import {
  Platform,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  StatusBar,
  ScrollView,
  Alert,
} from "react-native";
import * as Animatable from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const Signup = ({ navigation }) => {
  const [data, setData] = useState({
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    checkTextInputChange: false,
    checkTextInputMobileChange: false,
    secureTextEntry: true,
    confirmSecureTextEntry: false,
  });
  const textInputChange = (value) => {
    if (value.length != 0) {
      setData({
        ...data,
        email: value,
        checkTextInputChange: true,
      });
    } else {
      setData({
        ...data,
        email: value,
        checkTextInputChange: false,
      });
    }
  };
  const textInputMobileChange = (value) => {
    if (value.length != 0) {
      setData({
        ...data,
        mobile: value,
        checkTextInputMobileChange: true,
      });
    } else {
      setData({
        ...data,
        mobile: value,
        checkTextInputMobileChange: false,
      });
    }
  };

  const handlePasswordChange = (value) => {
    setData({
      ...data,
      password: value,
    });
  };

  const handleConfirmPasswordChange = (value) => {
    setData({
      ...data,
      confirmPassword: value,
    });
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const updateConfirmSecureTextEntry = () => {
    setData({
      ...data,
      confirmSecureTextEntry: !data.confirmSecureTextEntry,
    });
  };

  const handleSignupClick = (event) => {
    console.log(data, "data");
    event.preventDefault();
    AsyncStorage.getItem("token").then((value) => {
      axios({
        url: "http://192.168.43.169:5000/api/v1/auth/register",
        method: "POST",
        cache: "no-cache",
        headers: {
          Authorization: `Bearer ${value}`,
          "Content-Type": "application/json",
        },
        data: {
          name: data.email,
          email: data.email,
          password: data.password,
          confirmPassword: data.confirmPassword,
          mobile: data.mobile,
        },
      })
        .then(function (response) {
          console.log(response, "response");
          if (response.status === 200) {
            navigation.navigate("Welcome");
          } else {
            return response;
          }
        })
        .catch(function (error) {
          console.log(error, "error");
          {
            console.error(error);
            Alert.alert("Something went wrong.");
          }
        });
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Register Now!</Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          {/* EMAIL */}

          <Text style={styles.text_footer}>Email</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#05375a" size={20} />
            <TextInput
              placeholder="Your Email"
              style={styles.textInput}
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={(value) => textInputChange(value)}
            />
            {data.checkTextInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>

          {/* EMAIL END */}

          {/* MOBILE */}

          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 35,
              },
            ]}
          >
            Mobile
          </Text>
          <View style={styles.action}>
            <Feather name="phone" color="#05375a" size={20} />
            <TextInput
              placeholder="Your Mobile"
              style={styles.textInput}
              autoCapitalize="none"
              keyboardType="number-pad"
              onChangeText={(value) => textInputMobileChange(value)}
            />
            {data.checkTextInputMobileChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>

          {/* MOBILE END */}

          {/* PASSWORD */}

          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 35,
              },
            ]}
          >
            Password
          </Text>
          <View style={styles.action}>
            <Feather name="lock" color="#05375a" size={20} />
            <TextInput
              placeholder="Your Password"
              secureTextEntry={data.secureTextEntry ? true : false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(value) => handlePasswordChange(value)}
            />
            <TouchableOpacity onPress={updateSecureTextEntry}>
              {data.secureTextEntry ? (
                <Feather name="eye-off" color="grey" size={20} />
              ) : (
                <Feather name="eye" color="grey" size={20} />
              )}
            </TouchableOpacity>
          </View>

          {/* PASSWORD END */}

          {/* CONFIRM PASSWORD */}

          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 35,
              },
            ]}
          >
            Confirm Password
          </Text>
          <View style={styles.action}>
            <Feather name="lock" color="#05375a" size={20} />
            <TextInput
              placeholder="Confirm Your Password"
              secureTextEntry={data.confirmSecureTextEntry ? true : false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(value) => handleConfirmPasswordChange(value)}
            />
            <TouchableOpacity onPress={updateConfirmSecureTextEntry}>
              {data.secureTextEntry ? (
                <Feather name="eye-off" color="grey" size={20} />
              ) : (
                <Feather name="eye" color="grey" size={20} />
              )}
            </TouchableOpacity>
          </View>

          {/* CONFIRM PASSWORD END */}

          <View style={styles.button}>
            <TouchableOpacity onPress={handleSignupClick} style={styles.signUp}>
              <Text
                style={[
                  styles.textSign,
                  {
                    color: "#fff",
                    fontWeight: "bold",
                  },
                ]}
              >
                Sign Up
              </Text>
            </TouchableOpacity>
            <Text style={{ marginTop: 10, fontWeight: "bold", fontSize: 15 }}>
              Already have an account?
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Login")}
              style={[
                styles.login,
                {
                  borderColor: "#009387",
                  borderWidth: 1,
                  marginTop: 15,
                },
              ]}
            >
              <Text
                style={[
                  styles.textSign,
                  {
                    color: "#009387",
                  },
                ]}
              >
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animatable.View>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#009387",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 5,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
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
    paddingLeft: 10,
    color: "#05375a",
    flex: 1,
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  signUp: {
    width: "100%",
    backgroundColor: "#01ab9d",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  login: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 19,
    fontWeight: "bold",
  },
});
