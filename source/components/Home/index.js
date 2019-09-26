import React, {Component} from 'react'
import {View, Text, TouchableOpacity, Dimensions, TextInput, SafeAreaView, Image, ScrollView, AsyncStorage, FlatList} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Icon from 'react-native-vector-icons/MaterialIcons';
import Carousel from 'react-native-snap-carousel'
//redux
import {getAllCategories,profile} from '../../publics/redux/actions/user'
import {getWishList} from '../../publics/redux/actions/user';
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
                },
                {
                    key:4,
                    category: 'Official Store'
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
                backgroundColor : '#FF7D1D',
                elevation: 0
            },
            headerLeft: (
                <TouchableOpacity style={{marginLeft:15}} onPress={()=>navigation.openDrawer()}>
                    <Icon size={24} color='#FDFFFC' name='menu' />
                </TouchableOpacity>
            ),
            headerTitle: (
                <View style={{flex:1, flexDirection:'row', paddingVertical: 8}}>
                    <View style={{flex:6, flexDirection:'row', backgroundColor:'#FDFFFC', alignItems:'center', justifyContent:'center', borderRadius:5}}>
                        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                            <Icon name='search' color='#333' size={24} />
                        </View>
                        <View style={{flex: 4, justifyContent:'center'}}>
                            <TextInput placeholder="Pasti ada di lelevania" placeholderTextColor='#333' opacity={0.3} right={8}/>
                        </View>
                    </View>

                    <TouchableOpacity style={{flex:1, alignItems:'center', justifyContent:'center', marginLeft: 10}} onPress={()=>navigation.navigate('Cart')}>
                        <Icon name='shopping-cart' size={23} color='#FDFFFC' />
                    </TouchableOpacity>

                    <TouchableOpacity style={{flex:1, alignItems:'center', justifyContent:'center', marginRight: 5}} onPress={()=>navigation.navigate('Notifications')}>
                        <Icon name='notifications-none' size={23} color='#FDFFFC' />
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
                <View style={{flexDirection:'row', backgroundColor:'#FF7D1D'}}>
                    <FlatList
                        horizontal={true}
                        data={this.state.categoryHeader}
                        keyExtractor={ ({id}) => id}
                        renderItem={ ({item}) => 
                            <View style={{flexDirection:'row', marginHorizontal: 18, marginBottom: 10}}>
                                <TouchableOpacity style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                                    <Text style={{color: '#FDFFFC'}}>{item.category}</Text>
                                </TouchableOpacity>
                            </View> 
                        }
                    />
                </View>
                <ScrollView style={{flex:15, backgroundColor:'#E8EAED', height:'100%'}}>
                    <View style={{height:153, marginBottom: 10}}>
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
                        <View style={{position:'absolute', flexDirection:'row', backgroundColor:'#444', width:'35%', bottom:0, right:0, padding: 6, borderTopLeftRadius: 5}}>
                            <TouchableOpacity style={{flex:1, flexDirection: 'row', alignItems: 'flex-end', justifyContent:'space-between'}}>
                                <Icon size={16} color='#FDFFFC' name='view-list' style={{marginHorizontal: 5}} />
                                <Text style={{color:'#FDFFFC', alignItems:'center', justifyContent: 'center', marginRight: 5}}>Semua Promo</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{position:'absolute', flexDirection:'row', bottom:10, left:15}}>
                            {this.state.carouselItems.map((item, i)=>
                                <View key={i} style={{width:8, height:8, borderRadius:25, backgroundColor: this.state.activeIndex == i ? '#FF7D1D' : '#FDFFFC', margin: 3}} />
                            )}
                        </View>
                    </View>
                    <View style={{backgroundColor: '#FDFFFC', paddingHorizontal: 12, marginBottom: 10}}>
                        <View style={{flexDirection:'row'}}>
                            {this.state.anotherFeature.map((feature,i)=>
                            <TouchableOpacity onPress={()=>this.setState({selectedFeature:feature.key})} key={feature.key} style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                                <View style={{marginTop: 10}}>
                                    <Text style={{color: this.state.selectedFeature == i ? '#FF7D1D' : '#95A5A6', fontSize: 14}}>{feature.feature}</Text>
                                </View>
                                <View style={{marginTop:10, width:'100%', height:2, backgroundColor: this.state.selectedFeature == i ? '#FF7D1D' : '#FDFFFC'}} />
                            </TouchableOpacity>
                            )}
                            <View style={{flex:1, alignItems: 'flex-end', justifyContent:'center'}}>
                                <TouchableOpacity>
                                    <Icon color='#95A5A6' size={25} name="more-horiz"/>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{flexDirection:'row', paddingVertical: 20}}>
                            <View style={{flex: 1}}>
                                <TextInput style={{width:'125%', fontSize: 16}} placeholder='Nomor Tujuan' underlineColorAndroid='#E8EAED' />
                            </View>
                            <View style={{flex: 1, alignItems:'flex-end', justifyContent: 'center'}}>
                                <TouchableOpacity style={{backgroundColor:'#FF7D1D', borderRadius:4, }}>
                                    <Text style={{color:'#FDFFFC', paddingHorizontal: 50, paddingVertical: 10}}>Beli</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    {this.props.user.categories.map((item,i)=>
                        item.productId.length>0 &&
                        (
                        <View key={i} style={{flex:1, backgroundColor:'#FDFFFC', width:'100%', height:'100%'}}>
                            <TouchableOpacity onPress={()=>this.props.navigation.navigate('ProductCategory', { categoryId: item._id })} style={{flexDirection:'row', alignItems:'center', justifyContent:'center', padding:12}}>
                                <View style={{flex:1}}>
                                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>{item.category_name}</Text>
                                </View>
                                <View style={{right:0}}>
                                    <Text style={{color:'grey', fontSize: 12}}>More</Text>
                                </View>
                            </TouchableOpacity>
                            <ScrollView style={{marginBottom:20}} horizontal={true}>
                                {item.productId.map((item,i)=>
                                    <TouchableOpacity key={i} style={{flex:1, width:150, height:250, backgroundColor:'#FDFFFC', borderWidth:1, borderColor:'#e8eaed', alignItems:'center', justifyContent:'center', padding:10}} onPress={()=>this.props.navigation.navigate('DetailProduct', { productId: item._id })}>
                                        <Image style={{width:100, height:100}} source={{uri: item.photo[0]}} />
                                        <View style={{width:'100%'}}>
                                            <Text style={{color:'grey'}} numberOfLines={2}>{item.product_name}</Text>
                                            <Text style={{color:'#dce1e6', fontSize:15, marginTop:15}}>Rp {Math.ceil(item.product_price*100/(100-30))}</Text>
                                            <Text style={{fontSize:15, marginTop:5}}>Rp {item.product_price}</Text>
                                            <View style={{backgroundColor:'#FF7D1D', padding:3, width: '30%', borderRadius: 2, marginTop:10, alignItems:'center', justifyContent:'center'}}>
                                                <Text style={{color:'#FDFFFC'}}>30%</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )}
                            </ScrollView>
                        </View>
                        )
                    )}

                    <View style={{backgroundColor: '#FDFFFC', flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
                        
                            <TouchableOpacity>
                                <View style={{alignItems: 'center', justifyContent: 'center', marginBottom: 20}}>
                                    <Icon name='person-add' size={30} color='#FF7D1D' />
                                    <Text style={{fontSize: 12, color: '#545454', marginTop: 5}}>New Member</Text>
                                </View>
                            </TouchableOpacity>
                       
                            <TouchableOpacity>
                                <View style={{alignItems: 'center', justifyContent: 'center', marginBottom: 20}}>
                                    <Icon name='store' size={30} color='#FF7D1D' />
                                    <Text style={{fontSize: 12, color: '#545454', marginTop: 5}}>Jualan Hepi</Text>
                                </View>
                            </TouchableOpacity>
                        
                            <TouchableOpacity>
                                <View style={{alignItems: 'center', justifyContent: 'center', marginBottom: 20}}>
                                    <Icon name='book' size={30} color='#FF7D1D' />
                                    <Text style={{fontSize: 12, color: '#545454', marginTop: 5}}>Panduan</Text>
                                </View>
                            </TouchableOpacity>
                        
                    </View>

                    <View style={{flexDirection: 'row', marginVertical: 5, alignItems: 'center', justifyContent: 'space-around'}}>
                            <TouchableOpacity>
                                <Text style={{fontSize: 13, color: '#545454'}}>REDEEM VOUCHER</Text>
                            </TouchableOpacity>
                        
                            <TouchableOpacity style={{}}>
                                <Text style={{fontSize: 13, color: '#545454'}}>BLOG</Text>
                            </TouchableOpacity>
                        
                            <TouchableOpacity>
                                <Text style={{fontSize: 13, color: '#545454'}}>HUBUNGI KAMI</Text>
                            </TouchableOpacity>
                    </View>

                    <View style={{backgroundColor: '#FDFFFC', flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <TouchableOpacity>
                            <Text style={{fontSize: 13, color: '#545454', textDecorationLine: 'underline', marginVertical: 30}}>Pernjanjian Penggunaan Layanan</Text>
                        </TouchableOpacity>
                    </View>

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