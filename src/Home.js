import React, {Component,PropTypes} from 'react';
import {NavigatorIOS,ListView, TextInput, View, Image, Platform, TouchableOpacity, ScrollView, StyleSheet,Animated,Alert,ActivityIndicator,AsyncStorage,Dimensions,Text} from 'react-native';
import MapPage from './MapPage';
import {Container, Form, H3, Footer, Header, Icon, Content, Body, Left, Right, Button, Input, Item, Spinner, CardItem, Thumbnail} from 'native-base';
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

        <CardItem horizontal={false}
            style={{flexDirection: 'column',borderWidth: 1,borderRadius: 4,padding: 0,marginRight: 14,
            borderColor: '#E5DDCB',height: 180, margin: 6,width: (width-36)/3}}>
            <TouchableOpacity onPress={()=>this.navigateTo(post)}>
            <Thumbnail square size={40} source={{uri: post.img }} style={{marginTop: 6, marginBottom: 6}} />
            <Text style={{color: '#E5DDCB',fontSize: 20, fontWeight: 'bold'}}>{post.name}</Text>
            <Text style={{marginBottom: 8}}>{post.description}</Text>
            </TouchableOpacity>
        </CardItem>
        );





    }

    getDetails()
    {
        var Url = "https://rdc-partner-server.herokuapp.com/test/All";
        return fetch(Url, {method: "GET"})
            .then((response) => response.json())
            .then((responseJson) => {

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
            <Container style={styles.container}>
                <Header style={{"backgroundColor": '#524656',elevation: 0}}>
                    <Body style={{flex: 4}}>
                    <Text style={{letterSpacing: 0.5,color: '#E5DDCB'}}>RDC Partner</Text>
                    </Body>
                </Header>
                {/*<View style={styles.topBar}>*/}
                    {/*<Text style={{letterSpacing: 0.5,color: '#E5DDCB'}}>RDC Partner</Text>*/}
                {/*</View>*/}
            <View style={{flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-between'}}>
                <Content contentContainerStyle={{flexDirection: 'row',flex: 1, flexWrap: 'wrap', left: 5}}>
                    <ListView contentContainerStyle={styles.grid}
                      dataSource={this.state.dataSource}
                      enableEmptySections={true}
                      horizontal
                      renderRow={(rowData)=>this.renderRow(rowData)}>
                    </ListView>
                </Content>
            </View>
            </Container>
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



