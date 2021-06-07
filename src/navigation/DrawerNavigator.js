import React, { Component } from "react";
import firebase from 'firebase';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";

import { HomeStackNavigator, LoginStackNavigator } from "./StackNavigator";
import TabNavigator from "./TabNavigator";
import Admin from '../screens/Admin'


const Drawer = createDrawerNavigator();

class DrawerNavigator extends Component {


  state = {
    loggedIn: false,
    role: 'user'
  };

  componentDidMount() {

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user)
        const usersRef = firebase.firestore().collection('users');
        usersRef
          .doc(user.uid)
          .get()
          .then((doc) => {
            console.log(doc.data());
            this.setState({role:doc.data().role , loggedIn :true })
          })
          .catch((error) => {
            alert(error)
          });

        this.setState({ loggedIn: true, role: user.role });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }



  render() {
    return (
      <Drawer.Navigator drawerContent={props => {
        return (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            {this.state.loggedIn && <DrawerItem label="Cikis yap" onPress={() => { firebase.auth().signOut(); }} />}
          </DrawerContentScrollView>
        )
      }}>
        <Drawer.Screen name="Anasayfa" component={HomeStackNavigator} />
        { this.state.loggedIn && this.state.role==='user' && <Drawer.Screen name="Kullanici" component={TabNavigator} />}
        { !this.state.loggedIn && <Drawer.Screen name="Giris yap" component={LoginStackNavigator} />}
        { this.state.loggedIn && this.state.role === 'admin' && <Drawer.Screen name="Admin" component={Admin} /> }
      </Drawer.Navigator> 
    );
  }

};

export default DrawerNavigator;