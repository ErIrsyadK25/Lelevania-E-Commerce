import React, { Component } from 'react';
import { Container, Header, Content, Icon, Footer, FooterTab, Button, Text, Separator, ListItem,Left, Right } from 'native-base';
import SwitchToggle from 'react-native-switch-toggle';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { withNavigation } from 'react-navigation';

class InfoAccount extends Component {
    constructor () {
        super();
    
        this.state = {
            switchOn1: true,
            switchOn2: true,
        };
    }

    onPress1 = () => {
        this.setState({ switchOn1: !this.state.switchOn1 });
    }

    onPress2 = () => {
        this.setState({ switchOn2: !this.state.switchOn2 });
    }

    getRightTextNews() {
        return this.state.switchOn1 ? '' : 'Tidak';
      }
      
      getLeftTextNews() {
        return this.state.switchOn1 ? 'Ya' : '';
      }

      getRightTextSms() {
        return this.state.switchOn2 ? '' : 'Tidak';
      }
      
      getLeftTextSms() {
        return this.state.switchOn2 ? 'Ya' : '';
      }
  render() {
    return (
      <Container>
        <Content>
        <Separator style={{height:5}} bordered/>
            <TouchableOpacity onPress={() => {this.props.navigation.navigate('ChangePassword')}}>
            <ListItem>
                <Left>
                    <Text>Ubah Password</Text>
                </Left>
                <Right>
                    <Icon name="ios-arrow-forward" />
                </Right>
            </ListItem>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {this.props.navigation.navigate('ChangeBio')}}>
            <ListItem last>
                <Left>
                    <Text>Biodata</Text>
                </Left>
                <Right>
                    <Icon name="ios-arrow-forward" />
                </Right>
            </ListItem>
            </TouchableOpacity>
        <Separator style={{height:5}} bordered/>
          <ListItem>
                <Left>
                    <Text>Berlangganan</Text>
                </Left>
          </ListItem>
          <ListItem >
                <Left>
                    <Text>Newsletter</Text>
                </Left>
                <Right>
                <SwitchToggle
                    backgroundColorOn='#ff8040'
                    circleColorOff='white'
                    circleColorOn='white'
                    backTextRight={this.getRightTextNews()}
                    backTextLeft={this.getLeftTextNews()}
                    type={1}
                    buttonStyle={{
                      justifyContent: 'flex-end',
                      position: 'absolute'
                    }}
                    rightContainerStyle={{flex: 1, alignItems: 'center', justifyContent: 'flex-end'}}
                    leftContainerStyle={{flex: 1, alignItems: 'center', justifyContent: 'flex-end'}}
                    buttonTextStyle={{fontSize: 12, color:'white',}}
                    textRightStyle={{fontSize: 12, color:'white',}}
                    textLeftStyle={{fontSize: 12, color:'white',}}
                  
                    containerStyle={{
                      width: 80,
                      height : 40,
                      borderRadius: 30,
                      padding: 5,
                    }}
                    switchOn={this.state.switchOn1}
                    onPress={this.onPress1}
                />
                </Right>
            </ListItem>
        <ListItem last>
                <Left>
                    <Text>SMS</Text>
                </Left>
                <Right>
                <SwitchToggle
                    backgroundColorOn='#ff8040'
                    circleColorOff='white'
                    circleColorOn='white'
                    backTextRight={this.getRightTextSms()}
                    backTextLeft={this.getLeftTextSms()}
                    type={1}
                    buttonStyle={{
                      justifyContent: 'flex-end',
                      position: 'absolute'
                    }}
                    rightContainerStyle={{flex: 1, alignItems: 'center', justifyContent: 'flex-end'}}
                    leftContainerStyle={{flex: 1, alignItems: 'center', justifyContent: 'flex-end'}}
                    buttonTextStyle={{fontSize: 12, color:'white',}}
                    textRightStyle={{fontSize: 12, color:'white',}}
                    textLeftStyle={{fontSize: 12, color:'white',}}
                  
                    containerStyle={{
                      width: 80,
                      height : 40,
                      borderRadius: 30,
                      padding: 5,
                    }}
                    switchOn={this.state.switchOn2}
                    onPress={this.onPress2}
                />
                </Right>
            </ListItem>
            <Button style={{width: '90%', backgroundColor: '#33cc33', alignSelf:'center', justifyContent:'center'}}>
              <Text>Connect Line</Text>
            </Button>
        </Content>
      </Container>
    );
  }
}

export default withNavigation(InfoAccount)