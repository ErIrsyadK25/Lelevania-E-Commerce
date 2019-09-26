import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground
} from 'react-native';


export default class Bar extends Component {
  render() {
    return (
        <View style={styles.bar}>
            <TouchableOpacity style={[styles.barItem, styles.barseparator]}>
                <Text style={styles.barTop}>Voucher</Text>
                <Text >0</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.barItem, styles.barseparator]}>
                <Text style={styles.barTop}>Point</Text>
                <Text >0</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.barItem}>
                <Text style={styles.barTop}>Token</Text>
                <Text >0</Text>
            </TouchableOpacity>
        </View>
      
    );
  }
}

const styles = StyleSheet.create({
  bar: {
      borderTopWidth: 0.5,
      borderBottomWidth: 0.5,
      backgroundColor: 'white',
      flexDirection: 'row'
  },
  barseparator: {
      borderRightWidth: 0.5
  },
  barTop: {
      fontSize: 12,
  },
  barItem: {
      flex: 1,
      padding: 10,
      alignItems: 'center'
  }
});
