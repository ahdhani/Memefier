import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import GlobalStyles from './constants/GlobalStyles'
import LoginScreen from './components/screen/LoginScreen'

export default function App() {
  return (
    <View style={GlobalStyles.container}>
      {/* <Text>Open up App.js to start working on your app!</Text> */}
    <LoginScreen />

    </View>
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
