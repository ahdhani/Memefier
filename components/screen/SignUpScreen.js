import React, { Component } from 'react'
import { Text, View, StyleSheet, SafeAreaView} from 'react-native'
import GlobalStyles from '../../constants/GlobalStyles';

export default class SignUpScreen extends Component {

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
            <View style = {styles.container}>
                <View style={styles.header}>

                </View>
                <View style = {styles.footer}>

                </View>
            </View>
        </SafeAreaView>
        )
    }

}

const styles = StyleSheet.create({
    container: {
       flex: 1,
       backgroundColor: '#05375a',
    },
    header: {
        padding: 10,
        flex: 2,
    },
    footer: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 10,
        flex: 1,
    }
});
