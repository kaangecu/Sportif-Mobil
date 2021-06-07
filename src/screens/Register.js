import React, { Component } from 'react';
import firebase from 'firebase';
import { Text, View, TextInput, StyleSheet, ImageBackground } from 'react-native'
import Header from '../components/Header';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput'
import Spinner from '../components/Spinner'
import LoginFooter from '../components/LoginFooter'
import { backgroundImageUrl } from "../utils/url";

class Register extends Component {

    constructor(props) {
        super(props);

    }

    state = {
        email: '',
        password: '',
        name: '',
        error: '',
        loading: false,
        loggedIn: false,
    };

    onMainButtonPress() {
        const navigation = this.props.navigation;

        const { email, password } = this.state;

        this.setState({ error: '', loading: true });

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((response) => {
                const uid = response.user.uid
                const data = {
                    id: uid,
                    name: this.state.name,
                    email,
                    password,
                    balance: 0,
                    role: 'user'
                };
                const usersRef = firebase.firestore().collection('users')
                usersRef
                    .doc(uid)
                    .set(data)
                    .then(() => {
                        navigation.navigate('Home', { user: data })

                    })
                    .catch((error) => {
                        alert(error)
                    });



                this.onLoginSuccess.bind(this)
            })
            .catch(this.onLoginFail.bind(this));
    }

    onFooterButtonPress() {


    }


    onLoginFail() {
        this.setState({ error: 'Giriş Yapılamadı', loading: false });
    }

    onLoginSuccess() {


        this.setState({
            email: '',
            password: '',
            loading: false,
            error: ''
        });
    }


    renderButton() {
        if (this.state.loading) {
            return <Spinner />;
        }
        return (
            <View>
                <CustomButton
                    buttonText="Kayıt Ol"
                    onPress={this.onMainButtonPress.bind(this)}
                />
                <LoginFooter
                    infoText="Bir hesabınız var mı?"
                    buttonText="Giriş Yap"
                    onPress={this.onFooterButtonPress.bind(this)}
                />
            </View>
        );
    }

    render() {
        return (
            <ImageBackground source={backgroundImageUrl} style={styles.image}>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Header headerText="Kayıt Ekranı" />


                        <CustomInput
                            placeholder="Ümit"
                            label="Name"
                            value={this.state.name}
                            onChangeText={text => this.setState({ name: text })}
                        />
                        <CustomInput
                            placeholder="abc@gmail.com"
                            label="Email"
                            value={this.state.email}
                            onChangeText={text => this.setState({ email: text })}
                        />
                        <CustomInput
                            placeholder="******"
                            label="Password"
                            value={this.state.password}
                            onChangeText={text => this.setState({ password: text })}
                            secureTextEntry
                        />

                        <Text style={styles.errorTextStyle}>
                            {this.state.error}
                        </Text>

                        <View>
                            {this.renderButton()}
                        </View>
                    </View>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red',

    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
    },
});

export default Register;