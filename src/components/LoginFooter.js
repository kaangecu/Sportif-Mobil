import React from 'react';
import { Text, TouchableOpacity,View } from 'react-native';

const LoginFooter = ({ onPress, buttonText,infoText }) => {
  const { buttonStyle, textStyle } = styles;

  return (
      <View style={{flexDirection:'row',alignSelf: 'center'}}>
          <Text style={{alignSelf: 'center'}}>{infoText}</Text>
    <TouchableOpacity onPress={onPress}>
      <Text style={textStyle}>
        {buttonText}
      </Text>
    </TouchableOpacity>
    </View>
  );
};

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: '#007aff',
    fontSize: 12,
    fontWeight: '600',
    padding:10
    // paddingTop: 10,
    // paddingBottom: 10
  },
  buttonStyle: {
    //flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
    marginLeft: 5,
    marginRight: 5
  }
};

export default LoginFooter;