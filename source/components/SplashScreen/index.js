import * as React from 'react'
import {View, Text, ScrollView, Dimensions, Image, StyleSheet, TouchableOpacity} from 'react-native'

const DEVICE_WIDTH = Dimensions.get('window').width

class BackgroundCarousel extends React.Component{
    scrollRef = React.createRef()
    constructor(props){
        super(props)
        this.state = {
            selectedIndex:0
        }
    }

    setSelectedIndex = event =>{
        // width of the viewSize
        const viewSize = event.nativeEvent.layoutMeasurement.width
        // get current position of the scrollview
        const contentOffset = event.nativeEvent.contentOffset.x

        const selectedIndex = Math.floor(contentOffset / viewSize)
        this.setState({selectedIndex})

    }

    render(){
        const {images} = this.props
        const {selectedIndex} = this.state
        return(
            <View style={{height:"100%", width:"100%"}}>
                <ScrollView 
                    horizontal 
                    pagingEnabled 
                    onMomentumScrollEnd={this.setSelectedIndex}
                >
                    {images.map(image =>(
                        <Image 
                            key={image}
                            source={{uri:image}}
                            style={styles.backgroundImage}
                        />
                    ))}
                </ScrollView>

                {this.state.selectedIndex == this.props.images.length-1 &&
                <TouchableOpacity 
                    onPress={()=>this.props.navigation.goBack()} 
                    style={{position:'absolute', padding:10, bottom:'10%', marginLeft:'30%', marginRight:'30%', backgroundColor:'#FFA500', alignItems:'center', justifyContent:'center'}}
                >
                    <Text style={{color:'white', fontWeight:'bold'}}>GETTING STARTED</Text>
                </TouchableOpacity>
                }

                <View style={styles.circleDiv}>
                    {images.map((image,i)=>(
                        <View
                            key={image}
                            style={[styles.whiteCircle, {opacity: i === selectedIndex ? 1 : 0.5}]}
                        />
                    ))}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    backgroundImage:{
        height: 'auto',
        width: DEVICE_WIDTH,
    },
    circleDiv:{
        position:'absolute',
        bottom:35,
        height:10,
        width:'100%',
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    whiteCircle:{
        width:15,
        height:15,
        borderRadius:15,
        margin:5,
        backgroundColor:'orange'
    },
    gettingStarted:{
        position:'absolute',
        padding:10, 
        bottom:'10%', 
        marginLeft:'30%', 
        marginRight:'30%', 
        backgroundColor:'#FFA500', 
        alignItems:'center', 
        justifyContent:'center'
    }
})

const images = [
    "https://res.cloudinary.com/arkademy/image/upload/v1569502049/samples/splash3_vfw97x.png",
    "https://res.cloudinary.com/arkademy/image/upload/v1569506705/samples/splash4_whsfjp.png",
    "https://res.cloudinary.com/arkademy/image/upload/v1569502053/samples/splash5_yvqqhi.png",
    "https://res.cloudinary.com/arkademy/image/upload/v1569502054/samples/splash6_b1hrc9.png",
    ];

class SplashScreen extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            splashScreen: true
        }
    }
    static navigationOptions = {
        header:null
    }
    componentDidMount(){
        setTimeout(()=>{
            this.setState({splashScreen:false})
        },1000)
    }
    render(){
        const {width,height} = Dimensions.get('window')
        return(
            <View>
                {this.state.splashScreen &&
                <Image style={{width:width, height:height, position:'relative'}} source={{uri:'https://res.cloudinary.com/arkademy/image/upload/v1569502062/samples/splash2_cl5t85.png'}}/>
                }
                <BackgroundCarousel images={images} navigation={this.props.navigation}/>
            </View>
        )
    }
}

export default SplashScreen