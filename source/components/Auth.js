import React, {Component} from 'react'
import {View,Text, TextInput, TouchableOpacity, ScrollView, AsyncStorage} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import HomeScreen from './HomeScreen'
import { connect } from 'react-redux'
import { login,autoLogin, profile } from '../publics/redux/actions/user'

class Auth extends Component {
    constructor(props){
        super(props)
        this.state = {
            login: props.user.isLogin,
            email:'',
            password:'',
            errorMessage:false
        }
    }
    static navigationOptions = {
        header:null
    }
    componentDidMount(){
        this.props.user.isLogin == false && this.props.navigation.navigate('SplashScreen', {navigation:this.props.navigation})
        
        AsyncStorage.getItem('token').then((keyValue) => {
            console.log(keyValue)
            console.log('panjang asyncstorage ',keyValue.length)
            this.props.dispatch(autoLogin())
        }).catch((error)=>{
            console.log('async not found')
        })

        
    }
    logoutEvent = () =>{
        this.setState({login:false})
    }
    loginEvent = () =>{
        let {email, password} = this.state
        let dataLogin = {
            email: email,
            password: password
        }
        this.props.dispatch(login(dataLogin)).then(()=>{
            this.setState({login:true})
            console.log('ini adalah user token :', this.props.user.token)
            console.log('ini adalah user id :', this.props.user.user[0]._id)
            let {user} = this.props
            let dataStorage = {
                token: user.token,
                data: user.user[0]._id
            }
            this.setAsyncStorageItem(dataStorage)
            
        }).catch(()=>{
            this.setState({errorMessage:true})
        })
    }
    setAsyncStorageItem = async (dataStorage) => {
        try{
            await AsyncStorage.setItem('token',dataStorage.token)
            await AsyncStorage.setItem('user',dataStorage.data)
        }catch(error){
            console.log(error)
        }
    }
    setEmail = (text) =>{
        this.setState({email:text})
    }
    setPassword = (text) =>{
        this.setState({password:text})
    }
    render(){
        return(
            <View style={{flex:1}}>
            {this.props.user.isLogin ? <HomeScreen logoutEvent={this.logoutEvent} /> : <LoginScreen errorMessage={this.state.errorMessage} setEmail={this.setEmail} loginEvent={this.loginEvent} setPassword={this.setPassword} navigation={this.props.navigation} />}
            </View>
        )
    }
}

class LoginScreen extends Component{
    render(){
        return(
            <View style={{flex:1, backgroundColor:'#e8eaed'}}>
                <View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent: 'center', padding:15}}>
                    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}/>
                    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                        <Text style={{fontSize:25, color:'orange', fontWeight:'bold'}}>Login</Text>
                    </View>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('Register')} style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                        <Text style={{color:'orange', fontSize:17, fontWeight:'300'}}>Daftar</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView style={{width:'100%', height:'80%', padding:10}}>
                    <View style={{flex:1,backgroundColor:'white', width:'100%', alignItems:'center', justifyContent: 'center',}}>
                        <View style={{alignItems:'center', justifyContent:'center', marginBottom:25, marginTop:25}}>
                            <Text style={{fontSize:17, color:'#adb1b8', marginBottom:10}}>Login dengan :</Text>
                            <View style={{marginBottom:10,padding:13, borderRadius:40, width:70, height:70, backgroundColor:'blue', aligItems:'center', justifyContent:'center', elevation:5}}>
                                <FontAwesome style={{textAlign:'center', flex:1,fontWeight:'bold', fontSize:35, color:'white', marginTop:5}} name="facebook"/>
                            </View>
                        </View>
                        <View style={{alignItems:'center', justifyContent: 'center',width:'100%'}}>
                            <View style={{width:'100%', height:3, backgroundColor:'#e8eaed'}} />
                            <View style={{backgroundColor:'white', padding:10, position:'absolute'}}>
                                <Text style={{fontSize:15, color:'#adb1b8'}}>atau gunakan email</Text>
                            </View>
                        </View>
                        <View style={{ width:'100%', alignItems:'center', justifyContent:'center'}}>
                            {this.props.errorMessage && <Text style={{marginTop:20, color:'red'}}>Email atau Password tidak ditemukan.</Text>}
                            
                            <TextInput style={{width:'90%', height:60}} underlineColorAndroid="#a7a9ab" placeholder="Email" onChangeText ={this.props.setEmail}/>
                            <TextInput style={{width:'90%', height:60}} underlineColorAndroid="#a7a9ab" placeholder="Password" onChangeText={this.props.setPassword} secureTextEntry={true}/>

                            <TouchableOpacity style={{marginTop:20,width:'90%', alignItems:'center', justifyContent: 'center', padding:10, borderRadius:5, backgroundColor:'orange'}} onPress={this.props.loginEvent}>
                                <Text style={{color:'white', fontSize:20}}>Login</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>this.props.navigation.navigate('ForgotPassword')}>
                                <Text style={{fontSize:17, color:'orange', marginTop:15, marginBottom:20, fontWeight:'bold'}}>Lupa Password?</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}
const mapStateToProps = state => {
    return {
        user: state.user,
    }
  }
export default connect(mapStateToProps)(Auth)