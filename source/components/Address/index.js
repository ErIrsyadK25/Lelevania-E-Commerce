import React, { Component } from 'react';
import { TextInput } from 'react-native';
import { Container, Card, CardItem, Body, Right, Header, View, Content, Footer, FooterTab, Button, Text } from 'native-base';
import { withNavigation } from 'react-navigation';
import { TouchableOpacity } from 'react-native';


class Address extends Component {
  
  

  render() {
    console.log(this.props);
    
    return (
        <Container>
          <Content>
          <Card>
            <CardItem header >
              <View style={{flexDirection:'row'}}>
                <Text>Rumah</Text>
                <Right >
                <TouchableOpacity onPress={() => {this.props.navigation.navigate('EditAddress')}}>
                  <Text style={{color:'#ff8040'}}>Ubah</Text>
                </TouchableOpacity>
                </Right>
              </View>
            </CardItem>
            <CardItem>
              <Body>
                <View style={{height: 150}}>
                  <TextInput
                    value={this.props.alamat}
                    style={{fontSize: 16, color: 'black', height: 100}}
                    multiline={true}
                    onChangeText={(value) => this.props.onChangeText(value)}
                  />
                </View>
                
              </Body>
            </CardItem>
          </Card>
        </Content>
        <Footer style={{backgroundColor:'white'}}>
           <Button onPress={() => this.props.onPress()} style={{width: '90%', backgroundColor: '#ff8040', justifyContent:'center'}}>
              <Text >Simpan</Text>
            </Button>
        </Footer>
      </Container>
    );
  }
}

export default withNavigation(Address)