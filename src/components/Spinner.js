import React from 'react';
import { ActivityIndicator, View,StyleSheet } from 'react-native';

const Spinner = ({size }) => {

    return (
        <View style={styles.containerStyle}>
            <ActivityIndicator size={size || 'large' } color="#0000ff"/>
        </View>
    );
};

const styles = StyleSheet.create({
    containerStyle:{
        justifyContent:'center',
        alignItems:'center',
        flex:1
    }
});

export default Spinner;