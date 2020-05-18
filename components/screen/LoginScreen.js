import React, { Component } from 'react'
import { Text, View, StyleSheet , SafeAreaView, TouchableOpacity, TextInput} from 'react-native'
import GlobalStyles from '../../constants/GlobalStyles';
import * as Animatable from 'react-native-animatable';

import {signIn} from '../../redux'

export default class LoginScreen extends Component {

    state = {
        isLogin: false,
        username: '',
        password: '',
    }
    
    componentDidMount = async () => {
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

    }

    onSignUpClick = () => {
        let user = {
            username: this.state.username,
            password: this.state.password,
        }
        this.props.onSignUpClick(user)
        
    }

    render() {
        return (
            <SafeAreaView style = {GlobalStyles.AndroidSafeArea}>

                <View style = {styles.container}>
                    <View style={styles.header}>
                        <Animatable.Image
                            animation="bounceIn"
                            // duration= {2000}
                            style={styles.logo}
                            source={require('../../assets/logo.png')}
                            resizeMode="stretch"
                        />

                    </View>

                    <Animatable.View 
                        style = {styles.footer}
                        animation = "fadeInUpBig"
                        >

                        <Text style={styles.title}>Welcome </Text>
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

                        <View style={styles.rowContainer}>
                            <TouchableOpacity style = {styles.signUp}>
                                <Text style = {[styles.btnText,{color: '#111'}]}>
                                    SignUp
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style = {styles.signIn}>
                                <Text style = {styles.btnText}>
                                    SignIn
                                </Text>
                            </TouchableOpacity>
                        </View>

                    </Animatable.View>

                </View>

            </SafeAreaView>
        
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#05375a",
    },
    btnText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "#fff"
    },
    signIn: {
        backgroundColor: "#2196f3",
        borderRadius: 10,
        justifyContent: 'center',
        // alignContent: 'center',
        // textAlign: 'center',
        marginHorizontal: 5,
        padding: 7,
        flexDirection: "row",
        flex: 1,
        maxHeight: 50,

    },
    signUp: {
        borderColor: "#2196f3",
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: 'center',
        marginHorizontal: 5,
        padding: 7,
        flexDirection: "row",
        flex: 1,
        maxHeight: 50,

    },
    inputBox: {
        backgroundColor: '#eee',
        flexDirection: "row",
        flex: 1,
        padding: 10,
        margin: 1,
        minHeight: 70,
        maxHeight: 70,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 30,
        // width: 300,
        flex: 1,
        padding: 10,
        marginBottom: 10,
    },
    header: {
        padding: 10,
        flex: 3,
        alignContent: 'center',
        justifyContent: 'center',
        // backgroundColor: 'blue',
    },
    footer: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 20,
        flex: 2,
        // marginBottom: 20,
    },
    logo: {
        left: 100,
        height: 200,
        width: 200,
        alignSelf: 'center',

    },
    rowContainer: {
        flexDirection: 'row',
        flex: 1,
        marginTop: 15,
    }
});