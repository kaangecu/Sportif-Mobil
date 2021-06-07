import React, { useState, useEffect } from "react";
import firebase from 'firebase';
import { Text, StyleSheet, View, Button, TouchableOpacity, ImageBackground } from "react-native";
import Spinner from "../components/Spinner"
import Reminder from "../components/Reminder";
import { backgroundImageUrl } from "../utils/url";

export default function User() {

    const currentUser = firebase.auth().currentUser;
    if (!currentUser) {
        return <Text>Giris yapilmadi</Text>
    }

    const [user, setUser] = useState({ name: '', balance: '', })
    const [isLoading, setIsLoading] = useState(true)

    const userTable = firebase.firestore().collection('users').doc(currentUser.uid)

    useEffect(() => {
        userTable.get().then(function (doc) {
            if (doc.exists) {
                setUser({...doc.data()});
                setIsLoading(false);
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });

    }, []);


    if (isLoading) {
        return <Spinner />;
    }
    return (
        <ImageBackground source={backgroundImageUrl} style={styles.image}>
            <View style={styles.container}>
                <View style={{ flex: 3 }}>
                    <Text style={styles.textStyle}>Merhaba {user.name}</Text>
                    <Text style={styles.textStyle}>Kalan Giriş Hakkınız {'\n\n'}{user.balance}</Text>
                </View>


                <View style={{ flex: 2 }}>
                    <Reminder />
                </View>

            </View>
        </ImageBackground>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
    },
    textStyle: {
        alignSelf: 'center',
        textAlign: 'center',
        color: '#007aff',
        fontSize: 34,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10,
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
    },
});