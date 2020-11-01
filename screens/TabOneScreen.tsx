import * as React from 'react';
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/firestore';

import useMessagesCollection from '../hooks/useMessagesCollection';
import { Text, View } from '../components/Themed';

const TabOneScreen: React.FC = () => {
  const [msg, setMsg] = React.useState('');
  const db = firebase.firestore().collection('messages');
  const messages = useMessagesCollection(db);

  return (
    <View style={styles.container}>
      <View style={styles.wrap}>
        {messages.map((message, i) => (
          <Text key={`${i}:${message}`}>{message}</Text>
        ))}
        <TextInput autoCorrect={false} value={msg} onChangeText={setMsg} />
      </View>
      <TouchableOpacity
        onPress={() => {
          db.add({ text: msg }).then(() => {
            setMsg('');
          });
        }}
        style={styles.buttonStyle}
      >
        <Text style={styles.textStyle}>送信</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TabOneScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  wrap: {
    padding: 10,
  },
  textStyle: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    paddingVertical: 8,
    paddingHorizontal: 16
  },
  buttonStyle: {
    backgroundColor: '#ff8600',
    borderRadius: 5
  },
});
