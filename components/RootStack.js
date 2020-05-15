import LoginScreen from './screen/LoginScreen'
import SignUpScreen from './screen/SignUpScreen'
import ProfileScreen from './screen/ProfileScreen'

import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// const StackNavigator = CreateStackNavigator({
//     LoginScreen: {
//         screen: LoginScreen,
//         navigationOptions: {
//             headerShown: false
//         }
//     },
//     SignUpScreen: {
//         screen: SignUpScreen,
//         navigationOptions: {
//             headerShown: false
//         }
//     },
//     ProfileScreen: {
//         screen: ProfileScreen,
//         navigationOptions: {
//             headerShown: false
//         }
//     },
// })

// export default createAppContainer(StackNavigator);

const Stack = createStackNavigator();

export default RootStack = () => {

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