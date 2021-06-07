import React, { Component } from 'react';
import firebase from 'firebase';
import { Text, View, TextInput, StyleSheet, ImageBackground  } from 'react-native'

import Header from '../components/Header';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput'
import Spinner from '../components/Spinner'
import LoginFooter from '../components/LoginFooter'
import { backgroundImageUrl } from "../utils/url";

class Login extends Component {

    state = {
        email: '',
        password: '',
        error: '',
        loading: false,
        loggedIn: false,
    };

    onMainButtonPress() {
        const { email, password } = this.state;

        this.setState({ error: '', loading: true });

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(this.onLoginSuccess.bind(this))
            .catch(this.onLoginFail.bind(this)
            )
    }

    onFooterButtonPress() {
        const navigation = this.props.navigation;
        navigation.navigate('Register')

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
                    buttonText="Giris Yap"
                    onPress={this.onMainButtonPress.bind(this)}
                />
                <LoginFooter
                    infoText="Bir hesabınız yok mu?"
                    buttonText="Kayıt Ol"
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
                    <Header headerText="Giriş Ekranı" />

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

export default Login;