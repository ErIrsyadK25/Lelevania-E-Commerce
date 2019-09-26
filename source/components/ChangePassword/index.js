import React, {Component} from 'react'
import {View, FlatList, Image, List, TextInput, TouchableOpacity, ScrollView} from 'react-native'
import { Tab, Header, Input, Left, Right, Title, Footer, TabHeading, Tabs, CardItem, Layout, Body, Text, Button, Container, Picker, Content, Form, Item, Icon, Label, ListItem} from 'native-base';
import SwitchToggle from 'react-native-switch-toggle';

class ChangePassword extends Component{
    
    static navigationOptions = ({ navigation }) => ({
        headerTitle: 'Ubah Password',
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
            <Header style={{backgroundColor:'white', height:100, borderColor:'white'}} span>
              <Body style={{alignItems:'center'}}>
                <Text style={{fontSize: 12, color:'grey'}} >
                  Semua informasi pribadi pengguna bersifat rahasia dan elevenia tidak akan menyebarkan tanpa persetujuan pihak anggota
                </Text>
              </Body>
            </Header>
            <Content>
            <Form>
            <Item floatingLabel>
              <Label>Password lama</Label>
              <Input secureTextEntry />
            </Item>
            <Item floatingLabel>
              <Label>Password Baru</Label>
              <Input secureTextEntry/>
            </Item>
            <Item floatingLabel >
              <Label>Konfirm Password Baru</Label>
              <Input secureTextEntry/>
            </Item>
            </Form>
            <Item>
              <Text style={{color:'grey', fontSize:12, padding:12}}>*Password harus terdiri dari 6 karakter atau lebih</Text>
            </Item>
            </Content>
            <Footer style={{backgroundColor:'white'}}>
            <Button onPress={()=> this.props.navigation.goBack()}style={{width: '90%', backgroundColor: '#ff8040', alignSelf:'center', justifyContent:'center'}}>
              <Text>Konfirmasi</Text>
            </Button>
            </Footer>
        </Container>
        )
    }
}

export default ChangePassword