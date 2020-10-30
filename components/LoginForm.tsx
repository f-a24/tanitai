import * as React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  ActivityIndicator,
  GestureResponderEvent,
  StyleSheet,
} from 'react-native';
import firebase from 'firebase/app';
import 'firebase/auth';

const LoadSpinner: React.FC<{
  loading: boolean;
  onButtonPress: (e: GestureResponderEvent) => void;
}> = ({ loading, onButtonPress }) => {
  if (loading) return <ActivityIndicator size="small" />;
  return (
    <TouchableOpacity onPress={onButtonPress} style={styles.buttonStyle}>
      <Text style={styles.textStyle}>新規登録 or ログイン</Text>
    </TouchableOpacity>
  );
};

const LoginForm: React.FC = () => {
  const [state, setState] = React.useState({
    email: '',
    password: '',
    error: '',
    loading: false,
  });

  const onLoginSuccess = () => {
    setState({
      email: '',
      password: '',
      loading: false,
      error: '',
    });
  };

  const onLoginFail = () => {
    setState({
      ...state,
      loading: false,
      error: 'Authentication Failed',
    });
  };

  const onButtonPress = () => {
    const { email, password } = state;
    setState({ ...state, error: '', loading: true });
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('---THEN---');
      })
      .catch(() => {
        console.log('---CATCH---');
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(onLoginSuccess)
          .catch(onLoginFail);
      });
  };
  return (
    <View>
      <View style={styles.wrap}>
        <TextInput
          placeholder="user@gmail.com"
          autoCorrect={false}
          value={state.email}
          onChangeText={(email) => setState({ ...state, email })}
        />
      </View>
      <View style={styles.wrap}>
        <TextInput
          secureTextEntry
          placeholder="password"
          autoCorrect={false}
          value={state.password}
          onChangeText={(password) => setState({ ...state, password })}
        />
      </View>

      <View style={styles.wrap}>
        <LoadSpinner loading={state.loading} onButtonPress={onButtonPress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    padding: 10,
  },
  textStyle: {
    alignSelf: 'center',
    color: '#007aff',
    fontSize: 16,
    fontWeight: '600',
    paddingBottom: 10,
    paddingTop: 10,
  },
  buttonStyle: {
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
  },
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    height: 30,
    borderWidth: 1,
    borderColor: '#333',
  },
});

export default LoginForm;
