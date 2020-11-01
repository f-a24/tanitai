import * as React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Image,
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
      .then()
      .catch(() => {
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(onLoginSuccess)
          .catch(onLoginFail);
      });
  };
  return (
    <View style={{justifyContent: 'center', height: '100%'}}>
      <View style={{alignItems: 'center', justifyContent: 'center', paddingBottom: 32}}>
        <Image source={require('../assets/images/logo.png')} style={{ width: 100, height: 100 }} />
      </View> 
      <View style={styles.wrap}>
        <TextInput
          style={styles.inputStyle}
          placeholder="user@gmail.com"
          autoCorrect={false}
          value={state.email}
          onChangeText={(email) => setState({ ...state, email })}
        />
      </View>
      <View style={styles.wrap}>
        <TextInput
          style={styles.inputStyle}
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
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    paddingBottom: 10,
    paddingTop: 10,
  },
  buttonStyle: {
    alignSelf: 'stretch',
    backgroundColor: '#ff8600',
    borderRadius: 5
  },
  inputStyle: {
    color: '#000',
    padding: 8,
    fontSize: 18,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ff8600',
  },
});

export default LoginForm;
