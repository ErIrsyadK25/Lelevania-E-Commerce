import React, {Component} from 'react'
import {View, FlatList, Image, List, TextInput, TouchableOpacity, ScrollView,AsyncStorage} from 'react-native'
import { Tab, Header, Title, TabHeading, Tabs, CardItem, Layout, Body, Text, Button, Container, Picker, Content, Form, Item, Icon, Label, ListItem} from 'native-base';
import Address from './Address.js'
import InfoAccount from './InfoAccount'
import {connect} from 'react-redux';
import { editAlamat } from '../publics/redux/actions/user';
import axios from 'axios'
import URL from '../publics/redux/actions/URL'
class EditProfile extends Component{
    constructor(props){
      super(props)
        this.state = {
          alamat : '',
          userID : '',
          name: '',
          email: '',
          data:[]
        }
    }

    goCart = () => {
        const { navigation } = this.props;
        navigation.navigate('Cart')
    }
    static navigationOptions = ({ navigation }) => ({
        headerTitle: 'Ubah Akun',
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
                <TouchableOpacity onPress={this.goCart} onPress={() => navigation.navigate('Cart')}>
                    <Icon name='ios-cart' style={{fontSize:30, textAlign: 'right', color: 'white', fontWeight:'bold'}}/>
                </TouchableOpacity>
            </ListItem>
        ),
    })

    
    componentDidMount(){
      if(this.props.user.user[0] == undefined){
        AsyncStorage.getItem('user').then((userData)=>{
          axios.get(`${URL}/users/${userData}`).then((response)=>{
            this.setState({
              alamat: response.data.user[0].alamat,
              userID: response.data.user[0]._id,
              name: response.data.user[0].name,
              email: response.data.user[0].email,
              data: response.data
            })
          })
        })
      }else{
        this.setState({
          alamat: this.props.user.user[0].alamat,
          userID: this.props.user.user[0]._id,
          name: this.props.user.user[0].name,
          email: this.props.user.user[0].email,
          data: this.props.user
        })
      }
    }

    editAlamat(){
      this.props.dispatch(editAlamat(this.state.alamat,  this.state.userID));
      this.props.navigation.navigate('Profile');
    }

    render(){
     
      
        return(
          <Container>
            <Header style={{backgroundColor:'white'}} span>
              <Body style={{alignItems:'center'}}>
                <Title style={{fontSize: 14, color:'#ff8040'}}>Informasi Anggota</Title>
                <Text style={{fontSize: 12, marginTop:'5%', fontWeight:'bold'}}>{this.state.name}</Text>
                <Text style={{fontSize: 12, color:'grey'}} >{this.state.email}</Text>
              </Body>
            </Header>
          <Tabs>
            <Tab 
              heading={ 
                <TabHeading style={{backgroundColor:'white'}}>
                  <Text style={{color:'#ff8040'}}>Alamat</Text>
                </TabHeading>}>
                <Address 
                  navigation={this.props.navigation} 
                  user={this.state.data}
                  alamat={this.state.alamat}
                  onChangeText={(value)=> this.setState({alamat: value})}
                  onPress={() => this.editAlamat()}
                />
            </Tab>
            <Tab heading={ 
              <TabHeading style={{backgroundColor:'white'}}>
                <Text style={{color:'#ff8040'}}>Informasi Akun</Text>
              </TabHeading>}>
              <InfoAccount navigation={this.props.navigation}/>
            </Tab>
          </Tabs>
        </Container>
        )
    }
}

const mapStateToProps = (state) =>{
  return {
      user : state.user
  }
}

export default connect(mapStateToProps)(EditProfile)