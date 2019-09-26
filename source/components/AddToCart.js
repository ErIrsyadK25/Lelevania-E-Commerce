import React, {Component} from 'react'
import {View, Text, TouchableOpacity,AsyncStorage} from 'react-native'
import NumericInput from 'react-native-numeric-input';

import {connect} from 'react-redux'
import {addToCart,getAllCartItems} from '../publics/redux/actions/products'

class AddToCart extends Component{
    constructor(props){
        super(props)
        this.state = {
            qty:1,
            // product_idQty:[],
            product_id: props.navigation.state.params.product_id,
            product_name: props.navigation.state.params.product_name,
            product_price: props.navigation.state.params.product_price,
            profileImage: props.navigation.state.params.profileImage,
            userId:''
        }
    }

    addCart = () => {
        let product_idQty = [];
        let product_idQtyLast=[];

        // Set state
        for (i = 0; i < this.props.cartItem.length; i++) { 
            product_idQty.push(this.props.cartItem[i]._id)
        }

        for (i = 0; i < this.state.qty; i++) { 
            product_idQty.push(this.props.productById.product_id)
        }
        
        console.log('sebelum cart id',product_idQty)
        product_idQtyLast.push({ field : 'products', value: product_idQty})
        console.log('sebelum cart',product_idQtyLast)
        this.props.dispatch(
            addToCart(product_idQtyLast, this.props.user.user[0]._id),
        )
        const { navigation } = this.props;
        navigation.navigate('Home')
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
        console.log('userId dari redux: ',this.props.user.user[0]._id)
        if(this.props.user.user[0]._id===undefined){
            AsyncStorage.getItem('user').then((userData)=>{
                this.props.dispatch(getAllCartItems(userData))
                this.setState({userId:userData})
            })
        }
        else{
            this.props.dispatch(getAllCartItems(this.props.user.user[0]._id))
            this.setState({userId:this.props.user.user[0]._id})
        }
    }
    render(){
        // console.log('idproduct'+this.props.productById.product_id)
        // console.log('idproduct'+this.props.user.user[0]._id)
        return(
            <View style={{flex:1, alignItems:'center',  backgroundColor:'#F4F4F4'}}>
                <View style={{flex:1, padding:20, justifyContent:'center', width:'100%'}}>
                    <Text style={{fontSize:18, fontWeight:'bold', marginBottom:10, marginTop:15, color:'orange'}}>{this.state.product_name}</Text>
                    <View style={{alignItems:'center', flexDirection:'row', alignItems:'center', backgroundColor:'white', alignItems:'center', justifyContent:'center', height:'100%'}}>
                        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                            <Text style={{color:'#ff8040'}}>Rp {this.state.product_price * this.state.qty}</Text>
                        </View>
                        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                            <NumericInput 
                                value={this.state.qty}
                                onChange={(value)=>this.setState({qty:value})}
                            />
                        </View>
                    </View>
                </View>
                <View style={{flex:5, width:'100%', padding:20}}>
                    <TouchableOpacity style={{backgroundColor:'#ff8040', padding:15, borderRadius:5, alignItems:'center', justifyContent:'center', width:'100%'}} 
                        onPress={() => {this.addCart()}}
                        >
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