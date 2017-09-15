/**
 * Created by alizeynalov on 07/09/2017.
 */
import React, {Component} from 'react';
import {ListView, TextInput, View, Image, Platform, TouchableOpacity, ScrollView, StyleSheet,Animated,Alert,ActivityIndicator,AsyncStorage,Dimensions,Text} from 'react-native';
import {MapView} from 'expo';
import {Container, Form, H3, Footer, Header, Icon, Content, Body, FooterTab,  Left, Right, Button, Input, Item, Spinner, CardItem, Thumbnail} from 'native-base';
import { Ionicons } from '@expo/vector-icons';
export default class MapPage extends Component {


    state = {
        mapLoaded: false,
        region: {
            latitude: this.props.user_location[0],
            longitude: this.props.user_location[1],
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
        }
    }

 componentDidMount()
 {
     console.log("this.props: ", this.props);
     this.setState({mapLoaded: true});
 }

 navigateBack()
 {
     console.log("navigatoBack function");
     this.props.navigator.pop();
 }

 componentWillMount()
 {

 }

 onPressZoomOut() {
     region = {
         latitude:       this.state.region.latitude,
         longitude:      this.state.region.longitude,
         latitudeDelta:  this.state.region.latitudeDelta * 2,
         longitudeDelta: this.state.region.longitudeDelta * 2
     }
     this.setState({region: region});
     // this._map.animateToRegion(region, 100);
 }


    onPressZoomIn() {
        region = {
            latitude:       this.state.region.latitude,
            longitude:      this.state.region.longitude,
            latitudeDelta:  this.state.region.latitudeDelta / 2,
            longitudeDelta: this.state.region.longitudeDelta / 2
        }
        this.setState({region: region});
    }



 onRegionChangeComplete = (region) => {
        console.log("REGION: ", region);
        this.setState({region});
 }


render()
{
    const LATITUDE_DELTA = 0.0922;
    const LONGITUDE_DELTA = 0.0421;


    const styles = {
        header: {
            backgroundColor: '#524656',
            marginBottom: 10
        },
        footer: {
            flexDirection: 'column',
            height: 40
        },
        button: {
            alignSelf: 'flex-end',
            backgroundColor: '#eb7b59',
            width: 111,
            height: 33,
            justifyContent: 'center',
            padding: 0,
            margin: 0,
        },
        text: {
            padding: 0,
            margin: 0,
        }
    };




    // var lat = this.props.location[0];
    // var long = this.props.location[1];
    console.log("lat long: ", this.props.location);

    if(!this.state.mapLoaded)
    {
        return(
            <View style={{flex: 1, justifyContent: 'center'}}>
                 <ActivityIndicator size="large"/>
            </View>
        );
    }

    return(
        <Container style={{flex: 1}}>
            <Header style={{"backgroundColor": '#524656',elevation: 0, marginBottom: 0}}>
                <Left style={{flex: 1}}>
                    <Button transparent
                            onPress={()=>this.navigateBack()}>
                        <Icon name="ios-arrow-round-back" style={{color: '#E5DDCB'}}></Icon>
                    </Button>
                </Left>
                <Body style={{flex: 12}}>
                    <Text style={{letterSpacing: 0.5,color: '#E5DDCB'}}>RDC Partner</Text>
                </Body>
            </Header>
            <MapView style={{flex: 1, justifyContent: 'space-between'}}
                loadingEnabled={true}
                region={this.state.region}
                onRegionChangeComplete={this.onRegionChangeComplete}>

               <MapView.Marker
                    coordinate={{latitude: this.props.user_location[0], longitude: this.props.user_location[1]}}
                    title={this.props.user_name}
                    description={this.props.user_desc}>
                    <View>
                        <Text><Thumbnail source={{uri: this.props.user_photo}} /></Text>
                    </View>
               </MapView.Marker>

            </MapView>

            <Footer style={styles.footer}>

                <FooterTab style={{backgroundColor: '#524656', flex: 56, paddingLeft: 12, paddingRight: 12}}>
                    <Left>
                        <Button transparent onPress={()=>this.onPressZoomIn()}>
                        <Icon name="md-add" style={{color: '#FFFF'}}/>
                        </Button>
                    </Left>

                    <Right>
                        <Button transparent onPress={()=>this.onPressZoomOut()}>
                            <Icon name="md-remove" style={{color: "#FFFF"}}/>
                        </Button>
                    </Right>
                </FooterTab>
            </Footer>
        </Container>
    );
}

}