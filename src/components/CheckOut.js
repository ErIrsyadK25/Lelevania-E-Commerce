import React, { Component } from 'react'
import { FlatList, Image, List, TextInput, TouchableOpacity, ScrollView, AppRegistry, StyleSheet, View, Text } from 'react-native'
import { Tab, CheckBox, Header, Title, Footer, TabHeading, Tabs, CardItem, Layout, Body, Button, Container, Picker, Content, Form, Item, Icon, Label, Card, Right, ListItem, Left} from 'native-base';
import { ViewPager } from 'rn-viewpager'

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

export default class App extends Component {
  constructor () {
    super()
    this.state = {
      currentPage: 0,
      total : 0,
      date: '',
      dataCart: [
        { checked: false, id: "06", name: "Sabun" , image: "http://cdn.elevenia.co.id/g/2/3/4/0/7/3/22234073_B.jpg", amount:1, price:10000 },
        { checked: false, id: "07", name: "Susu" , image: "http://cdn.elevenia.co.id/g/2/3/4/0/7/3/22234073_B.jpg", amount:3, price:20000},
        { checked: false, id: "00", name: "Ayam" , image: "http://cdn.elevenia.co.id/g/2/3/4/0/7/3/22234073_B.jpg", amount:4, price:50000},
        { checked: false, id: "06", name: "Sabun" , image: "http://cdn.elevenia.co.id/g/2/3/4/0/7/3/22234073_B.jpg", amount:1, price:10000 },
        { checked: false, id: "07", name: "Susu" , image: "http://cdn.elevenia.co.id/g/2/3/4/0/7/3/22234073_B.jpg", amount:3, price:20000},
        { checked: false, id: "00", name: "Ayam" , image: "http://cdn.elevenia.co.id/g/2/3/4/0/7/3/22234073_B.jpg", amount:4, price:50000},
      ],
    }
  }
  
  componentDidMount() {
    let that = this;
    let date = new Date().getDate(); //Current Date
    let month = new Date().getMonth() + 1; //Current Month
    let year = new Date().getFullYear(); //Current Year
    let hours = new Date().getHours(); //Current Hours
    let min = new Date().getMinutes(); //Current Minutes
    let sec = new Date().getSeconds(); //Current Seconds
    that.setState({
      //Setting the value of the date time
      date:
        date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec,
    });
}

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
                      <Text>jalan</Text>
                      <Text>kota</Text>
                      <Text>provinsi</Text>
                      <Text>no telepon</Text>
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
                    {(this.state.dataCart).map((item, index) => {
                    this.state.total = this.state.total + (item.price * item.amount)
                    return (
                    <ListItem>
                    <Image style={{width:100, height:100}} source={{uri:item.image}}/>
                    <Body>
                      <Text>{item.name}</Text>
                      <Text>{item.amount}</Text>
                      <Text style={{fontWeight:'bold'}}>Rp {item.amount * item.price}</Text>
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
                    {(this.state.dataCart).map((item, index) => {
                    this.state.total = this.state.total + (item.price * item.amount)
                    return (
                      <View style={{marginLeft:'5%', flexDirection:'row'}}>
                      <Text>{item.name}</Text>
                      <Text> x{item.amount}</Text>
                      <Text style={{fontWeight:'bold'}}> : Rp {item.amount * item.price}</Text>
                      </View>
                    )
                  })}
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
                <Button onPress={()=>{this.onStepPressButton()}} style={{width: '90%', backgroundColor: '#ff8040', justifyContent:'center'}}>
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
  }

  onStepPressButton = () => {
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