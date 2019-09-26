import React, {Component} from 'react'
import {View,Text, TextInput, TouchableOpacity, ScrollView, Image} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import DateTimePicker from "react-native-modal-datetime-picker"
import { connect } from 'react-redux'
import { register } from '../publics/redux/actions/user'

class Register extends Component{
    constructor(props) {
        super(props);
        this.state = {
          isDateTimePickerVisible: false,
          email:'',
          password:'',
          confirmPassword:'',
          name:'',
          gender:'',
          preNumber:'',
          number:'',
          birthDate:'',
          defaultRole:'buyer',
          errorMessage:false,
          successMessage:false,
          errorPasswordConfirmation:false
        }
    }
    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
    }

    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    }

    handleDatePicked = date => {
        console.warn("A date has been picked: ", date);
        this.setState({
            birthDate: date
        })
        this.hideDateTimePicker();
    }
    registerUser = () => {
        let {email,password,confirmPassword,name,gender,preNumber,number,birthDate, defaultRole} = this.state
        if(email !== '' && password !== '' && confirmPassword !== '' && name !== '' && gender !== '' && preNumber !== '' && number !== '' && birthDate !== ''){
            let data = {
                email: email,
                password: password,
                name: name,
                gender: gender,
                phone: preNumber+number,
                birthDate: birthDate,
                role: defaultRole,
            }
            this.props.dispatch(register(data)).then(()=>{
                this.setState({successMessage:true})
            }).catch(()=>{
                this.setState({errorMessage:true})
            })
        }
    }
    
    static navigationOptions = {
        header:null
    }
    render(){
        const gender = [
            {
                key:'male',
                label:'Pria'
            },
            {
                key:'female',
                label:'Wanita'
            }
        ]

        const roles = [
            {
                key:'buyer',
                label:'Pembeli'
            },
            {
                key:'seller',
                label:'Penjual'
            }
        ]

        const sellerCategory = [
            {
                id:0,
                titleID:'Penjual Perorangan',
                titleEN:'Individual Seller',
                imageLink:'http://www.elevenia.co.id/img_11ia/member/ic-individu.png'
            },
            {
                id:1,
                titleID:'Penjual Badan Usaha',
                titleEN:'Business Seller',
                imageLink:'http://www.elevenia.co.id/img_11ia/member/ic-pt.png'
            },
            {
                id:2,
                titleID:'Penjual Global',
                titleEN:'Global Seller',
                imageLink:'http://www.elevenia.co.id/img_11ia/member/ic-global.png'
            },
        ]

        
        let newDate = new Date(this.state.birthDate).toString().split(' ')
        newDate = newDate[2]+'-'+newDate[1]+'-'+newDate[3]

        return(
            <View style={{flex:1, backgroundColor:'#e8eaed'}}>
                <View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent: 'center'}}>
                    <TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                        <FontAwesome style={{fontSize:25, fontWeight:'bold', color:'orange'}} name="arrow-left"/>
                    </TouchableOpacity>
                    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                        <Text style={{fontSize:25, color:'orange', fontWeight:'bold'}}>Daftar</Text>
                    </View>
                    <TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                        <Text style={{color:'orange', fontSize:17, fontWeight:'300'}}>Login</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flex:9, alignItems:'center', justifyContent: 'center'}}>
                    <View style={{flex:1,backgroundColor:'white', width:'90%', marginTop:10, alignItems:'center', justifyContent: 'center'}}>
                        <View style={{ flexDirection:'row', alignItems:'center', justifyContent:'center', backgroundColor:'white', width:'100%', height:50}}>
                            {roles.map(role=>
                            <View key={role.key} style={{flex:1,alignItems:'center', justifyContent: 'center', width:'100%'}}>
                                <TouchableOpacity 
                                    onPress={()=>{this.setState({defaultRole:role.key})}}
                                    style={{flex:1, marginTop:10,alignItems:'center', justifyContent: 'center'}}
                                >
                                    <Text style={{fontSize:17, margin:15, color: role.key === this.state.defaultRole? 'orange' : 'black'}}>{role.label}</Text>
                                </TouchableOpacity>
                                <View style={{backgroundColor:role.key === this.state.defaultRole?'orange':'white', width:'100%', height:5}} />
                            </View>
                            )}
                        </View>
                        <View style={{flex:10, backgroundColor:'white', width:'100%'}}>
                        {this.state.defaultRole === 'buyer'?
                        <ScrollView>
                                <View style={{flex:1}}>
                                    <View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'center', padding:15}}>
                                        <View style={{padding:13, borderRadius:30, width:50, height:50, backgroundColor:'blue', alignItems:'center', justifyContent:'center'}}>
                                            <FontAwesome style={{textAlign:'center', flex:1,fontWeight:'bold', fontSize:25, color:'white'}} name="facebook"/>
                                        </View>
                                        <Text style={{fontSize:17, color:'blue'}}>  Daftar dengan Facebook</Text>
                                    </View>
                                    <View style={{flex:1, alignItems:'center', justifyContent: 'center',width:'100%'}}>
                                        <View style={{width:'100%', height:3, backgroundColor:'#e8eaed'}} />
                                        <View style={{backgroundColor:'white', padding:10, position:'absolute'}}>
                                            <Text style={{fontSize:15, color:'#adb1b8'}}>atau gunakan email</Text>
                                        </View>
                                    </View>
                                    <View style={{flex:1, alignItems:'center', justifyContent:'center', width:'100%', marginTop:10}}>
                                        {this.state.successMessage && <Text style={{color:'green'}}>Your account was successfully created.</Text>}
                                        {this.state.errorMessage && <Text style={{color:'red'}}>Email has been registered.</Text>}
                                    </View>
                                    <View style={{flex:1, marginTop:15, width:'100%', alignItems:'center', justifyContent:'center'}}>
                                        <TextInput style={{width:'90%', height:60}} underlineColorAndroid="grey" placeholder="Name" onChangeText={(text)=>this.setState({name:text})}/>
                                    </View>
                                    <View style={{flex:1, marginTop:15, width:'100%', alignItems:'center', justifyContent:'center'}}>
                                        <TextInput style={{width:'90%', height:60}} underlineColorAndroid="grey" placeholder="Email" onChangeText={(text)=>this.setState({email:text})}/>
                                    </View>
                                    <View style={{flex:1, marginTop:15, width:'100%', alignItems:'center', justifyContent:'center'}}>
                                        <TextInput style={{width:'90%', height:60}} underlineColorAndroid="grey" placeholder="Password" onChangeText={(text)=>this.setState({password:text})} secureTextEntry={true}/>
                                    </View>
                                    <View style={{flex:1, marginTop:15, width:'100%', alignItems:'center', justifyContent:'center'}}>
                                        <TextInput style={{width:'90%', height:60}} underlineColorAndroid="grey" placeholder="Konfirmasi Password" onChangeText={(text)=>this.setState({confirmPassword:text})} secureTextEntry={true}/>
                                    </View>
                                    <View style={{flex:1, marginTop:15, width:'100%', alignItems:'center', justifyContent:'center'}}>
                                        <View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'center', width:'90%'}}>
                                            <TextInput style={{flex:1, width:'100%'}} placeholder="08XX" onChangeText={(text)=>this.setState({preNumber:text})}/>
                                            <Text style={{flex:1, textAlign:'center'}}>-</Text>
                                            <TextInput style={{flex:5, width:'100%'}} placeholder="Nomor Ponsel" onChangeText={(text)=>this.setState({number:text})}/>
                                        </View>
                                        <View style={{width:'88%', height:1, backgroundColor:'#a7a9ab'}} />
                                    </View>
                                    <View style={{flex:1, marginTop:20, width:'100%', alignItems:'center', justifyContent:'center'}}>
                                        <TouchableOpacity style={{flex:1, flexDirection:'row', alignContent:'flex-start', width:'85%'}} onPress={this.showDateTimePicker}>
                                            <View style={{flex:1}}>
                                                <Text>{this.state.birthDate == '' ?'Tanggal Lahir': newDate}</Text>
                                            </View>
                                            <FontAwesome name="sort-down"/>
                                        </TouchableOpacity>
                                        <DateTimePicker 
                                            isVisible={this.state.isDateTimePickerVisible}
                                            onConfirm={this.handleDatePicked}
                                            onCancel={this.hideDateTimePicker}
                                            onPress
                                        />
                                        <View style={{width:'88%', height:1, backgroundColor:'grey', marginTop:15}} />
                                    </View>
                                    <View style={{flex:1, padding:25}}>
                                        <Text style={{color:'#a7a9ab'}}>Jenis Kelamin</Text>
                                        <View style={{flex:1, width:'100%',alignItems:'center', justifyContent:'center'}}>
                                            <View style={{flexDirection:'row', flex:1, marginTop:15, alignItems:'center', justifyContent:'center'}}>   
                                            {gender.map(item=>
                                                <View key={item.key} style={{flex:1,flexDirection:'row', justifyContent:'center', alignItems:'center', marginBottom:30}}>
                                                    <TouchableOpacity 
                                                    style={{height:20, width:20, borderRadius:10, borderWidth:1, borderColor:'black', alignItems:'center',justifyContent:'center'}}
                                                    onPress={()=>{this.setState({gender:item.key})}}
                                                    >
                                                        { this.state.gender === item.key && (<View style={{width:14, height:14, borderRadius:7, backgroundColor:'black'}} />) }
                                                    </TouchableOpacity>
                                                    <Text style={{color:'#a7a9ab', fontSize:18}}>  {item.label}</Text>
                                                </View>
                                            )}
                                            </View>
                                        </View>
                                    </View>
                                    <TouchableOpacity style={{padding:15, backgroundColor:'grey', borderRadius:5, alignItems: 'center', justifyContent:'center', margin:15}} onPress={this.registerUser}>
                                        <Text style={{color:'white', fontSize:18}}>Daftar</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{flex:2}} />
                        </ScrollView>
                        :
                        <ScrollView style={{padding:15}}>
                            <View style={{flex:1, alignItems: 'center', justifyContent:'center'}}>
                                <Text style={{fontSize:16, color:'#a7a9ab'}}>Ingin berjualan di elevAAAnia?</Text>
                                <Text style={{fontSize:20, color:'#a7a9ab'}}>Daftar Sebagai Seller</Text>
                                {sellerCategory.map(seller=>
                                <TouchableOpacity key={seller.id} style={{margin:10, height:70, borderWidth:1, borderColor:'grey', alignItems: 'center', justifyContent:'center', width:'100%', padding:15}}>
                                    <View style={{ flexDirection:'row', alignItems: 'center', justifyContent:'center'}}>
                                        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                                        <Image 
                                            style={{width: 50, height: 50}}
                                            source={{uri: seller.imageLink}}
                                        />
                                        </View>
                                        <View style={{flex:2}}>
                                            <Text style={{fontSize:20, color:'black', fontWeight:'bold'}}>{seller.titleID}</Text>
                                            <Text style={{fontSize:18, color:'black'}}>{seller.titleEN}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                )}
                            </View>
                        </ScrollView>
                        }
                       </View>
                    </View>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
    }
  }
export default connect(mapStateToProps)(Register)