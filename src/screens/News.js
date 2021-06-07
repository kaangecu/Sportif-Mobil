import React, {Component} from "react";
import { View, StyleSheet, SafeAreaView, Image, Linking, ImageBackground  } from "react-native";
import { Text, Button, Card, Divider } from 'react-native-elements';
import { backgroundImageUrl } from "../utils/url";


class News extends Component {

  render(){
    const {
      title,
      description,
      publishedAt,
      source,
      urlToImage,
      content,
      author,
      url, }=this.props.route.params.item;
      

      const { noteStyle, titleStyle, imageStyle } = styles;
      //const time = moment(publishedAt || moment.now()).fromNow();
      return (
        <ImageBackground source={backgroundImageUrl} style={styles.image}>
              <Card >
              <View
                  style={{ flexDirection: 'column', justifyContent: 'space-around' }}
              >
                  <Card.Image 
                  style={imageStyle}
                  source={{
                      uri: urlToImage,
                  }} />
                  <Card.Divider style={{ backgroundColor: '#dfe6e9' }} />
                  <Text style={titleStyle}>{title}</Text>
                  <Card.Divider style={{ backgroundColor: '#dfe6e9' }} />
                  <Text >{content}</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={noteStyle}>{author}</Text>
                  <Text style={noteStyle}>{source.name.toUpperCase()}</Text>
                  <Text style={noteStyle}>{publishedAt}</Text>
                  <Button title="Devam et" onPress={ ()=>{Linking.openURL(url)}} />
              </View>
              </Card>
              </ImageBackground>
      );
  }

};


const styles = {
  noteStyle: {
      margin: 5,
      fontStyle: 'italic',
      color: 'gray',
      fontSize: 10
  },
  titleStyle: {
      marginHorizontal: 5,
      //flex:5,
      alignSelf:'center',
      fontSize: 20,
      fontWeight:'bold'
      
  },
  imageStyle:{
      
      //flex:2,
      resizeMode:'cover',
      margin:5,
      //padding:40 ,
      alignSelf:'center',
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
};
export default News;