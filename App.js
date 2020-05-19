import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import GlobalStyles from './constants/GlobalStyles'
import LoginScreen from './components/screen/LoginScreen'
import SignUpScreen from './components/screen/SignUpScreen'
import ProfileScreen from './components/screen/SignUpScreen'

import { Provider } from 'react-redux'
// import RootStack from './components/RootStack';

import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

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

// @bug Firebase App named '[DEFAULT]' already exists (app/duplicate-app)
// @fixed
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

import { loadUser } from './redux'


RootStack = () => {

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="LoginScreen"
        screenOptions={{
        gestureEnabled: true
      }}>

          <Stack.Screen 
            name="LoginScreen" 
            component={LoginScreen}
            options = {{
              headerShown: false
            }} 
          />
          <Stack.Screen 
            name="SignUpScreen" 
            component={SignUpScreen}
            options = {{
              headerShown: false
            }} 
          />
          <Stack.Screen 
            name="ProfileScreen" 
            component={ProfileScreen}
            options = {{
              headerShown: false
            }} 
          />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  useEffect(() => {
    store.dispatch(loadUser())

  // // @Firebase create User Function
  // firebase.auth().createUserWithEmailAndPassword("e2@e.com" , "1234567")
  //  .then( user => console.log(user))
  //  .catch(error => console.log("Can't create" , error.message))
    
    
  } , [])

  return (
    <Provider store={store}>
        <RootStack />
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
