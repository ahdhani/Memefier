import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import * as Animatable from 'react-native-animatable';
import { Root, Container, Button, Form, Label, Item, Input, Header, Content, Text, Left, Toast, Body, Right, Title } from 'native-base'
import MainScreen from './MainScreen'
import {AppLoading} from "expo";

import { loginUser } from '../../redux'
import { connect } from "react-redux";

class LoginScreen extends Component {

    state = {
        isLogin: false,
        username: '',
        password: '',
        usernameError: false,
        passwordError: false,
    }

    isValidUsername = () => {
        if (this.state.username != '') {
            this.setState({
                usernameError: false,
            })
            return true;
        }
        this.setState({
            usernameError: true,
        })
        return false;
    }

    isValidPassword = () => {
        if (this.state.password != '') {
            this.setState({
                passwordError: false,
            })
            return true;
        }
        this.setState({
            passwordError: true,
        })
        return false;
    }

    onSignInClick = () => {
        if (this.isValidUsername() && this.isValidPassword()) {
            let user = {
                email: this.state.username,
                password: this.state.password,
            }
            console.log(user);
            this.props.signInUser(user)
        }
    }

    onSignUpClick = () => {
        this.props.navigation.navigate('SignUpScreen');
    }

    render() {
        if (this.props.isAuthenticated) {
            return <MainScreen />
        }
        else if(this.props.isAuthenticated==null)
            return <AppLoading />
        else
            return (
                // <Root>
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
                                    <Item stackedLabel error={this.state.usernameError}>
                                        <Label>Username</Label>
                                        <Input keyboardType='email-address' error="#f99"
                                            onChangeText={(text) => this.setState({ username: text })} />
                                    </Item>
                                    <Item stackedLabel error={this.state.passwordError}>
                                        <Label>Password</Label>
                                        <Input onChangeText={(text) => this.setState({ password: text })}
                                            error="#f99" />
                                    </Item>
                                </Form>
                                <View style={{ flexDirection: 'row', marginTop: 30, marginLeft: 10 }}>
                                    <Left>
                                        <Button style={{ margin: 10 }}
                                            info rounded bordered block onPress={() => this.onSignUpClick()}>
                                            <Text>SignUp</Text>
                                        </Button>
                                    </Left>
                                    {/* <Body /> */}
                                    <Right>
                                        <Button style={{ margin: 10 }}
                                            info rounded block onPress={() => this.onSignInClick()}>
                                            <Text>SignIn</Text>
                                        </Button>
                                    </Right>
                                </View>
                            </Animatable.View>
                        </Content>
                    </Container>
                // </Root>

            )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#05375a",
    },
    footer: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 20,
    },
    logo: {
        height: 200,
        width: 200,
        alignSelf: 'center',

    },
});

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
})
const mapDispatchToProps = (dispatch) => {
    return {
        signInUser: (user) => dispatch(loginUser(user))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)