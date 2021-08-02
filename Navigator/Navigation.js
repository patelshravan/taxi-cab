import React from "react";

import Login from "./../Screens/Login";
import Signup from "./../Screens/Signup";
import Welcome from "./../Screens/Welcome";
import AllRides from "../Screens/AllRides";
import Profile from "../Screens/Profile";
import AddRide from "../Screens/AddRide";
import SplashScreen from "../Screens/SplashScreen";
import EditProfileScreen from "../Screens/EditScreen";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: 'transparent',
        },
        headerTransparent: true,
        headerTitle: '',
      }
    }
      >
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="AddRide" component={AddRide} />
        <Stack.Screen name="AllRides" component={AllRides} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
