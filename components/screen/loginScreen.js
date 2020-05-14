import React, { Component } from 'react'
import { Text, View, StyleSheet} from 'react-native'

export default class loginScreen extends Component {

    state = {
        isLogin: false,
        username: '',
        password: '',
    }

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
        <View style = {styles.container}>
        </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
       padding: 10,
       paddingBottom: 25,
       flex: 1,
       backgroundColor: '#aaa',
       alignItems: 'center',
       justifyContent: 'center',
       width: '100%',
    },
});