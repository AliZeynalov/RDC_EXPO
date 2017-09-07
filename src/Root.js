import React, {Component,PropTypes} from 'react';
import {NavigatorIOS,ListView, TextInput, View, Image, Platform, TouchableOpacity, ScrollView, StyleSheet,Animated,Alert,ActivityIndicator,AsyncStorage,Dimensions,Text} from 'react-native';
import Home from './Home';
const {width, height} = Dimensions.get("window"),
    vw = width / 100
vh = height / 100


export default class Root extends Component {

    render()
    {

        return(<NavigatorIOS
                initialRoute = {{
                    component: Home,
                    title: '',
                    navigationBarHidden: true
                }}
                style={{flex: 1}}
            />

        );
    }


}




