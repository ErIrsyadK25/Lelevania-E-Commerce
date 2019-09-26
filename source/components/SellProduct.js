import React, {Component} from 'react'
import {View, FlatList, Image, List, TextInput, TouchableOpacity, ScrollView,AsyncStorage} from 'react-native'
import { Tab, Header,NumberInput, Input, Left, Right, Title, TabHeading, Tabs, CardItem, Layout, Body, Text, Button, Container, Picker, Content, Form, Item, Icon, Label, ListItem} from 'native-base';
import SwitchToggle from 'react-native-switch-toggle';
import ImagePicker from 'react-native-image-picker';
import NumericInput from 'react-native-numeric-input';
import {connect} from 'react-redux';
import {postProduct} from '../publics/redux/actions/user';
// import {getAllCategories} from '../publics/redux/actions/user'

class SellProduct extends Component{
    state = {
        product_name: '',
        product_price: '',
        city : '',
        stock: '',
        weight: '',
        category: '',
        madeIn : 'Dalam Negri',
        condition:'Baru',
        warranty: 'Not Available',
        filePath: {},
        stock:0,
        weight:0,
        warranty:0,
        sellerID: ''

      };

      componentDidMount(){
        AsyncStorage.getItem('user').then((value)=>{
          this.setState({sellerID:value})
        })
      }
      
      chooseFile = () => {
        let options = {
          title: 'Pilih Gambar',
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
        ImagePicker.showImagePicker(options, response => {
          if (response.didCancel) {
            alert('Batal Pilih Gambar');
          } else if (response.error) {
            alert('Pilih Gambar Error: ' + response.error);
          } else {
            let source = response;
            this.setState({
              filePath: source,
            });
          }
        });
      };

    static navigationOptions = {
        headerTitle: 'Jual Produk',
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
    }

    postProduct(){
      const data = {
        name: this.state.product_name,
        price: this.state.product_price,
        location: this.state.city,
        pCategory: this.state.category,
        stock: this.state.stock,
        pSID : this.state.sellerID,
        condition: this.state.condition,
        productWeight: this.state.weight,
        countryOfOrigin: this.state.madeIn,
        warranty: this.state.warranty,
        image: this.state.filePath
      }
    
      console.log('lempar props', data);
      this.props.dispatch(postProduct(data));
      
    }

    navigateToData(){
      this.props.navigation.navigate('DetailProduct', { productId: this.props.insertedProduct.product._id })
    }

    render(){
      console.log('cek sudah masuk apa belum', );
      if (this.props.inserted) {
        this.navigateToData();
      }
      
        return(
          <Container>
            <ScrollView>
            <Form>
            <Image
            source={{ uri: this.state.filePath.uri }}
            style={{ width: 250, alignSelf:'center', marginBottom:'5%', marginTop:'5%', borderWidth:2, borderColor:'#ff8040', height: 250 }}
            />
            <Button
              style={{borderWidth:2, borderColor:'#ff8040',width: '90%', backgroundColor: 'white', alignSelf:'center', justifyContent:'center'}}
              onPress={this.chooseFile.bind(this)}>
            <Text style={{color:'#ff8040'}}>Pilih Gambar Produk</Text>
          </Button>
            
            <Item >
              <Label>Nama Produk :</Label>
              <Input 
                value={this.state.product_name}
                onChangeText={(value) => this.setState({product_name: value})}
              />
            </Item>

            <Item >
              <Label>Harga :</Label>
              <Input 
                value={this.state.product_price}
                onChangeText={(value) => this.setState({product_price: value})}
              />
            </Item>

            <Item >
              <Label>Dikirim Dari :</Label>
              <Input 
                value={this.state.city}
                onChangeText={(value) => this.setState({city: value})}
              />
            </Item>

            <Item >
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="md-arrow-dropdown"/>}
                placeholder="Kategori"
                selectedValue={this.state.category}
                onValueChange={(itemValue) =>
                  this.setState({category: itemValue})
                }
              >
                <Picker.Item label={'Category'} value="default" />
                {this.props.categories.map((item, key) =>
                  (<Picker.Item label={item.category_name} value={item._id} key={key} />)
                )}
              </Picker>
            </Item>

            <Item>
              <Label style={{flex:1}}>Stok :</Label>

              <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                <NumericInput 
                  style={{flex:1}}
                  value={this.state.stock} 
                  onChange={value => this.setState({stock: value})}
                />
                </View>

              <Text style={{flex:1}}>Buah</Text>
            </Item>
            
            <Item >
              <Label style={{flex:1}}>Berat  :</Label>
              <View style={{flex:1, alignItems:'center', justifyContent:'center'}}><NumericInput value={this.state.weight} onChange={(value)=>this.setState({weight:value})}/></View>
              <Text style={{flex:1}}>Kg</Text>
            </Item>
            
            <Item >

              <Picker
                mode="dropdown"
                iosIcon={<Icon name="md-arrow-dropdown"/>}
                placeholder="Kondisi Produk"
                selectedValue={this.state.condition}
                onValueChange={(itemValue) =>
                  this.setState({condition: itemValue})
                }
              >
                <Picker.Item label={'Produk Baru'} value={'Baru'} />
                <Picker.Item label={'Produk Bekas'} value={'Bekas'} />
              </Picker>
            </Item>
            <Item >
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="md-arrow-dropdown"/>}
                placeholder="Asal Produk"
                selectedValue={this.state.madeIn}
                onValueChange={(itemValue) =>
                  this.setState({madeIn: itemValue})
                }
              >
                <Picker.Item label={'Dalam Negeri'} value={'Dalam Negeri'} />
                <Picker.Item label={'Luar Negeri'} value={'Luar Negeri'} />
              </Picker>
            </Item>

            <Item >
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="md-arrow-dropdown"/>}
                placeholder="Garansi"
                selectedValue={this.state.warranty}
                onValueChange={(itemValue) =>
                  this.setState({warranty: itemValue})
                }
              >
                <Picker.Item label={'Garansi'} value={'Not Available'} />
                <Picker.Item label={'Available'} value={'Available'} />
                <Picker.Item label={'Not Available'} value={'Not Available'} />
              </Picker>
            </Item>
            {/* <Item >
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="md-arrow-dropdown"/>}
                placeholder="Pajak Produk"
                selectedValue={this.state.tax}
                onValueChange={(itemValue) =>
                  this.setState({tax: itemValue})
                }
              >
                <Picker.Item label={'Kena Pajak'} value={'Kena Pajak'} />
                <Picker.Item label={'Tanpa Pajak'} value={'Tanpa Pajak'} />
              </Picker>
            </Item> */}
          <Button 
            style={{width: '90%', backgroundColor: '#ff8040', alignSelf:'center', justifyContent:'center'}}
            onPress={() => this.postProduct()}
          >
              <Text>Simpan</Text>
          </Button>
          </Form>
          </ScrollView>
          </Container>
        )
    }
}

const mapStateToProps = (state) =>{
  return {
      user : state.user,
      categories : state.user.categories,
      inserted : state.user.inserted,
      insertedProduct : state.user.insertedProduct
  }
}

export default connect(mapStateToProps)(SellProduct)