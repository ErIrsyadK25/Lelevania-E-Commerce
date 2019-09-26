import React, {Component} from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import NumericInput from 'react-native-numeric-input';

import {connect} from 'react-redux'
import {addToCart} from '../configs/redux/actions/products'

class AddToCart extends Component{
    constructor(props){
        super(props)
        this.state = {
            stock:1,
            product_id: props.navigation.state.params.productId.product_id,
            product_name: props.navigation.state.params.productId.product_name,
            product_price: props.navigation.state.params.productId.product_price,
            profileImage: props.navigation.state.params.productId.profileImage
        }
    }
    static navigationOptions = ({navigation}) => {
        return {
            headerStyle: {
                backgroundColor : '#ff8040',
                elevation:0
            },
            headerTintColor: 'white',
            headerTitle: <Text style={{color:'white', fontWeight:'bold', fontSize:20}}>Add To Cart</Text>
        }
    }
    componentDidMount(){
        console.warn('state global cart: ',this.props.cartItem)
    }
    addToCart = () =>{
        const {stock,product_id,product_name,product_price,profileImage} = this.state
        const dataCart = {
            stock:stock,
            product_id:product_id,
            product_name:product_name,
            product_price:product_price*stock,
            profileImage:profileImage,
            userId:this.props.user.user[0]._id
        }
        this.props.dispatch(addToCart(dataCart))
    }
    render(){
        return(
            <View style={{flex:1, alignItems:'center',  backgroundColor:'#F4F4F4'}}>
                <View style={{flex:1, padding:20, justifyContent:'center', width:'100%'}}>
                    <Text style={{fontSize:18, fontWeight:'bold', marginBottom:10, marginTop:15, color:'orange'}}>{this.state.product_name}</Text>
                    <View style={{alignItems:'center', flexDirection:'row', alignItems:'center', backgroundColor:'white', alignItems:'center', justifyContent:'center', height:'100%'}}>
                        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                            <Text style={{color:'#ff8040'}}>Rp {this.state.product_price * this.state.stock}</Text>
                        </View>
                        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                            <NumericInput 
                                value={this.state.stock}
                                onChange={(value)=>this.setState({stock:value})}
                            />
                        </View>
                    </View>
                </View>
                <View style={{flex:5, width:'100%', padding:20}}>
                    <TouchableOpacity style={{backgroundColor:'#ff8040', padding:15, borderRadius:5, alignItems:'center', justifyContent:'center', width:'100%'}} onPress={this.addToCart}>
                        <Text style={{color:'white', fontSize:18}}>Simpan</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) =>{
    
    return {
        productById : state.products.productById,
        cartItem: state.products.cartItem,
        user : state.user
    }
  }

export default connect(mapStateToProps)(AddToCart)