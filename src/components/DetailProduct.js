import React, {Component} from 'react'
import {View, Text, TouchableOpacity, Dimensions, TextInput, SafeAreaView, Image, ScrollView} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Carousel from 'react-native-snap-carousel'
import { Container, Header, Left, Body, Right, Button, Icon, Title, Thumbnail, Footer, FooterTab } from 'native-base';
import { getProductById } from '../configs/redux/actions/products'
import {connect} from 'react-redux'

const {height, width} = Dimensions.get('window')

class DetailProduct extends Component{
    constructor(props){
        super(props)
        this.state = {
            activeIndex:0,
            carouselItems:[]
        }
    }
    static navigationOptions = ({navigation}) => {
        return {
            header: null
        }
    }
    _renderItem({item,index}){
        return (                
            <Image style={{flex:1, resizeMode:'contain',}} source={{uri:item}} />
        )
    }
    prevCarouselImage = () =>{
        this.state.activeIndex>0?
        this.carousel._snapToItem(this.state.activeIndex-1) : this.carousel._snapToItem(this.state.carouselItems.length-1)
    }
    nextCarouselImage = () =>{
        this.state.activeIndex<this.state.carouselItems.length-1?
        this.carousel._snapToItem(this.state.activeIndex+1) : this.carousel._snapToItem(0)
    }

    componentDidMount(){
        const { navigation } = this.props;
        const productId = navigation.getParam('productId', '');
        this.props.dispatch(getProductById(productId)).then(()=>this.setState({carouselItems:this.props.productById.Photo}))
    }

    render(){
        console.log(this.props.productById)
        data = this.props.productById.numberOfProduct;
        let productNo = data;
        return(
            <View style={{flex:1}}>
                <Header androidStatusBarColor="#ff8040" style={{backgroundColor : '#ff8040'}}>
                    <Left>
                        <Button transparent onPress={()=>this.props.navigation.goBack()}>
                        <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>{this.props.productById.Category}</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                        <Icon name='ios-search' style={{fontSize:25}} />
                        </Button>
                        <Button transparent onPress={()=>this.props.navigation.navigate('Cart')}>
                        <Icon name='ios-cart' style={{fontSize:25}} />
                        </Button>
                        <Button transparent>
                        <Icon name='more' style={{fontSize:25}} />
                        </Button>
                    </Right>
                </Header>
                    
                <ScrollView style={{backgroundColor:'#e8eaed'}}>
                    <View style={{height:500, flex: 5}}>
                        <Carousel
                            ref={ref=>this.carousel = ref}
                            data={this.props.productById.Photo}
                            sliderWidth={width}
                            itemWidth={width}
                            renderItem={this._renderItem}
                            onSnapToItem={
                                index=>this.setState({activeIndex:index})
                            }
                        />
                        <View style={{position:'absolute', flexDirection:'row', bottom:20, left:0, right:0, justifyContent: 'center'}}>
                            {this.state.carouselItems.map((item,i)=>
                                <View key={i} style={{width:8, height:8, borderRadius:25, backgroundColor: this.state.activeIndex == i ? 'orange' : 'grey', margin:3}} />
                            )}
                        </View>

                    </View>
                    <View style={{backgroundColor:'white', width:'100%', flex: 1, padding: 20, justifyContent: 'space-evenly'}}>
                        <View style={{flex: 2}}>
                            <Text style={{fontSize: 16}}>{this.props.productById.product_name}</Text>
                        </View>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-evenly'}}>
                            <View style={{flex:1}}>
                                <Text style={{color: '#ff8040'}}>Rp {this.props.productById.product_price}</Text>
                            </View>
                            <View style={{flex:1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                                <FontAwesome style={{fontSize:20, color:'#000000'}} name="share-alt"/>
                                <FontAwesome style={{marginLeft: 10, fontSize:20, color:'#d9d9d9'}} name="heart"/>
                            </View>
                        </View>
                    </View>

                    <View style={{marginTop: 20, backgroundColor:'white', width:'100%', flex: 1, padding: 20, alignContent: 'space-around'}}>
                       <View style={{flex:1, flexDirection: 'row'}}>
                           <FontAwesome style={{fontSize:20, color:'#000000', marginRight: 15}} name="map-marker"/> 
                           <Text>Dikirim dari : {this.props.productById.location} </Text>
                        </View> 
                       <View style={{flex:1, flexDirection: 'row'}}>
                           <FontAwesome style={{fontSize:20, color:'#000000', marginRight: 15}} name="user"/> 
                           <Text>Kurir Pribadi</Text>
                        </View> 
                    </View>

                    <View style={{marginTop: 20, flex:1, padding: 20, backgroundColor:'white'}}>
                        <View style={{flex: 1, justifyContent: 'space-between', flexDirection: 'row'}}>
                            <Text>Seller</Text>
                            <Text>+ Favorit</Text>
                        </View>

                        <View style={{flex: 2, flexDirection: 'row', alignContent: 'center', paddingBottom: 10, paddingTop: 10}}>
                            <View>
                                <Thumbnail source={{uri: this.props.productById.profileImage}} />
                            </View>
                            <View style={{flex:1, justifyContent: 'center', marginLeft: 10}}>
                                <Text style={{fontWeight: 'bold'}}>{this.props.productById.seller}</Text>
                                <Text>Premium Seller</Text>
                            </View>
                        </View>

                        <TouchableOpacity style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{color: '#ff8040', fontSize: 16}}>LIHAT SELLER STORE</Text>
                        </TouchableOpacity>
                    </View>
                    
                    <View style={{marginTop: 20, flex:1, padding: 20, backgroundColor:'white', marginBottom: 50}}>
                        <Text style={{fontSize: 16, color: '#ff8040', marginBottom: 10}}>Rincian</Text>
                        <View style={{flex:1, flexDirection: 'row', marginTop: 10}}>
                            <View style={{flex:1}}>
                                <Text>Stok</Text>
                            </View>
                            <View style={{flex:1}}>
                                <Text>{this.props.productById.stock}</Text>
                            </View>
                        </View>

                        <View style={{flex:1, flexDirection: 'row', marginTop: 10}}>
                            <View style={{flex:1}}>
                                <Text>Kondisi Produk</Text>
                            </View>
                            <View style={{flex:1}}>
                                <Text>{this.props.productById.condition}</Text>
                            </View>
                        </View>

                        <View style={{flex:1, flexDirection: 'row', marginTop: 10}}>
                            <View style={{flex:1}}>
                                <Text>Nomor Produk</Text>
                            </View>
                            <View style={{flex:1}}>
                                <Text>{productNo}</Text>
                            </View>
                        </View>

                        <View style={{flex:1, flexDirection: 'row', marginTop: 10}}>
                            <View style={{flex:1}}>
                                <Text>Berat Produk</Text>
                            </View>
                            <View style={{flex:1}}>
                                <Text>{this.props.productById.productWeight}</Text>
                            </View>
                        </View>

                        <View style={{flex:1, flexDirection: 'row', marginTop: 10}}>
                            <View style={{flex:1}}>
                                <Text>Negara Asal</Text>
                            </View>
                            <View style={{flex:1}}>
                                <Text>{this.props.productById.countryOfOrigin}</Text>
                            </View>
                        </View>

                        <View style={{flex:1, flexDirection: 'row', marginTop: 10}}>
                            <View style={{flex:1}}>
                                <Text>Status Garansi</Text>
                            </View>
                            <View style={{flex:1}}>
                                <Text>{this.props.productById.warranty ? this.props.productById.warranty : '-'}</Text>
                            </View>
                        </View>

                    </View>
                    
                </ScrollView>
                <Footer >
                    <FooterTab>
                    <Button full style={{backgroundColor: '#ff8040'}} onPress={()=>this.props.navigation.navigate('AddToCart', {productId:this.props.productById})}>
                        <Text style={{color: 'white', fontWeight: 'bold'}}>Beli Sekarang</Text>
                    </Button>
                    </FooterTab>
                </Footer>
            </View>
        )
    }
}

const mapStateToProps = (state) =>{
    
    return {
        productById : state.products.productById
    }
  }
  
export default connect(mapStateToProps)(DetailProduct)