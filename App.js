import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import GlobalStyles from './constants/GlobalStyles'
import LoginScreen from './components/screen/LoginScreen'
import SignUpScreen from './components/screen/SignUpScreen'
import { Provider } from 'react-redux'
import store from './redux/store'

// import RootStack from './components/RootStack';


export default function App() {
  return (
    <Provider store={store}>
      <View style={GlobalStyles.container}>
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
