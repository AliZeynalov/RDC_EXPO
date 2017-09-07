import React, {Component,PropTypes} from 'react';
import {NavigatorIOS,ListView, TextInput, View, Image, Platform, TouchableOpacity, ScrollView, StyleSheet,Animated,Alert,ActivityIndicator,AsyncStorage,Dimensions,Text} from 'react-native';
import MapPage from './MapPage';
const {width, height} = Dimensions.get("window"),
    vw = width / 100
vh = height / 100


export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => true
            })
        }

    }

    navigateTo(user)
    {
        this.props.navigator.push({
            component: MapPage,
            title: '',
            navigationBarHidden: true,
            passProps: {user_name: user.name, user_photo: user.img, user_desc: user.description, user_location: user.location}
        })
    }


    getDataSource(posts) {
        return this.state.dataSource.cloneWithRows(posts);
    }

    renderRow(post)
    {
        if(this.state.dataSource == null)
            return null;

        return(
            // <ProductItem name={post.name} price={post.price} thumbnail={post.cover_url} addItem={()=>this.addItem(post)}/>
            <View>
                <Text>{post.name}</Text>
                <TouchableOpacity onPress={()=>this.navigateTo(post)}>
                <Image style={{width: 80, height: 80}} source={{uri: post.img}}/>
                <Text>{post.description}</Text>
                </TouchableOpacity>
            </View>
        );





    }

    getDetails()
    {
        var Url = "https://rdc-partner-server.herokuapp.com/test/All";
        return fetch(Url, {method: "GET"})
            .then((response) => response.json())
            .then((responseJson) => {
                console.log("GIRDI");
                this.setState({dataSource: this.getDataSource(responseJson)},()=>console.log("user state",this.state.dataSource));
            })
            .done();
    }



    componentDidMount()
    {
        this.getDetails();
    }


    render()
    {

        return(
            <View style={styles.container}>
                <View style={styles.topBar}>
                    <Text style={{letterSpacing: 0.5,color: '#E5DDCB'}}>RDC Partner</Text>
                </View>
            <View style={{flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-between'}}>
                <ScrollView style={{backgroundColor: '#E8E8E8', flex: 1}}>
                    <ListView contentContainerStyle={styles.grid}
                      dataSource={this.state.dataSource}
                      enableEmptySections={true}
                      horizontal
                      renderRow={(rowData)=>this.renderRow(rowData)}>
                    </ListView>
                </ScrollView>
            </View>
            </View>
        );
    }


}


const styles= StyleSheet.create({
    topBar: {
        padding: 16,
        paddingTop: 28,
        paddingBottom: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2ecc71'
    },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch'
    },
    grid: {
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 1,
    }
})



