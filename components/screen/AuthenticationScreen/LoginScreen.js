import React, { Component } from 'react'
import { View, StyleSheet, ImageBackground, Dimensions, StatusBar } from 'react-native'
import * as Animatable from 'react-native-animatable';
import { Root, Container, Button, Form, Label, Item, Input, Header, Content, Text, Left, Toast, Body, Right, Title, Image } from 'native-base'
import MainScreen from '../MainScreen'
import LoaderModal from '../LoaderModal'
import { AppLoading } from "expo";
import colors from '../../../constants/colors'

import { loginUser } from '../../../redux'
import { connect } from "react-redux";

const screenHeight = Dimensions.get('screen').height;


class LoginScreen extends Component {

    state = {
        isLoading: false,
        isLogin: false,
        email: '',
        password: '',
        emailError: false,
        passwordError: false,
    }

    isValidUsername = () => {
        if (this.state.email != '') {
            this.setState({
                emailError: false,
            })
            return true;
        }
        this.setState({
            emailError: true,
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

    onSignInClick = async () => {
        this.setState({
            isLoading: true,
        })

        if (this.isValidUsername() && this.isValidPassword()) {
            let user = {
                email: this.state.email,
                password: this.state.password,
            }
            // console.log(user);
            await this.props.signInUser(user)
        }
        setTimeout(() => {
            this.setState({ isLoading: false });
        }, 500);
    }

    onSignUpClick = () => {
        this.props.navigation.navigate('SignUpScreen');
    }

    render() {
        if (this.props.isAuthenticated) {
            return <MainScreen />
        }
        else if (this.props.isAuthenticated == null)
            return <AppLoading />
        else
            return (
                <Container>
                    <StatusBar barStyle="light-content" backgroundColor={colors.color5} />
                    <LoaderModal loading={this.state.isLoading} />
                    <Content>
                        <ImageBackground resizeMode='cover' source={require('../../../assets/bgImage.png')} style={{ height: screenHeight }}>
                            <Animatable.Image
                                animation="bounceIn"
                                // duration= {2000}
                                style={styles.logo}
                                source={require('../../../assets/logo.png')}
                                resizeMode="stretch"
                            />
                            <Animatable.View
                                style={styles.footer}
                                animation="fadeInUpBig">
                                <Form>
                                    <Item stackedLabel error={this.state.emailError}>
                                        <Label>Username</Label>
                                        <Input style={{ color: '#fff' }} keyboardType='email-address' error="#f99"
                                            onChangeText={(text) => this.setState({ email: text })} />
                                    </Item>
                                    <Item stackedLabel error={this.state.passwordError}>
                                        <Label>Password</Label>
                                        <Input secureTextEntry={true} style={{ color: '#fff' }} onChangeText={(text) => this.setState({ password: text })}
                                            error="#f99" />
                                    </Item>
                                </Form>
                                <View style={{ flexDirection: 'row', marginTop: 30, marginLeft: 10 }}>
                                    <Left>
                                        <Button style={{ margin: 10, zIndex: 5, elevation: 5 }}
                                            info rounded block onPress={() => this.onSignUpClick()}>
                                            <Text>Sign Up</Text>
                                        </Button>
                                    </Left>
                                    <Right>
                                        <Button style={{ margin: 10, zIndex: 5, elevation: 5 }}
                                            info rounded block onPress={() => this.onSignInClick()}>
                                            <Text>Sign In</Text>
                                        </Button>
                                    </Right>
                                </View>
                            </Animatable.View>
                        </ImageBackground>
                    </Content>
                </Container>
            )
    }

}

const styles = StyleSheet.create({
    footer: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 20,
        backgroundColor: '#05375a50',
        bottom: 0,
        position: 'absolute',
        width: '100%',
        elevation: 2,
        zIndex: 2,
    },
    logo: {
        height: 200,
        width: 200,
        alignSelf: 'center',
        marginTop: 50,
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