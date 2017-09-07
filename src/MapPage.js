/**
 * Created by alizeynalov on 07/09/2017.
 */
import React, {Component} from 'react';
import {ListView, TextInput, View, Image, Platform, TouchableOpacity, ScrollView, StyleSheet,Animated,Alert,ActivityIndicator,AsyncStorage,Dimensions,Text} from 'react-native';
import {MapView} from 'expo';
import { Ionicons } from '@expo/vector-icons';
export default class MapPage extends Component {


    state = {
        mapLoaded: false,
        region: {
            latitude: 50.18825,
            longitude: -122.6324,
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
        this.setState({region});
 }


render()
{
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
        <View style={{flex: 1}}>
            <TouchableOpacity onPress={()=>this.navigateBack()} style={{paddingLeft: 5, marginTop: 15}}>
                <Ionicons name="ios-arrow-back" size={32} color="green" />
            </TouchableOpacity>
            <MapView style={{flex: 1}}
                loadingEnabled={true}
                region={this.state.region}
                onRegionChangeComplete={this.onRegionChangeComplete}>

               <MapView.Marker
                    coordinate={{latitude: this.props.user_location[0], longitude: this.props.user_location[1]}}
                    title={this.props.user_name}
                    description={this.props.user_desc}
               />
            </MapView>
            <TouchableOpacity onPress={()=>this.onPressZoomIn()}>
                <Text>Zoom In</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.onPressZoomOut()}>
                    <Text>Zoom Out</Text>
            </TouchableOpacity>
        </View>
    );
}

}