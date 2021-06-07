import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Modal, TouchableHighlight, TextInput } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import firebase from 'firebase';
import CustomInput from '../components/CustomInput';


export default function Admin() {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [userData, setUserData] = useState({ name: '', email: '', balance: 0 });
    const [modalVisible, setModalVisible] = useState(false)
    const [addedBalance, setAddedBalance] = useState(0)
    const usersRef = firebase.firestore().collection('users')

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        usersRef
            .doc(data)
            .get()
            .then((doc) => {
                console.log(doc.data());
                setUserData(doc.data());
            })
            .catch((error) => {
                alert(error)
            });

        setModalVisible(true);
    };

    const updateBalance = () => {
        setModalVisible(false);
        usersRef
            .doc(userData.id)
            .set({
                ...userData,
                balance: (Number(userData.balance) + Number(addedBalance))
            })
    }

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
            {scanned && <Button title={'Tekrar oku'} onPress={() => setScanned(false)} />}

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <CustomInput editable={false} label='Ad' value={userData.name} />
                        <CustomInput editable={false} label='E-posta' value={userData.email} />
                        <CustomInput editable={false} label='Bakiye' value={userData.balance.toString()} />
                        <CustomInput editable={true} label='Ekle' value={0} onChangeText={(text) => { setAddedBalance(text) }} />
                        <View style={{flexDirection:'row'}}>
                            <TouchableHighlight
                                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                                onPress={updateBalance}
                            >
                                <Text style={styles.textStyle}>Kaydet</Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                style={{ ...styles.openButton, backgroundColor: "red" }}
                                onPress={()=>setModalVisible(false)}
                            >
                                <Text style={styles.textStyle}>Kapat</Text>
                            </TouchableHighlight>
                        </View>

                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column', 
        justifyContent: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 15,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginRight:15,
        marginLeft:15
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});