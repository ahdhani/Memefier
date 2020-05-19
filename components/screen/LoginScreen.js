import React, { Component } from 'react'
import {  View, StyleSheet} from 'react-native'
import * as Animatable from 'react-native-animatable';
import { Root,Container, Button,  Form, Label, Item, Input, Header, Content, Text,Left, Toast, Body, Right, H3, H2, Title } from 'native-base'

import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import { signIn } from '../../redux'

export default class LoginScreen extends Component {

    state = {
        isLogin: false,
        username: '',
        password: '',
        usernameError: '',
        passwordError: '',
    }

    componentDidMount = async () => {

        await Font.loadAsync({
          Roboto: require('native-base/Fonts/Roboto.ttf'),
          Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
          ...Ionicons.font,
        });
        // this.setState({ isReady: true });
      }


    isValidUsername = () => {
        if (this.state.username != '') {
            this.setState({
                usernameError: false,
            })
            return true;
        }
        this.setState({
            usernameError: 'Atleast 8 characters',
        })
        Toast.show({
            text: this.state.usernameError,
            buttonText: 'Okay'
          })
        return false;
    }

    isValidPassword = () => {
        if (this.state.password.length >= 8) {
            this.setState({
                passwordError: '',
            })
            return true;
        }
        this.setState({
            passwordError: 'Atleast 8 characters',
        })
        Toast.show({
            text: this.state.passwordError,
            buttonText: 'Okay'
          })
        return false;
    }

    onSignInClick = () => {
        if (this.isValidUsername() && this.isValidPassword()) {
            let user = {
                username: this.state.username,
                password: this.state.password,
            }
            // alert(user);
            console.log(user);
            this.props.navigation.navigate('ProfileScreen');
        }
    }

    onSignUpClick = () => {
        this.props.navigation.navigate('SignUpScreen');
    }

    render() {
        return (
            <Root>
            <Container style={styles.container}>
                <Header>
                    <Left />
                    <Body>
                        <Title>Login</Title>
                    </Body>
                    <Right />
                </Header>

                <Content style={{ bottom: 0, position: 'absolute', width: '100%', backgroundColor: "#05375a", }}>
                    <Animatable.Image
                        animation="bounceIn"
                        // duration= {2000}
                        style={styles.logo}
                        source={require('../../assets/logo.png')}
                        resizeMode="stretch"
                    />
                    <Animatable.View
                        style={styles.footer}
                        animation="fadeInUpBig">
                        <Form>
                            <Item stackedLabel error={this.state.usernameError !== ''}>
                                <Label>Username</Label>
                                <Input keyboardType='email-address' error="#f99"
                                    onChangeText={(text) => this.setState({ username: text })} />
                            </Item>
                            <Item stackedLabel error={this.state.passwordError !== ''}>
                                <Label>Password</Label>
                                <Input onChangeText={(text) => this.setState({ password: text })}
                                    error="#f99" />
                            </Item>
                        </Form>
                        <View style={{ flexDirection: 'row', marginTop: 30, marginLeft: 10 }}>
                            <Left>
                                <Button style={{margin: 10}}
                                info rounded bordered block onPress={() => this.onSignUpClick()}>
                                    <Text>SignUp</Text>
                                </Button>
                            </Left>
                            {/* <Body /> */}
                            <Right>
                                <Button style={{margin: 10}}
                                info rounded block onPress={() => this.onSignInClick()}>
                                    <Text>SignIn</Text>
                                </Button>
                            </Right>
                        </View>
                    </Animatable.View>
                </Content>
            </Container>
            </Root>

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