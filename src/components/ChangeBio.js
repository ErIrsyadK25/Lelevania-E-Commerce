import React, {Component} from 'react'
import {View, FlatList, Image, List, TextInput, TouchableOpacity, ScrollView} from 'react-native'
import { Tab, Header, Input, Left, Right, Title, Footer, TabHeading, Tabs, CardItem, Layout, Body, Text, Button, Container, Picker, Content, Form, Item, Icon, Label, ListItem} from 'native-base';
import SwitchToggle from 'react-native-switch-toggle';

class ChangeBio extends Component{
    
    static navigationOptions = ({ navigation }) => ({
        headerTitle: 'Biodata',
        headerTintColor: 'white',
        headerTitleStyle: { 
            width: '100%',
            textAlign: 'left',
            color: 'white',
            fontWeight:'bold'
        },
        headerStyle: {
            backgroundColor : '#ff8040'
        },
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
    
    render(){
        return(
          <Container>
            <Content>
            <Form>
            <Item stackedLabel>
                <Label>Nomor Ponsel</Label>
                <View style={{flexDirection:'row'}}>
                <TextInput style={{flex:1, width:'100%'}} placeholder="08XX"/>
                <Text style={{flex:1, textAlign:'center', marginTop:'3%'}}>-</Text>
                <TextInput style={{flex:5, width:'100%'}} placeholder="Nomor Ponsel"/>
                </View>
            </Item>
            <Item floatingLabel>
              <Label>Jenis Kelamin</Label>
              <Input value={'Pria'}/>
            </Item>
            <Item floatingLabel >
              <Label>Tanggal Lahir</Label>
              <Input value={'7-Juni-2006'}/>
            </Item>
            </Form>
            </Content>
            <Footer style={{backgroundColor:'white'}}>
            <Button onPress={()=> this.props.navigation.goBack()}style={{width: '90%', backgroundColor: '#ff8040', alignSelf:'center', justifyContent:'center'}}>
              <Text>Simpan</Text>
            </Button>
            </Footer>
        </Container>
        )
    }
}

export default ChangeBio