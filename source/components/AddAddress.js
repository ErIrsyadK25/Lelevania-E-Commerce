import React, {Component} from 'react'
import {View, FlatList, Image, List, TextInput, TouchableOpacity, ScrollView} from 'react-native'
import { Tab, Header, Input, Left, Right, Title, TabHeading, Tabs, CardItem, Layout, Body, Text, Button, Container, Picker, Content, Form, Item, Icon, Label, ListItem} from 'native-base';
import SwitchToggle from 'react-native-switch-toggle';

class AddAddress extends Component{
    state = {
        province : '',
        city : '',
        dataProvince: [
          { id: "06", name:'Jawa Timur'},
          { id: "07",  name:'Jawa Tengah'},
          { id: "00",  name:'Jawa Barat'},
          { id: "01",  name:'DKI Jakarta'},
          { id: "02",  name:'DI Yogyakarta'},
          { id: "03",  name:'Bali'},
          { id: "04",  name:'Madura'},
          { id: "05",  name:'Banten'},
        ],
        dataCity: [
            { id: "06", name:'Surabaya'},
            { id: "07",  name:'Semarang'},
            { id: "00",  name:'Bandung'},
            { id: "01",  name:'Jakarta'},
            { id: "02",  name:'Yogyakarta'},
            { id: "03",  name:'Denpasar'},
            { id: "04",  name:'Pamekasan'},
            { id: "05",  name:'Serang'},
          ],
      };
    static navigationOptions = {
        headerTitle: 'Ubah Alamat Pengiriman',
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
        // headerLeft:(
        //     <TouchableOpacity style={{marginLeft: 20}}>
        //         <Icon name='ios-menu' style={{textAlign: 'left', fontSize:30, fontWeight:'bold', color: 'white'}}/>
        //     </TouchableOpacity>
        // ),
        headerRight: (
            <ListItem>
                <TouchableOpacity >
                    <Icon name='ios-search' style={{fontSize:30, textAlign: 'right', marginRight: 20, fontWeight:'bold', color: 'white'}}/>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Icon name='ios-cart' style={{fontSize:30, textAlign: 'right', color: 'white', fontWeight:'bold'}}/>
                </TouchableOpacity>
            </ListItem>
        ),
    }
    onPress1 = () => {
        this.setState({ switchOn1: !this.state.switchOn1 });
    }

    getRightTextDefault() {
        return this.state.switchOn1 ? '' : 'Tidak';
      }
      
      getLeftTextDefault() {
        return this.state.switchOn1 ? 'Ya' : '';
      }

    render(){
        return(
          <Container>
            <Form>
            <Item floatingLabel>
              <Label>Label Alamat</Label>
              <Input />
            </Item>
            <Item floatingLabel>
              <Label>Nama Penerima</Label>
              <Input />
            </Item>
            <Item >
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="md-arrow-dropdown"/>}
                placeholder="Pilih Provinsi"
                selectedValue={this.state.province}
                onValueChange={(itemValue) =>
                  this.setState({province: itemValue})
                }
              >
                <Picker.Item label={'Provinsi'} />
              {(this.state.dataProvince).map((item, index) => {
                  return (<Picker.Item label={item.name} value={item.id} key={item.id}/>)
              })}
              </Picker>
            </Item>
            <Item >
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="md-arrow-dropdown"/>}
                placeholder="Pilih Kabupaten/Kota"
                selectedValue={this.state.city}
                onValueChange={(itemValue) =>
                  this.setState({city: itemValue})
                }
              >
                <Picker.Item label={'Kota'} />
                {(this.state.dataCity).map((item, index) => {
                    return (<Picker.Item label={item.name} value={item.id} key={item.id}/>)
                })}
              </Picker>
            </Item>
            <Item floatingLabel>
              <Label>Alamat Lengkap</Label>
              <Input />
            </Item>
            <Item floatingLabel>
              <Label>Nomor Ponsel</Label>
              <Input />
            </Item>
          </Form>
          <ListItem >
                <Left>
                    <Text>Atur sebagai alamat default</Text>
                </Left>
                <Right>
                <SwitchToggle
                    backgroundColorOn='#ff8040'
                    circleColorOff='white'
                    circleColorOn='white'
                    backTextRight={this.getRightTextDefault()}
                    backTextLeft={this.getLeftTextDefault()}
                    type={1}
                    buttonStyle={{
                      justifyContent: 'flex-end',
                      position: 'absolute'
                    }}
                    rightContainerStyle={{flex: 1, alignItems: 'center', justifyContent: 'flex-end'}}
                    leftContainerStyle={{flex: 1, alignItems: 'center', justifyContent: 'flex-end'}}
                    buttonTextStyle={{fontSize: 12, color:'white',}}
                    textRightStyle={{fontSize: 12, color:'white',}}
                    textLeftStyle={{fontSize: 12, color:'white',}}
                  
                    containerStyle={{
                      width: 80,
                      height : 40,
                      borderRadius: 30,
                      padding: 5,
                    }}
                    switchOn={this.state.switchOn1}
                    onPress={this.onPress1}
                />
                </Right>
            </ListItem>
          <Button
            onPress={()=> this.props.navigation.goBack()} 
            style={{width: '90%', backgroundColor: '#ff8040', alignSelf:'center', justifyContent:'center'}}>
              <Text>Simpan</Text>
            </Button>
        </Container>
        )
    }
}

export default AddAddress