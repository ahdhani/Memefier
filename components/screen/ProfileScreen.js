import React, { Component } from 'react'
import { Text, View, StyleSheet, SafeAreaView} from 'react-native'
import GlobalStyles from '../../constants/GlobalStyles';

export default class ProfileScreen extends Component {

    // state = {

    // }

    // componentDidMount = async () => {
    //     const percent = await AsyncStorage.getItem('percent');
    //     const subjects = await AsyncStorage.getItem('subjects');
    //     if (subjects && subjects.length > 0) {
    //         this.setState({
    //             subjects: JSON.parse(subjects),
    //             minPercent: JSON.parse(percent),
    //         })
    //     }
    // }

    render() {
        return (
        <SafeAreaView style = {GlobalStyles.AndroidSafeArea}>
            <View style = {GlobalStyles.container}>
                <Text>Profile</Text>
            </View>
        </SafeAreaView>
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
