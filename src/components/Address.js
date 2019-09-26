import React, { Component } from 'react';
import { Container, Card, CardItem, Body, Right, Header, View, Content, Footer, FooterTab, Button, Text } from 'native-base';
import { withNavigation } from 'react-navigation';
import { TouchableOpacity } from 'react-native';

class Address extends Component {
  render() {
    return (
        <Container>
          <Content>
          <Card>
            <CardItem header >
              <View style={{flexDirection:'row'}}>
                <Text>Rumah </Text>
                <Button disabled style={{height:20}}>
                  <Text style={{fontSize:10}}>Default</Text>
                </Button>
                <Right >
                <TouchableOpacity onPress={() => {this.props.navigation.navigate('EditAddress')}}>
                  <Text style={{color:'#ff8040'}}>Ubah</Text>
                </TouchableOpacity>
                </Right>
              </View>
            </CardItem>
            <CardItem>
              <Body>
                <Text>nama</Text>
                <Text>kota, provinsi</Text>
                <Text>no telepon</Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
        <Footer style={{backgroundColor:'white'}}>
           <Button onPress={() => {this.props.navigation.navigate('AddAddress')}} style={{width: '90%', backgroundColor: '#ff8040', justifyContent:'center'}}>
              <Text >Tambah Alamat</Text>
            </Button>
        </Footer>
      </Container>
    );
  }
}

export default withNavigation(Address)