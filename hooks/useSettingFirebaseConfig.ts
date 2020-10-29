import * as React from 'react';
import firebase from 'firebase';
import firebaseConfig from '../constants/Firebase';

export default () => {
  const [loggedIn, setLogged] = React.useState(false);
  React.useEffect(() => {
    if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

    firebase.auth().onAuthStateChanged((user) => {
      setLogged(!!user);
    });
  }, []);

  return loggedIn;
};
