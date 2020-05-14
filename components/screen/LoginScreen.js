import React, { Component } from 'react'
import { Text, View, StyleSheet , SafeAreaView, TouchableOpacity, TextInput} from 'react-native'
import GlobalStyles from '../../constants/GlobalStyles';
import { TextField} from 'react-native-material-textfield'

export default class LoginScreen extends Component {

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
            <SafeAreaView style = {GlobalStyles.AndroidSafeArea}>
                <View style = {GlobalStyles.container}>
                    <Text style={styles.h1Text}>Login</Text>
                    <TextInput 
                                 placeholder="Username" 
                                 placeholderTextColor="#777"
                                 style = {styles.inputBox} 
                                //  underlineColorAndroid="transparent"
                                 onChangeText={ (username) => this.setState({username})  }
                                 value={this.state.username}
                    ></TextInput>
                    <TextInput 
                                 placeholder="Password" 
                                 placeholderTextColor="#777"
                                 style = {styles.inputBox} 
                                 onChangeText={ (password) => this.setState({password})  }
                                 value={this.state.password}
                    ></TextInput>
                    <TouchableOpacity style = {styles.submitBtn}>
                        <Text style = {styles.submitText}>
                            Submit
                        </Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        
        )
    }

}

const styles = StyleSheet.create({
    container: {
    },
    submitText: {
        fontSize: 20,
        // fontWeight: 'bold',
        color: "#fff"
    },
    submitBtn: {
        backgroundColor: "#2196f3",
        borderRadius: 10,
        textAlign: 'center',
        padding: 10,
        paddingLeft: 25,
        paddingRight: 25,
        marginTop: 15,
    },
    inputBox: {
        backgroundColor: '#aaa',
        height: 70,
        width: 300,
        borderRadius: 10,
        padding: 10,
        margin: 5,
    },
    h1Text: {
        backgroundColor: '#aaa',
        color: '#fff',
        fontSize: 30,
        width: 300,
        padding: 10,
        marginBottom: 25,
    }
});