import React, {Component} from 'react'
import {View, Text, TouchableOpacity, TextInput} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'
import URL from '../publics/redux/actions/URL'

class ForgotPassword extends Component{
    constructor(props){
        super(props)
        this.state = {
            email:'',
            successMessage:false
        }
    }
    static navigationOptions = ({navigation}) => {
        return {
            headerStyle: {
                backgroundColor : '#ff8040',
                elevation:0
            },
            headerLeft: (
                <TouchableOpacity style={{marginLeft:15}} onPress={()=>navigation.goBack()}>
                    <FontAwesome style={{fontSize:25, color:'white'}} name="arrow-left" />
                </TouchableOpacity>
            ),
        }
    }
    submitForm = () =>{
        if(this.state.email !==''){
            axios.post(`${URL}/users/forgotPassword`,{
                email: this.state.email
            }).then(()=>{
                this.setState({successMessage:true})
            })
        }
    }
    render(){
        return(
            <View style={{flex:1, backgroundColor:'#F4F4F4', alignItems:'center'}}>
                <View style={{width:'95%', borderRadius:5, elevation:2, alignItems:'center', justifyContent:'center', padding:20}}>
                    {this.state.successMessage && <Text style={{color:'green'}}>Please check your email :*</Text>}
                    <Text style={{fontSize:20, fontWeight:'bold', color:'#BDBDBD'}}>Lupa Password</Text>
                    <Text style={{fontSize:14, textAlign:'center', marginTop:15, color:'#BDBDBD'}}>Masukkan alamat email yang Anda daftarkan saat menjadi anggota. elevania akan mengirimkan email untuk melakukan reset password.</Text>
                    <View style={{width:'100%', marginTop:50}}>
                    <Text style={{margin:5, color:'#BDBDBD'}}>E-mail</Text>
                    <TextInput style={{width:'100%'}} placeholder="Masukan email Anda" underlineColorAndroid="#D8D8D8" onChangeText={(text)=>this.setState({email:text})} />
                    </View>
                    <TouchableOpacity style={{backgroundColor:'#FE7C1C', padding:10, width:'100%', borderRadius:5, alignItems:'center', justifyContent:'center'}} onPress={this.submitForm}>
                        <Text style={{color:'white', fontSize:18}}>Reset Password</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default ForgotPassword