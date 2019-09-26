import React, { Component } from 'react'
import { FlatList, Image, List, TextInput,Alert,TouchableOpacity, ScrollView, AppRegistry, StyleSheet, View, Text } from 'react-native'
import { Tab, CheckBox, Header, Title, Footer, TabHeading, Tabs, CardItem, Layout, Body, Button, Container, Picker, Content, Form, Item, Icon, Label, Card, Right, ListItem, Left} from 'native-base';
import { ViewPager } from 'rn-viewpager'
import { getAllCartItems, checkoutPembelian } from '../publics/redux/actions/products'
import {connect} from 'react-redux'

import StepIndicator from 'react-native-step-indicator'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

const PAGES = ['Page 1', 'Page 2', 'Page 3']

const secondIndicatorStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 40,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#ff8040',
  stepStrokeWidth: 3,
  separatorStrokeFinishedWidth: 4,
  stepStrokeFinishedColor: '#fe7013',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#fe7013',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#fe7013',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ff8040',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: 'white',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: 'black',
  labelSize: 13,
  labelAlign: 'center',
  currentStepLabelColor: '#fe7013'
}

class CheckOut extends Component {
  constructor () {
    super()
    this.state = {
      currentPage: 0,
      total : 0,
      date  : '',
      dataCart: [],
      checkOutProduct:[]
    }
  }
  
  // componentDidMount() {
  //   this.props.dispatch(getAllCartItems(this.props.user.user[0]._id)).then(()=>{
  //     this.setState({dataCart:this.props.products.cartItem})
  //   })
    // let that = this;
    // let date = new Date().getDate(); //Current Date
    // let month = new Date().getMonth() + 1; //Current Month
    // let year = new Date().getFullYear(); //Current Year
    // let hours = new Date().getHours(); //Current Hours
    // let min = new Date().getMinutes(); //Current Minutes
    // let sec = new Date().getSeconds(); //Current Seconds
    // that.setState({
    //   //Setting the value of the date time
    //   date:
    //     date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec,
    // });
// }

  componentWillReceiveProps (nextProps, nextState) {
    if (nextState.currentPage != this.state.currentPage) {
      if (this.viewPager) {
        this.viewPager.setPage(nextState.currentPage)
      }
    }
  }

  static navigationOptions = {
    headerTitle: 'Pembelian',
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

onCheckoutButton(){
  
  // console.log('cart item', this.props.products.cartItem);
  console.log('user_id', this.props.user.user[0]._id);
  // console.log('total', this.state.total);

  
  Alert.alert(
    'Peringatan',
    'Apakah akan melakukan Transaksi ini ?',
    [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => {
        const data = {
          cartItem:  this.state.checkOutProduct,
          userId: this.props.user.user[0]._id,
          total: this.state.total
        }

        this.props.dispatch(checkoutPembelian(data));
        this.props.navigation.navigate('Home')
      }},
    ],
    {cancelable: true},
  );
  
  
  // this.props.dispatch(checkoutPembelian(this.props.products.cartItem, this.props.user._id, this.state.total));
}

render () {
    return (
      <View style={styles.container}>
        <View style={styles.stepIndicator}>
          <StepIndicator
            customStyles={secondIndicatorStyles}
            currentPosition={this.state.currentPage}
            onPress={this.onStepPress}
            stepCount={3}
            labels={[
              'Alamat',
              'Pesanan',
              'Pembayaran',
            ]}
          />
        </View>
        <ViewPager
          style={{ flexGrow: 1}}
          ref={viewPager => {
            this.viewPager = viewPager
          }}
          onPageSelected={page => {
            this.setState({ currentPage: page.position })
          }}
        >
           
          {PAGES.map((page) => {
              if (page=='Page 1'){
                  return(
                    <Container style={{paddingTop:'10%', alignContent:'center'}}>  
                    <CardItem>
                    <View style={{flexDirection:'row'}}>
                      <Left>
                      <Text style={{fontWeight:'bold'}}>Alamat</Text>
                      </Left>
                      <Right >
                      <TouchableOpacity onPress={() => {this.props.navigation.navigate('EditAddress')}}>
                        <Text style={{color:'#ff8040'}}>Ubah</Text>
                      </TouchableOpacity>
                      </Right>
                    </View>
                  </CardItem>
                  <View style={{height: '82%'}}>
                      <View style={{marginLeft:'8%', flexDirection:'column'}}>
                      <Text>Jl. Kaliurang, KM 10</Text>
                      <Text>Sleman</Text>
                      <Text>YogyaKarta</Text>
                      </View>
                  </View>
                <Footer style={{backgroundColor:'white'}}>
                <Button onPress={()=>{this.onStepPressButton()}} style={{width: '90%', backgroundColor: '#ff8040', justifyContent:'center'}}>
                   <Text style={{fontWeight:'bold', fontSize:17,color:'white'}}>Lanjut</Text>
                 </Button>
               </Footer>
               </Container>
               )
              }
              if (page=='Page 2'){
                return(
                    <Container >
                    <CardItem >
                    <View style={{flexDirection:'row'}}>
                    <Left>
                    <Text style={{fontWeight:'bold'}}>Detail Pembelian</Text>
                    </Left>
                    </View>
                    </CardItem>
                    <View style={{height: '82%'}}>
                    <ScrollView >
                    {(this.props.products.dataCheckOut).map((item, index) => {
                    // this.state.total = this.state.total + (item.price * item.amount)
                    this.state.total = this.state.total + item.product_price * item.qty
                    return (
                    <ListItem>
                    <Image style={{width:100, height:100}} source={{uri:item.photo}}/>
                    <Body>
                      <Text>{item.product_name}</Text>
                      <Text>x{item.qty}</Text>
                      {/* <Text style={{fontWeight:'bold'}}>Rp {item.amount * item.price}</Text> */}
                      <Text style={{fontWeight:'bold'}}>Rp {item.product_price * item.qty}</Text>
                    </Body>
                  </ListItem>)
                  })}
                  </ScrollView>
                  </View>
                <Footer style={{backgroundColor:'white'}}>
                <Button onPress={()=>{this.onStepPressButton()}} style={{width: '90%', backgroundColor: '#ff8040', justifyContent:'center'}}>
                   <Text style={{fontWeight:'bold', fontSize:17,color:'white'}}>Lanjut</Text>
                 </Button>
               </Footer>
                  </Container>
                )
              }
              if (page=='Page 3'){
                  return(
                    <Container >
                    <CardItem >
                    <View style={{flexDirection:'row'}}>
                    <Left>
                    <Text style={{fontWeight:'bold'}}>Transaksi Pembelian</Text>
                    </Left>
                    <Right>
                    <Text>{this.state.date}</Text>
                    </Right>
                    </View>
                    </CardItem>
                    <View style={{height: '72%'}}>
                    {(this.props.products.dataCheckOut).map((item, index) => {
                   this.state.checkOutProduct.push(item._id)
                   
                    return (
                      <View style={{marginLeft:'5%'}}>
                      <Text>{item.product_name}</Text>
                      <Text> x{item.qty}</Text>
                      {/* <Text> x{item.amount}</Text> */}
                      <Text style={{fontWeight:'bold'}}>Rp {item.product_price * item.qty}</Text>
                      </View>
                    )
                  })
                  
                  }
                  
                  </View>
                   <ListItem>
            <Left>
            <Text style={{fontWeight:'bold'}}>Total Pesanan</Text>
            </Left>
            <Right>
              <Text style={{color:'red',fontWeight:'bold'}}>{this.state.total}</Text>
            </Right>
          </ListItem>
                <Footer style={{backgroundColor:'white'}}>
                <Button onPress={()=>{this.onCheckoutButton()}} style={{width: '90%', backgroundColor: '#ff8040', justifyContent:'center'}}>
                   <Text style={{fontWeight:'bold', fontSize:17,color:'white'}}>Bayar</Text>
                 </Button>
               </Footer>
                  </Container>
                  )
              }
          })}
        </ViewPager>
        
      </View>
    )
  }

  onStepPress = position => {
    this.setState({ currentPage: position })
    this.viewPager.setPage(position)
    this.setState({ total: 0 })
  }

  onStepPressButton = () => {
    this.setState({ total: 0 })
    this.viewPager.setPage(this.state.currentPage+1)
  }

//   renderViewPagerPage = data => {
//     return (
//       <View style={styles.page}>
//         <Text>{data}</Text>
//       </View>
//     )
//   }

  renderLabel = ({ position, stepStatus, label, currentPosition }) => {
    return (
      <Text
        style={
          position === currentPosition
            ? styles.stepLabelSelected
            : styles.stepLabel
        }
      >
        {label}
      </Text>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  stepIndicator: {
    backgroundColor: '#d9d9d9',
    justifyContent:'center',
  },
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  stepLabel: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
    color: '#ff8040'
  },
  stepLabelSelected: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
    color: '#4aae4f'
  }
})

const mapStateToProps = (state) =>{
    
  return {
      products : state.products,
      user: state.user
  }
}

export default connect(mapStateToProps)(CheckOut)