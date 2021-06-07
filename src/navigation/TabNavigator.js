import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//import User from "../screens/User";
//import QrCode from "../screens/QrCode";
import { UserStackNavigator , QrCodeStackNavigator } from "./StackNavigator"
import User from "../screens/User";


const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        labelStyle:{
          fontSize:20,
          alignItems:'center',
          marginBottom:10,
        }
      }}
    >
      <Tab.Screen name="User" component={UserStackNavigator} />
      <Tab.Screen name="QRCode" component={QrCodeStackNavigator} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;