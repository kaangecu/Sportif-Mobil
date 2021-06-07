import React from 'react';
import { View, Linking, TouchableNativeFeedback, Image } from 'react-native';
import { Text, Button, Card, Divider } from 'react-native-elements';
import moment from 'moment';

export default class Article extends React.Component {
    render() {
        const {
            title,
            description,
            publishedAt,
            source,
            urlToImage,
            url
        } = this.props.article;
        const { noteStyle, titleStyle, imageStyle } = styles;
        const time = moment(publishedAt || moment.now()).fromNow();
        return (
            <TouchableNativeFeedback
              useForeground
              onPress={this.props.onPress}
             
            >
              <Card >
                <View
                  style={{ flexDirection: 'row', justifyContent: 'space-between' }}
                >
                    <Image 
                      style={imageStyle}
                      source={{
                        uri: urlToImage,
                    }} />
                    {/* <Card.Divider style={{ backgroundColor: '#dfe6e9' }} /> */}
                    <Text style={titleStyle}>{title}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={noteStyle}>{source.name.toUpperCase()}</Text>
                    <Text style={noteStyle}>{time}</Text>
                </View>
              </Card>
            </TouchableNativeFeedback>
        );
    }
}

const styles = {
    noteStyle: {
        margin: 5,
        fontStyle: 'italic',
        color: 'gray',
        fontSize: 10
    },
    titleStyle: {
        marginHorizontal: 5,
        flex:5,
        alignSelf:'center',
        fontSize: 16,
        fontWeight:'bold'
        
    },
    imageStyle:{
        
        flex:2,
        resizeMode:'contain',
        margin:5,
        padding:40 ,
        alignSelf:'center',
    },
};