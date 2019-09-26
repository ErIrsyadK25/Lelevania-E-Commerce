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
        height: '100%',
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
        width:25,
        height:25,
        borderRadius:25,
        margin:5,
        backgroundColor:'orange'
    }
})

const images = [
    "https://i.pinimg.com/originals/25/84/7d/25847db8a94a95e9b55afd48ae058a57.png",
    "https://i.pinimg.com/originals/d3/55/38/d355383ba034ce7239215e90ebe36cc0.png",
    "https://i.pinimg.com/originals/91/7f/f7/917ff7d3cf52a4dab49bca92aa7aed85.png",
    "https://i.pinimg.com/originals/2d/d7/3b/2dd73b9b386917fbdff694537521fd57.png",
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
                <Image style={{width:width, height:height, position:'relative'}} source={{uri:'https://i.pinimg.com/564x/4e/68/0c/4e680ce24700f1b122aad444f09a726f.jpg'}}/>
                }
                <BackgroundCarousel images={images} navigation={this.props.navigation}/>
            </View>
        )
    }
}

export default SplashScreen