import React, {Component} from 'react'
import {StyleSheet,Image,View,ScrollView,Text,TouchableOpacity,FlatList, ActivityIndicator, AsyncStorage} from 'react-native'
import { Icon, ListItem} from 'native-base';
import {connect} from 'react-redux';

import {getWishList} from '../publics/redux/actions/user'
class WishLists extends Component{

    constructor(props){
        super(props)
        this.state = {
            currentButton:[
                {
                    key:0,
                    label:'Wishlist'
                },
                {
                    key:1,
                    label:'My View'
                },
                {
                    key:2,
                    label:'Favorite Store'
                }
            ],
            currentScreen:0,
        }
    }
    
    static navigationOptions = ({ navigation }) => ({
        headerTitle: navigation.getParam('title')|| 'Wishlist',
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
            <TouchableOpacity onPress={() => navigation.goBack()} style={{marginLeft: 20}}>
                <Icon name='arrow-back' style={{textAlign: 'left', fontSize:30, fontWeight:'bold', color: 'white'}}/>
            </TouchableOpacity>
        ),
        headerRight: (
            <ListItem>
                <TouchableOpacity >
                    <Icon name='ios-search' style={{fontSize:30, textAlign: 'right', marginRight: 22, fontWeight:'bold', color: 'white'}}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                    <Icon name='ios-cart' style={{fontSize:30, textAlign: 'right',marginRight: 15, color: 'white', fontWeight:'bold'}}/>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Icon name='more' style={{fontSize:25,color: 'white'}} />
                </TouchableOpacity>
            </ListItem>
        ),
    })
    render(){
        return(
            <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                <View style={{flex:1, flexDirection:'row', elevation:5, backgroundColor:'white'}}>
                    {this.state.currentButton.map((button,i)=>
                    <TouchableOpacity onPress={()=>{this.props.navigation.setParams({title: button.label});this.setState({currentScreen:button.key})}} key={button.key} style={{flex:1, alignItems:'center', justifyContent:'center',}}>
                        <View style={{flex:9, alignItems:'center', justifyContent:'center'}}><Text style={{color: i == this.state.currentScreen ?'orange' : 'black',fontSize:14}}>{button.label}</Text></View>
                        <View style={{flex:1, backgroundColor: i == this.state.currentScreen ? 'orange' : 'white', width:'100%'}} />
                    </TouchableOpacity>
                    )}
                </View>
                <View style={{flex:10, width:'100%', backgroundColor:'#e8eaed'}}>
                    {this.state.currentScreen == 0 ? <Wishlist wishlist={this.props.user.wishlist} navigation={this.props.navigation}/> : (this.state.currentScreen == 1 ? <MyView/> : <MyStore/> )}
                </View>
            </View>
        )
    }
}
class Wishlist extends Component{
    constructor(props){
        super(props)
        this.state = {
            product:[
                {id:0, photo:['https://cdn.elevenia.co.id/ex_t/R/200x200/1/85/1/src/g/6/8/2/0/5/5/28682055_B.jpg'], product_name:'ERIKA TOP - Atasan Wanita Blouse Wanita', product_price:'79.000'},
                {id:1, photo:['https://cdn.elevenia.co.id/ex_t/R/200x200/1/85/1/src/g/6/8/2/0/5/5/28682055_B.jpg'], product_name:'ERIKA TOP - Atasan Wanita Blouse Wanita', product_price:'79.000'},
                {id:2, photo:['https://cdn.elevenia.co.id/ex_t/R/200x200/1/85/1/src/g/6/8/2/0/5/5/28682055_B.jpg'], product_name:'ERIKA TOP - Atasan Wanita Blouse Wanita', product_price:'79.000'},
                {id:3, photo:['https://cdn.elevenia.co.id/ex_t/R/200x200/1/85/1/src/g/6/8/2/0/5/5/28682055_B.jpg'], product_name:'ERIKA TOP - Atasan Wanita Blouse Wanita', product_price:'79.000'},
                {id:4, photo:['https://cdn.elevenia.co.id/ex_t/R/200x200/1/85/1/src/g/6/8/2/0/5/5/28682055_B.jpg'], product_name:'ERIKA TOP - Atasan Wanita Blouse Wanita', product_price:'79.000'},
            ]
        }
    }
    componentDidMount(){
        AsyncStorage.getItem('user').then((response)=>{
            console.log('USER ID : ',response)
        })
    }
    render(){
        const {product} = this.state
       // const product=this.props.wishlist.productId
       // console.warn(this.props.wishlist)
        return(
            <ScrollView style={{flex:1, width:'100%', padding:10}}>
            { this.props.wishlist == null ?  
            <View style={[styles.container, styles.horizontal]}>
                {/* <ActivityIndicator size="large" color="#0000ff" /> */}
                <Text>Tidak ada Data</Text>
            </View> 
            : 
            <FlatList
            data={this.props.wishlist.productId}
             renderItem={({item}) => (
             <TouchableOpacity onPress={()=>this.props.navigation.navigate('DetailProduct',{productId:item._id})} key={item.id} activeOpacity={0.9} style={styles.bottomItem} >
                 <View style={{flex: 1, padding: 10, backgroundColor: 'white', borderColor: '#eaeaea', borderWidth: 0.5, flexDirection:'row'}}>
                     <View style={{flex:1, padding: 5}}>
                         <Image source={{uri: /** item.productImg*/item.photo[0]}} style={{flex: 1, width: '100%', height: '100%', resizeMode: 'contain'}}/>
                     </View>
                     <View style={{justifyContent: 'center', flex:2, marginBottom: 5}}>
                         <Text style={{fontSize: 16}} numberOfLines={2}>{/*item.productName*/item.product_name}</Text>
                         <Text style={{fontSize: 14, color: 'red', fontWeight: 'bold'}}>Rp {/*item.price*/item.product_price}</Text><View style={{flexDirection:'row'}}>
                         <Icon name='star' style={{color: 'yellow'}}/>
                         <Icon name='star' style={{color: 'yellow'}}/>
                         <Icon name='star' style={{color: 'yellow'}}/>
                         <Icon name='star' style={{color: 'yellow'}}/>
                         <Icon name='star' style={{color: 'yellow'}}/>
                    </View>
                     </View>
                 </View>
             </TouchableOpacity>
             )}
         />
    }                      
            </ScrollView>
        )
    }
}
class MyView extends Component{
    render(){
        return(
            <ScrollView style={{flex:1, width:'100%', padding:10}}>
                <View style={{justifyContent:'center',alignItems:'center'}}>
                <TouchableOpacity style={{flex:1, backgroundColor:'white', marginBottom:10, borderRadius:10, padding:10, width:'100%'}}>
                    <Text style={{color:'orange', fontWeight:'bold', fontSize:17}}>Fitur sedang dikembangkan</Text>
                </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}
class MyStore extends Component{
    render(){
        return(
            <ScrollView style={{flex:1, width:'100%', padding:10}}>
                <View style={{justifyContent:'center',alignItems:'center'}}>
                <TouchableOpacity style={{flex:1, backgroundColor:'white', marginBottom:10, borderRadius:10, padding:10, width:'100%'}}>
                    <Text style={{color:'orange', fontWeight:'bold', fontSize:17}}>Fitur sedang dikembangkan</Text>
                </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        user : state.user,
    }
  }
  
export default connect(mapStateToProps)(WishLists)
const styles = StyleSheet.create({
    bottomItem: {
      width: '100%',
      height: 100,
    },
    container: {
        flex: 1,
        justifyContent: 'center'
      },
      horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
      }
  })