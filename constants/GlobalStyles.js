import { StyleSheet , Platform , StatusBar} from 'react-native';


const GlobalStyles = StyleSheet.create({
    AndroidSafeArea: {
      flex: 1,
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      width: '100%',
    },
    container: {
      flex: 1,
      backgroundColor: '#ccc',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  export default GlobalStyles;