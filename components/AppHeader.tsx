import * as React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/auth';

import { Text, View } from './Themed';

const Header = () => (
  <View style={styles.header}>
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <Image source={require('../assets/images/logo.png')} style={{ width: 50, height: 50 }} /> 
      <Text>YAKINIKU with someone's money</Text>
    </View>
    <TouchableOpacity
      onPress={() => firebase.auth().signOut()}
      style={styles.buttonStyle}
    >
      <Text style={styles.textStyle}>logout</Text>
    </TouchableOpacity>
  </View>
);

export default Header;

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  textStyle: {
    alignSelf: 'center',
    color: '#007dff',
    fontWeight: '600',
    padding: 8
  },
  buttonStyle: {
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007dff',
  },
});
