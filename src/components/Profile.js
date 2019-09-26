import React, {Component} from 'react'
import {View, FlatList, Image, List, TextInput, ScrollView} from 'react-native'
import { CardItem, Layout, Body, Text, Button, Container, Picker, Content, Form, Item, Icon, Label, ListItem} from 'native-base';
import Header from './Header'
import Bar from './Bar'
import {connect} from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';

class Profile extends Component{
    static navigationOptions = ({ navigation }) => ({
        headerTitle: 'My Elevania',
        headerTitleStyle: { 
            width: '100%',
            textAlign: 'left',
            color: 'white',
            fontWeight:'bold'
        },
        headerStyle: {
            backgroundColor : '#ff8040'
        },
        headerLeft:(
            <TouchableOpacity style={{marginLeft: 20}} onPress={()=> navigation.openDrawer()}>
                <Icon name='ios-menu' style={{textAlign: 'left', fontSize:30, fontWeight:'bold', color: 'white'}}/>
            </TouchableOpacity>
        ),
        headerRight: (
            <ListItem>
                <TouchableOpacity >
                    <Icon name='ios-search' style={{fontSize:30, textAlign: 'right', marginRight: 20, fontWeight:'bold', color: 'white'}}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                    <Icon name='ios-cart' style={{fontSize:30, textAlign: 'right', color: 'white', fontWeight:'bold'}}/>
                </TouchableOpacity>
            </ListItem>
        ),
    })

    state = {
        dataMenu: [
          { id: "06", size: 'large',name: "Pesanan" , icon: "../assets/icon_ecoupon_myelevenia.png"},
          { id: "07", size: 'large',name: "Mokado" , icon: "../assets/icon_airlines_myelevenia.png"},
          { id: "00", size: 'small', name: "e-Coupon" , icon: "../assets/icon_ecoupon_myelevenia.png"},
          { id: "01", size: 'small',name: "Airlines" , icon: "../assets/icon_airlines_myelevenia.png"},
          { id: "02", size: 'small',name: "Penarikan Poin" , icon: "../assets/icon_penarikan_poin_my_elevia.png"},
          { id: "03", size: 'small',name: "Keuntungan" , icon: "../assets/icon_keuntungan_my_elevenia.png"},
          { id: "04", size: 'small',name: "Favorit" , icon: "../assets/icon_favorit_my_elevenia.png"},
          { id: "05", size: 'small',name: "QnA / Ulasan" , icon: "../assets/icon_qna_my_elevenia.png"},
        ],
      };
    
    render(){
        return(
            <Container>
            <View style={{flex:1}}>
                <Header profile={this.props.user.user[0]} navigation={this.props.navigation} />
                <Bar/>
            </View>
            <View style={{
                flex: 1,
                backgroundColor:'#e8eaed'
                }}>
                <FlatList
                        data={this.state.dataMenu}
                        keyExtractor={(item,index) => index}
                        numColumns={2}
                        renderItem={({ item }) => {
                        if (item.size == 'large'){
                            return(
                            <CardItem
                                style={{
                                flexGrow: 1,
                                flexBasis: 0,
                                marginTop: '2%',
                                marginLeft: '3%',
                                marginRight: '3%',
                                marginBottom: '2%',
                                elevation:5,
                                alignItems:'center',
                                flexDirection:'column',
                                backgroundColor : 'white' 
                                }}
                            >
                                <TouchableOpacity >
                                    <Image source={require('../assets/icon_ecoupon_myelevenia.png')}></Image>   
                                    <Text style={{fontSize : 12}}>
                                        {item.name}
                                    </Text>
                                </TouchableOpacity>
                            </CardItem>
                            )
                        } 
                        return (
                            <CardItem
                                style={{
                                flexGrow: 1,
                                flexBasis: 0,
                                marginTop: '2%',
                                marginLeft: '3%',
                                marginRight: '3%',
                                marginBottom: '2%',
                                elevation:5,
                                height:40,
                                backgroundColor : 'white' 
                                }}
                            >
                                <TouchableOpacity >
                                 <ListItem style={{marginLeft:'-2%'}}>
                                    <Image style={{
                                        height: 30,
                                        width: 30,
                                        marginBottom:'20%'
                                    }} source={require('../assets/icon_ecoupon_myelevenia.png')}></Image>   
                                    <Text style={{fontSize : 12, marginBottom:'20%'}}>
                                        {item.name}
                                    </Text>
                                </ListItem>
                                </TouchableOpacity>
                            </CardItem>
                            );
                        }}
                />
            </View>
            </Container>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        user : state.user
    }
  }
  
export default connect(mapStateToProps)(Profile)
  