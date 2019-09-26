import React, {Component} from 'react'
import {View, FlatList, Image, List, TextInput, TouchableOpacity, ScrollView, AsyncStorage} from 'react-native'
import { Tab, CheckBox, Header, Input,Title, Footer, TabHeading, Tabs, CardItem, Layout, Body, Text, Button, Container, Picker, Content, Form, Item, Icon, Label, Card, Right, ListItem, Left} from 'native-base';
import Address from './Address.js'
import InfoAccount from './InfoAccount'
import RoundCheckbox from 'rn-round-checkbox';
import NumericInput from 'react-native-numeric-input';
import { getAllCartItems } from '../publics/redux/actions/products'
import {connect} from 'react-redux'
import axios from 'axios'
import URL from '../publics/redux/actions/URL'

class Cart extends Component{
    state = {
      isSelected:false,
      total : 0,
      totalQty : 0,
      selectedCarts: [],
      change: false,
      dataCart: [],
      dataCartUnique:[]
    }
    
    // onlyUnique(value, index, self) { 
    //   return self.indexOf(value) === index;
    // }
    
    uniqueCart(){
      // let unique = new Set (this.state.dataCart)
      // let uniqueCart = [...unique]
      // this.setState({dataCartUnique:uniqueCart})
      const result = [];
      const map = new Map();
      for (const item of this.state.dataCart) {
          if(!map.has(item._id)){
              map.set(item._id, true);    // set any value to Map
              result.push({
                  checked : false,
                  _id: item._id,
                  product_name: item.product_name,
                  photo: item.photo[0],
                  product_price: item.product_price,
                  qty : 0
              });
          }
      }
      this.setState({dataCartUnique:result})
      let newdataCartUnique = this.state.dataCartUnique.slice() //copy the array
      for (i = 0; i < this.state.dataCartUnique.length; i++) { 
        for (j = 0; j < this.state.dataCart.length; j++) { 
          if (this.state.dataCartUnique[i]._id == this.state.dataCart[j]._id){
            newdataCartUnique[i].qty = this.state.dataCartUnique[i].qty+1 //execute the manipulations
            // this.state.dataCartUnique[i].qty = this.state.dataCartUnique[i].qty+1
          }
        }
        this.setState({dataCartUnique: newdataCartUnique})
      }
    }

    // cartLast(){
      
    // }

    componentDidMount(){
      this.props.dispatch(getAllCartItems(this.props.user.user[0]._id)).then(()=>{
        this.setState({dataCart:this.props.products.cartItem})
        this.uniqueCart()
      })
      this.props.dataCheckOut = []
      // let unique = this.state.dataCart.filter(this.onlyUnique);
      // const result = [];
      // const map = new Map();
      // for (const item of this.state.dataCart) {
      //     if(!map.has(item._id)){
      //         map.set(item._id, true);    // set any value to Map
      //         result.push({
      //             _id: item._id,
      //             product_name: item.product_name,
      //             product_price: item.product_price,
      //             photo: item.photo[0]
      //         });
      //     }
      // }
      // this.cartLast()
}

    toggleCheckbox(id,index) {
      const changedCheckbox = this.state.dataCartUnique.find((cb) => cb._id === id);
    
      changedCheckbox.checked = !changedCheckbox.checked;
    
      const checkboxes = Object.assign({}, this.state.checkboxes, changedCheckbox);
      this.props.products.dataCheckOut.push(this.state.dataCartUnique[index])
      this.setState({ checkboxes });
      this.setState({total:0})
    }

    toggleCheckboxAll() {
      this.state.dataCartUnique.map((item, index) => {
        return( item.checked = !item.checked)
      })
      
      this.setState({isSelected: !this.state.isSelected});
      this.setState({total:0})
    }

    static navigationOptions = {
        headerTitle: 'Keranjang Belanja',
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
            <TouchableOpacity style={{justifyContent:'flex-end', right:'20%'}}>
                    <Icon name='ios-information-circle' style={{ fontSize:20, color: 'white', fontWeight:'bold'}}/>
            </TouchableOpacity>
        ),
    }
    
    renderElementButton(){
      if (this.state.change == true){
        return(
          <View style={{flexDirection:'row'}}>
          <TouchableOpacity>
            <Icon style={{fontSize:22,fontWeight:'bold',color:'#ff8040'}} name='ios-close-circle-outline'/>
          </TouchableOpacity>
          <Text style={{marginLeft:'5%'}}>Hapus Semua</Text>
          </View>
        )}
      else{
        return(
          <View style={{flexDirection:'row'}}>
          <RoundCheckbox
          backgroundColor={'#ff8040'}
          size={24}
          checked={this.state.isSelected}
          onValueChange={() => this.toggleCheckboxAll()}
          >
          </RoundCheckbox>
          <Text style={{marginLeft:'5%'}}>Pilih Semua</Text>
          </View>
        )}
    }

    renderElementChange(){
      if (this.state.change == true){
        return(
          <TouchableOpacity onPress={()=> this.setState({change : !this.state.change})}>
            <Text style={{color:'#ff8040'}}>simpan</Text>
          </TouchableOpacity>
        )
      }
      else{
        return(
          <TouchableOpacity onPress={()=> this.setState({change : !this.state.change})}>
          <Text style={{color:'#ff8040'}}>ubah</Text>
         </TouchableOpacity>
        )
      }
    }

    render(){
      console.log('datacart unk',this.state.dataCartUnique)
      // console.log('datacart'+this.props.products.cartItem)
        return(
          <Container>
            <ScrollView>
            <ListItem>
              <Left >
                { this.renderElementButton() }
              </Left>
              <Right>
              { this.renderElementChange() }
            </Right>
            </ListItem>
            {/* {this.state.items.filter(items => this.state.dataCart.map(item, index)
                          .indexOf(items._id) !== -1 )
            .map(item =>{ */}
          {this.state.dataCartUnique.map((item, index) => {
            // {this.state.dataCartUnique.map((uniq, indexUnique) => {
            //   if(item._id === uniq._id) {
            //     continue;
            //   }
            //   console.log(item._id)
            // }}
            if (item.checked == true){
              // this.state.total = this.state.total + (item.product_price * item.amount)
              this.state.total = this.state.total + item.product_price * item.qty
              this.state.totalQty = this.state.totalQty + item.qty
              // this.props.products.dataCheckOut.concat(this.state.dataCart[index])
             
              // console.log('cekout',this.state.dataCartUnique[index])
              // console.log('cekout2',this.props.products.dataCheckOut)
            }
            if (item.checked == false){
              // this.state.total = this.state.total + (item.product_price * item.amount)
              this.props.products.dataCheckOut.filter(({_id}) => _id !== item._id)            
            }
            if (this.state.change == true){
              return(
              <ListItem>
            <TouchableOpacity>
              <Icon style={{fontSize:30,color:'#ff8040'}} name='ios-close-circle-outline' />
            </TouchableOpacity>
            <Image style={{width:100, height:100}} source={{uri:item.photo}}/>
            <Body>
              <Text>{item.product_name}</Text>
              <NumericInput style={{color:'grey', fontSize:15}} 
                // onChange={value => item.qty= value }
                value={item.qty}
                onChange={(value)=>{
                  let newdataCartUnique = this.state.dataCartUnique.slice() //copy the array
                  newdataCartUnique[index].qty=value
                  this.setState({dataCartUnique:newdataCartUnique})
                }}
              />
              <Text style={{fontWeight:'bold'}}>Rp {parseInt(item.product_price) * item.qty}</Text>
              {/* <Text style={{fontWeight:'bold'}}>Rp {parseInt(item.product_price)}</Text> */}
            </Body> 
            </ListItem>
            )}
            else{
            return (
            <ListItem>
            <RoundCheckbox
                size={24}
                backgroundColor={'#ff8040'}
                key={item._id}
                checked={item.checked}
                onValueChange={() => this.toggleCheckbox(item._id,index)}
            />
            <Image style={{width:100, height:100}} source={{uri:item.photo}}/>
            <Body>
              <Text>{item.product_name}</Text>
              <Text style={{color:'grey', fontSize:15}}>x{item.qty}</Text>
              <Text style={{fontWeight:'bold'}}>Rp {parseInt(item.product_price) * item.qty}</Text>
              {/* <Text style={{fontWeight:'bold'}}>Rp {item.product_price}</Text> */}
            </Body>
          </ListItem>)}
          })}
          </ScrollView>
          <ListItem>
            <Left>
            <Text style={{fontWeight:'bold'}}>Total Pesanan</Text>
            </Left>
            <Right>
              <Text style={{color:'red',fontWeight:'bold'}}>{this.state.total}</Text>
            </Right>
          </ListItem>
          <Footer style={{backgroundColor:'white'}}>
           <Button onPress={() => {this.props.navigation.navigate('CheckOut',{total : this.state.total})}} style={{width: '90%', backgroundColor: '#ff8040', justifyContent:'center'}}>
              <Text >Beli Sekarang</Text>
            </Button>
          </Footer>
          </Container>
        )
    }
}

const mapStateToProps = (state) =>{
    
    return {
        products : state.products,
        user: state.user
    }
  }
  
export default connect(mapStateToProps)(Cart)