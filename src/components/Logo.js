import * as React from 'react';
import { View, Text, Button, Image, TouchableOpacity } from 'react-native';

class Logo extends React.Component {
    render(){
        
        return (
            <TouchableOpacity onPress={this.props.onPress}>
                <Image
                    style={{ width: 50, height: 50 }}
                    source={require('../../assets/logo.png')}
                /> 
            </TouchableOpacity>
        );
    }

}

export default Logo;