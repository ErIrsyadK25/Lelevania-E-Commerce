import React, { Component } from 'react';
import { View, Image, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Content } from 'native-base';
import { getProductByCategory } from '../publics/redux/actions/products'
import {connect} from 'react-redux'

class ProductCategory extends Component {
    constructor(props){
        super(props)
        this.state = {
            categoriesById: []
        }
    }
    static navigationOptions = {
        header: null
    }

    componentDidMount(){
        const { navigation } = this.props;
        const categoryId = navigation.getParam('categoryId', '');
        this.props.dispatch(getProductByCategory(categoryId))
    }
    
    render(){
    
    const {product} = this.state
        return(
            <Container>
                <Header androidStatusBarColor="#ff8040" style={{backgroundColor : '#ff8040'}}>
                    <Left>
                        <Button transparent onPress={()=>this.props.navigation.goBack()}>
                        <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Home</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                        <Icon name='ios-search' />
                        </Button>
                        <Button transparent>
                        <Icon name='ios-cart' />
                        </Button>
                        <Button transparent>
                        <Icon name='more' />
                        </Button>
                    </Right>
                </Header>

                <Content style={{ backgroundColor: '#eaeaea' }}>
                    <FlatList
                        data={this.props.productsByCategory}
                        numColumns={2}
                        keyExtractor={(item, index) => index}
                        renderItem={({item}) => (
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('DetailProduct', { productId: item._id })} key={item.id} activeOpacity={0.9} style={styles.bottomItem} >
                            <View style={{flex: 1, padding: 10, backgroundColor: 'white', borderColor: '#eaeaea', borderWidth: 0.5,}}>
                                
                                <View style={{flex:7, padding: 5}}>
                                    <Image source={{uri: item.photo[0]}} style={{flex: 1, width: '100%', height: '100%', resizeMode: 'contain'}}/>
                                </View>
                                <View style={{justifyContent: 'center', flex:1, marginBottom: 5}}>
                                    <Text style={{fontSize: 16}} numberOfLines={2}>{item.product_name}</Text>
                                </View>
                                <View style={{justifyContent: 'center', flex:1}}>
                                    <Text style={{fontSize: 14, color: 'red', fontWeight: 'bold'}}>Rp {item.product_price}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        )}
                    />
                </Content>
            </Container>
        );
    }
};

const mapStateToProps = (state) =>{
    
    return {
        productsByCategory : state.products.productsByCategory
    }
  }
  
export default connect(mapStateToProps)(ProductCategory)

const styles = StyleSheet.create({
    bottom: {
      backgroundColor: 'white',
      marginTop: 10,
      height: '100%',
      flexDirection: 'row',
      flexWrap: 'wrap',
      flex: 1
    },
    bottomItem: {
      width: '50%',
      height: 350,
    },
  })

