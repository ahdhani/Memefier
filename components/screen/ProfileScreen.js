import React, { Component } from 'react'
import { Text, View, StyleSheet, SafeAreaView} from 'react-native'
import GlobalStyles from '../../constants/GlobalStyles';

export default class ProfileScreen extends Component {

    // componentDidMount = async () => {
    //     }

    render() {
        return (
            <View style = {GlobalStyles.container}>
                <Text>Profile</Text>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    // container: {
    //    flex: 1,
    //    backgroundColor: '#aaa',
    //    alignItems: 'center',
    //    justifyContent: 'center',
    //    width: '100%',
    // },
});
