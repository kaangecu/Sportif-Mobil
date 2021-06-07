import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity, Alert, Image, StyleSheet } from "react-native";

import Home from "../screens/Home";
import News from "../screens/News";

import Login from "../screens/Login";
import Register from "../screens/Register";

import User from "../screens/User";
import QrCode from "../screens/QrCode";

import Logo from "../components/Logo";

const Stack = createStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home"
      screenOptions={({navigation})=>(stackScreenOptions(navigation)) }>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="News" component={News} />
    </Stack.Navigator>
  );
};

const LoginStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login"
      screenOptions={({navigation})=>(stackScreenOptions(navigation))}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  )
};

const UserStackNavigator = () => {
  return (
    <Stack.Navigator 
      screenOptions={({navigation})=>(stackScreenOptions(navigation))}>
      <Stack.Screen name="User" component={User} />
    </Stack.Navigator>
  )
};

const QrCodeStackNavigator = () => {
  return (
    <Stack.Navigator 
      screenOptions={({navigation})=>(stackScreenOptions(navigation))}>
      <Stack.Screen name="QrCode" component={QrCode} />
    </Stack.Navigator>
  )
};


const stackScreenOptions=(navigation)=>{
  return {
    headerStyle: {
      backgroundColor: "#9AC4F8",
    },
    headerTintColor: "white",
    headerBackTitle: "Geri",
    headerRight:() => {
      return (
        <Logo onPress={() => navigation.toggleDrawer()}/>       
      );
    },
  }
}

const options = (header) => {

  return {
    title: header,
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }
}

export { HomeStackNavigator , LoginStackNavigator , UserStackNavigator , QrCodeStackNavigator };