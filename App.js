import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import GlobalStyles from './constants/GlobalStyles'
import LoginScreen from './components/screen/LoginScreen'
import SignUpScreen from './components/screen/SignUpScreen'
import { Provider } from 'react-redux'
import store from './redux/store'

import { loadUser } from './redux'

// import RootStack from './components/RootStack';

export default function App() {
  useEffect(() => {
    store.dispatch(loadUser())
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
