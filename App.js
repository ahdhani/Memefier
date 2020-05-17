import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import GlobalStyles from './constants/GlobalStyles'
import LoginScreen from './components/screen/LoginScreen'
import SignUpScreen from './components/screen/SignUpScreen'
import { Provider } from 'react-redux'
import store from './redux/store'

import * as firebase from 'firebase'

var firebaseConfig = {
  apiKey: "AIzaSyDWLAkacPdjO2GljpHpLfww81KeU7W4e04",
  authDomain: "memefier-rest-api.firebaseapp.com",
  databaseURL: "https://memefier-rest-api.firebaseio.com",
  projectId: "memefier-rest-api",
  storageBucket: "memefier-rest-api.appspot.com",
  messagingSenderId: "347817083363",
  appId: "1:347817083363:web:e9cbf869abe7e8c35120d6",
  measurementId: "G-EXC4QJ3P8R"
};

firebase.initializeApp(firebaseConfig);

import { loadUser } from './redux'

// import RootStack from './components/RootStack';

export default function App() {
  useEffect(() => {
    store.dispatch(loadUser())
    firebase.auth().onAuthStateChanged(function( user ){
      if(user) {
        // logged in
        console.log(user)
      } else {
        // no user
        console.log("No user logged in")
      }
    })
    
    
  } , [])
  return (
    <Provider store={store}>
      <View style={GlobalStyles.container}>
        {/* <Text>Open up App.js to start working on your app!</Text> */}
        <LoginScreen />
        {/* <SignUpScreen /> */}
        {/* <RootStack /> */}
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
