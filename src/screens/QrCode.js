import React, { Component } from 'react';
import firebase from 'firebase';
import { Text, View, TextInput, StyleSheet, ImageBackground  } from 'react-native'
import Header from '../components/Header';
import QRCode from 'react-native-qrcode-svg';
import { backgroundImageUrl } from "../utils/url";

let logoFromFile = require('../../assets/logo.png');

const QRcodeScreen = () => {

    const currenUser = firebase.auth().currentUser;

    return (
        <ImageBackground source={backgroundImageUrl} style={styles.image}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <Header headerText="QR Code Ekranı" />
            <View style={styles.textBorderStyle }>
                <Text style={styles.textStyle}>Size Özel QR Code'unuzu {'\n'}Giriş için Turnikelerde {'\n'}Alışveriş için Kasada Kullanabilirsiniz</Text>
            </View>
            <View style={styles.QRcodeStyle}>
                <QRCode
                    value={currenUser.uid}
                    size={300}
                    //color='red'
                    logo={logoFromFile}
                    logoSize={60}
                />
            </View>
        </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({

    textStyle: {
        alignSelf: 'center',
        margin: 10,
        fontSize: 20,
        color: 'dodgerblue',
        textAlign:'center',
        //backgroundColor:'ghostwhite',

    },
    textBorderStyle: { 
        flexDirection: 'row',
         backgroundColor: 'ghostwhite', 
         justifyContent: 'center',
          borderTopColor:'black',
          borderTopWidth:2,
         },
    QRcodeStyle: {
        alignSelf: 'center',
        margin: 10,

    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
      },
});

export default QRcodeScreen;