import React, { Component } from "react";
import firebase from 'firebase';
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import DrawerNavigator from "./src/navigation/DrawerNavigator";
import firebaseConfig from "./src/utils/firebaseConfig";
import { ImageBackground, Text, StyleSheet, View, SafeAreaView } from "react-native";


if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const image = { uri: "https://reactjs.org/logo-og.png" };

const App = () => {
  return (
    <SafeAreaProvider >
      <NavigationContainer>

          <DrawerNavigator />

      </NavigationContainer>
    </SafeAreaProvider>

  );


};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  text: {
    color: "white",
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000a0"
  }
});


export default App;