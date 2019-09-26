import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import { withNavigation } from 'react-navigation';

class Header extends Component {
  render() {
    return (
      <ImageBackground style={styles.headerBackground} >
        <View style={styles.header}>

            <View style={styles.profileicWrap}>
                <Image style={styles.profileic} source={{uri:this.props.profile.profileImage!==undefined? this.props.profile.profileImage : 'https://cdn2.iconfinder.com/data/icons/business-management-52/96/Artboard_20-512.png'}} />
            </View>
            <TouchableOpacity onPress={() => {this.props.navigation.navigate('EditProfile')}} style={{alignSelf:'flex-end', marginRight:'5%'}}>
              <Image style={{height: 20, width: 20,}} source={require('../assets/icon_edit.png')}/>
            </TouchableOpacity>
            <Text style={styles.name}>{this.props.profile.name}</Text>
            <Text style={styles.pos}>{this.props.profile.email}</Text>

        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  headerBackground: {
    flex: 1,
  },
  header: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 5,
  },
  profileicWrap: {
      width: 70,
      height: 70,
      borderRadius: 30,
  },
  profileic: {
      flex: 1,
      width: null,
      alignSelf: 'stretch',
      borderRadius: 100,
      borderColor: '#fff',
      borderWidth: 4
  },
  name:{
      marginTop: '5%',
      fontSize: 16,
      fontWeight: 'bold'
  },
  pos: {
      fontSize: 14,
      color: '#0394c0',
  }
});

export default withNavigation(Header)