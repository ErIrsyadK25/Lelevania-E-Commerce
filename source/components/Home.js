import React, {Component} from 'react'
import {View, Text, TouchableOpacity, Dimensions, TextInput, SafeAreaView, Image, ScrollView, AsyncStorage} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Carousel from 'react-native-snap-carousel'
//redux
import {getAllCategories,profile} from '../publics/redux/actions/user'
import {getWishList} from '../publics/redux/actions/user';
import {connect} from 'react-redux'

const {height, width} = Dimensions.get('window')

class Home extends Component{
    constructor(props){
        super(props)
        this.state = {
            activeIndex:0,
            carouselItems:[
                'https://cdn.elevenia.co.id/browsing/banner/2019/07/05/7710/201907051809053819_9793652_1.jpg',
                'https://cdn.elevenia.co.id/browsing/banner/2019/07/08/8263/2019070810520808500_9791761_1.jpg',
                'https://cdn.elevenia.co.id/browsing/banner/2019/07/10/8263/2019071009451038170_9111919_1.jpg',
                'https://cdn.elevenia.co.id/browsing/banner/2019/07/08/8263/2019070809500840930_9111919_1.jpg',
                'https://cdn.elevenia.co.id/browsing/banner/2019/07/08/8263/2019070811000838746_9793495_1.jpg'
            ],
            categoryHeader:[
                {
                    key:0,
                    category:'Home'
                },
                {
                    key:1,
                    category:'Top 100'
                },
                {
                    key:2,
                    category:'Daily Deals'
                },
                {
                    key:3,
                    category:'E-Mart'
                }
            ],
            anotherFeature:[
                {
                    key:0,
                    feature:'Pulsa'
                },
                {
                    key:1,
                    feature:'Paket Data'
                },
                {
                    key:2,
                    feature:'PLN'
                },
                {
                    key:3,
                    feature:'Voucher'
                }
            ],
            selectedFeature:0,
            product:[
                {url: 'http://cdn.elevenia.co.id/ex_t/R/348x348/1/85/1/src/g/6/8/2/0/5/5/28682055_B.jpg', productName:'Erika TOP - Atasan Wanita Blouse Wanita', price: '99.000'},
                {url: 'http://cdn.elevenia.co.id/ex_t/R/348x348/1/85/1/src/g/6/8/2/0/5/5/28682055_B.jpg', productName:'Erika TOP - Atasan Wanita Blouse Wanita', price: '99.000'},
                {url: 'http://cdn.elevenia.co.id/ex_t/R/348x348/1/85/1/src/g/6/8/2/0/5/5/28682055_B.jpg', productName:'Erika TOP - Atasan Wanita Blouse Wanita', price: '99.000'},
                {url: 'http://cdn.elevenia.co.id/ex_t/R/348x348/1/85/1/src/g/6/8/2/0/5/5/28682055_B.jpg', productName:'Erika TOP - Atasan Wanita Blouse Wanita', price: '99.000'},
                {url: 'http://cdn.elevenia.co.id/ex_t/R/348x348/1/85/1/src/g/6/8/2/0/5/5/28682055_B.jpg', productName:'Erika TOP - Atasan Wanita Blouse Wanita', price: '99.000'},
            ]
        }
    }
    static navigationOptions = ({navigation}) => {
        return {
            headerStyle: {
                backgroundColor : '#ff8040',
                elevation:0
            },
            headerLeft: (
                <TouchableOpacity style={{marginLeft:15}} onPress={()=>navigation.openDrawer()}>
                    <FontAwesome style={{fontSize:25, color:'white'}} name="bars" />
                </TouchableOpacity>
            ),
            headerTitle: (
                <View style={{ padding:10, flex:1, flexDirection:'row' }}>
                    <View style={{flex:6, flexDirection:'row', backgroundColor:'#e0792b', opacity:0.5, alignItems:'center', justifyContent:'center', borderRadius:5}}>
                        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}><FontAwesome name="search" style={{color:'white',fontSize:20}} /></View>
                        <View style={{flex:5, justifyContent:'center'}}><TextInput placeholder="Cari di elevania" placeholderTextColor="white"/></View>
                    </View>

                    {/* cart stock */}
                    <TouchableOpacity style={{flex:1, alignItems:'center', justifyContent:'center'}} onPress={()=>navigation.navigate('Cart')}>
                        <FontAwesome style={{fontSize:25, color:'white'}} name="cart-arrow-down"/>
                        {/* <View style={{position:'absolute', width:20, height:20, borderRadius:15, backgroundColor:'white', top:0, right:0, alignItems:'center', justifyContent:'center'}}>
                            <Text style={{color:'orange', fontSize:15}}>4</Text>
                        </View> */}
                    </TouchableOpacity>

                    {/* notification */}
                    <TouchableOpacity style={{flex:1, alignItems:'center', justifyContent:'center'}} onPress={()=>navigation.navigate('Notifications')}>
                        <FontAwesome style={{fontSize:25, color:'white'}} name="bell"/>
                        {/* <View style={{position:'absolute', width:20, height:20, borderRadius:15, backgroundColor:'white', top:0, right:0, alignItems:'center', justifyContent:'center'}}>
                            <Text style={{color:'orange', fontSize:15}}>6</Text>
                        </View> */}
                    </TouchableOpacity>
                </View>
            ),
        }
    }
    _renderItem({item,index}){
        return (                
            <Image style={{flex:1, resizeMode:'contain',}} source={{uri:item}} />
        )
    }
    componentWillMount(){
        this.props.dispatch(getAllCategories())
        if (this.props.user.user[0] != null) {
            this.props.dispatch(getWishList(this.props.user.user[0]._id))
        } else {
            AsyncStorage.getItem('user').then((keyValue) => {
                this.props.dispatch(getWishList(keyValue))
            },(error) => {
                console.log(error)
            });
            
        }
        this.intervalCarousel = setInterval(()=>{
            this.nextCarouselImage()
        },5000)
        AsyncStorage.getItem('token').then((keyValue) => {
            console.log(keyValue)
            console.log('panjang asyncstorage ',keyValue.length)
        },(error) => {
            console.log(error)
        });

        // AsyncStorage.getItem('user').then((userData)=>{
        //     this.props.dispatch(profile(userData))
        //     console.log('ini adalah nilai asyncstorage dari userDataaaaa:', userData)
        // })
    }
    componentWillUnmount(){
        clearInterval(this.intervalCarousel)
    }
    prevCarouselImage = () =>{
        this.state.activeIndex>0?
        this.carousel._snapToItem(this.state.activeIndex-1) : this.carousel._snapToItem(this.state.carouselItems.length-1)
    }
    nextCarouselImage = () =>{
        this.state.activeIndex<this.state.carouselItems.length-1?
        this.carousel._snapToItem(this.state.activeIndex+1) : this.carousel._snapToItem(0)
    }
    render(){
        return(
            <View style={{flex:1}}>
                <View style={{flexDirection:'row', backgroundColor:'#ff8040', padding:15}}>
                    {this.state.categoryHeader.map((item,i)=>
                        <TouchableOpacity key={item.key} style={{flex:1,alignItems:'center', justifyContent:'center'}}>
                            <Text style={{color:'white'}}>{item.category}</Text>
                        </TouchableOpacity>
                    )}
                </View>
                <ScrollView style={{flex:15, backgroundColor:'#e8eaed', height:'100%'}}>
                    <View style={{height:175}}>
                        <Carousel
                            ref={ref=>this.carousel = ref}
                            data={this.state.carouselItems}
                            sliderWidth={width}
                            itemWidth={width}
                            renderItem={this._renderItem}
                            onSnapToItem={
                                index=>this.setState({activeIndex:index})
                            }
                        />
                        <View style={{position:'absolute', flexDirection:'row', backgroundColor:'grey', width:'35%', bottom:0, right:0, padding:5}}>
                            <View style={{flex:1, alignItems:'center', justifyContent:'center'}}><FontAwesome style={{color:'white', fontSize:15}} name="list" /></View>
                            <View style={{flex:3, alignItems:'center', justifyContent:'center'}}><Text style={{color:'white', fontSize:11}}>Semua Promo</Text></View>
                        </View>
                        <View style={{position:'absolute', flexDirection:'row', bottom:20, left:10}}>
                            {this.state.carouselItems.map((item,i)=>
                                <View key={i} style={{width:8, height:8, borderRadius:25, backgroundColor: this.state.activeIndex == i ? '#ff8040' : '#e8eaed', margin:3}} />
                            )}
                        </View>
                    </View>
                    <View style={{flexDirection:'row', backgroundColor:'white', padding:15}}>
                        {this.state.anotherFeature.map((feature,i)=>
                        <TouchableOpacity onPress={()=>this.setState({selectedFeature:feature.key})} key={feature.key} style={{flex:1,alignItems:'center', justifyContent:'center'}}>
                            <View style={{height:25}}><Text style={{color: this.state.selectedFeature == i ? 'orange' : 'grey', fontSize:13}}>{feature.feature}</Text></View>
                            <View style={{marginTop:10, width:'100%', height:1, backgroundColor: this.state.selectedFeature == i ? 'orange' : 'white'}} />
                        </TouchableOpacity>
                        )}
                        <View style={{flex:1,alignItems:'center', justifyContent:'center'}}>
                            <View style={{height:25}}><FontAwesome style={{color:'black', fontSize:25}} name="ellipsis-h"/></View>
                            <View style={{marginTop:10, width:'100%', height:1, backgroundColor:'white'}} />
                        </View>
                    </View>
                    <View style={{flexDirection:'row', flex:1, alignItems:'center', justifyContent:'center', backgroundColor:'white'}}>
                        <View style={{flex:1, alignItems:'center', justifyContent:'center', marginLeft:10}}>
                            <TextInput style={{width:'100%'}} placeholder="Nomor Tujuan" underlineColorAndroid="#e8eaed"/>
                        </View>
                        <View style={{flex:1, padding:25}}>
                            <TouchableOpacity style={{padding:15, backgroundColor:'orange', borderRadius:5, alignItems:'center', justifyContent:'center'}}>
                                <Text style={{color:'white'}}>Beli</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {this.props.user.categories.map((item,i)=>
                    item.productId.length>0 &&
                    (
                    <View key={i} style={{flex:1,marginTop:10, backgroundColor:'white', width:'100%', height:'100%'}}>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('ProductCategory', { categoryId: item._id })} style={{flexDirection:'row', alignItems:'center', justifyContent:'center', padding:10}}>
                            <View style={{flex:1}}><Text style={{fontSize:20}}>{item.category_name}</Text></View>
                            <View style={{right:0}}><Text style={{color:'grey'}}>More</Text></View>
                        </TouchableOpacity>
                        <ScrollView style={{padding:10, marginBottom:20}} horizontal={true}>
                            {item.productId.map((item,i)=>
                                <TouchableOpacity key={i} style={{flex:1, width:150, height:250, backgroundColor:'white', borderWidth:1, borderColor:'#e8eaed', alignItems:'center', justifyContent:'center', padding:10}} onPress={()=>this.props.navigation.navigate('DetailProduct', { productId: item._id })}>
                                    <Image style={{width:100, height:100}} source={{uri: item.photo[0]}} />
                                    <View style={{width:'100%'}}>
                                        <Text style={{color:'grey'}} numberOfLines={2}>{item.product_name}</Text>
                                        <Text style={{color:'#dce1e6', fontSize:15, marginTop:15}}>Rp {Math.ceil(item.product_price*100/(100-30))}</Text>
                                        <Text style={{fontSize:15, marginTop:5}}>Rp {item.product_price}</Text>
                                        <View style={{backgroundColor:'orange', padding:3, width:'40%', marginTop:10, alignItems:'center', justifyContent:'center'}}>
                                            <Text style={{color:'white'}}>30%</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )}
                        </ScrollView>
                    </View>
                    )
                    )}
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        user : state.user,
        categories : state.categories
    }
  }
  
export default connect(mapStateToProps)(Home)