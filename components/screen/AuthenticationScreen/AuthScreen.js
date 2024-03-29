import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import * as Animatable from 'react-native-animatable';
import { Root, Container, Button, Form, Label, Item, Input, Header, Content, Text, Left, Toast, Body, Right, Title } from 'native-base'
import MainScreen from '../MainScreen'
import { AppLoading } from "expo";


import AnimateLoadingButton from 'react-native-animate-loading-button';
import { loginUser } from '../../../redux'
import { connect } from "react-redux";
import { createUser } from '../../../redux';


class AuthScreen extends Component {

    state = {
        isLoginScreen: true,
        login: {
            email: '',
            password: '',
            emailError: false,
            passwordError: false,
        },
        username: '',
        password: '',
        phone: null,
        firstname: '',
        lastname: '',
        gender: 'M',
        dob: '2000-01-01',
        usernameError: '',
        passwordError: '',
        firstNameError: false,
        lastNameError: false,
    }


    // isValidUsername = () => {
    //     if (this.state.username != '') {
    //         this.setState({
    //             usernameError: false,
    //         })
    //         return true;
    //     }
    //     this.setState({
    //         usernameError: 'Atleast 8 characters',
    //     }, () =>
    //         Toast.show({
    //             text: this.state.usernameError,
    //             buttonText: 'Okay'
    //         }))
    //     return false;
    // }

    // isValidPassword = () => {
    //     if (this.state.password.length >= 8) {
    //         this.setState({
    //             passwordError: '',
    //         })
    //         return true;
    //     }
    //     this.setState({
    //         passwordError: 'Atleast 8 characters',
    //     }, () =>
    //         Toast.show({
    //             text: this.state.passwordError,
    //             buttonText: 'Okay'
    //         }))
    //     return false;
    // }

    // isValidFirstName = () => {
    //     if (this.state.firstname != '') {
    //         this.setState({
    //             firstNameError: false,
    //         })
    //         return true;
    //     }
    //     this.setState({
    //         firstNameError: true,
    //     }, () =>
    //         Toast.show({
    //             text: this.state.firstNameError,
    //             buttonText: 'Okay'
    //         }))
    //     return false;
    // }

    // isValidLastName = () => {
    //     if (this.state.lastname != '') {
    //         this.setState({
    //             lastNameError: false,
    //         })
    //         return true;
    //     }
    //     this.setState({
    //         lastNameError: true,
    //     }, () =>
    //         Toast.show({
    //             text: this.state.lastNameError,
    //             buttonText: 'Okay'
    //         }))
    //     return false;
    // }

    registerUser = () => {
        // VALIDATION CODE REMOVED FOR EASE OF GETTING TO DASHBOARD @hani
        // this.isValidUsername() && this.isValidPassword() && this.isValidFirstName() && this.isValidLastName()

        if (true) {
            let user = {
                email: this.state.username,
                password: this.state.password,
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                dob: this.state.dob,
                phone: this.state.phone,
                gender: this.state.gender,
            }
            console.log(user);
            this.props.SignUpUser(user)
            // this.props.navigation.navigate('LoginScreen');
        }

    }

    /////

    isValidUsername = () => {
        if (this.state.login.email != '') {
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
        if (this.state.login.password != '') {
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

    onSignInClick() {
        this.loadingButton.showLoading(true);
        if (this.isValidUsername() && this.isValidPassword()) {
            let user = {
                email: this.state.login.email,
                password: this.state.login.password,
            }
            console.log(user);
            this.props.signInUser(user)
        }
        if (!this.props.isAuthenticated) {
            this.loadingButton.showLoading(false);
        }
    }

    onSignUpClick = () => {
        // this.props.navigation.navigate('SignUpScreen');
    }

    toggleScreen = () => {
        this.setState({
            isLoginScreen: !this.state.isLoginScreen
        })
    }

    render() {
        if (this.props.isAuthenticated) {
            return <MainScreen />
        }
        else if (this.props.isAuthenticated == null)
            return <AppLoading />
        else
            return (
                <Container style={styles.container}>
                    <Header>
                        <Left />
                        <Body>
                            <Title>Authentication</Title>
                        </Body>
                        <Right />
                    </Header>

                    <Content style={{ bottom: 0, position: 'absolute', width: '100%', backgroundColor: "#05375a", }}>
                        <Button onPress={() => this.toggleScreen() } ><Text>Switch</Text></Button>
                        <Animatable.Image
                            animation="bounceIn"
                            // duration= {2000}
                            style={styles.logo}
                            source={require('../../assets/logo.png')}
                            resizeMode="stretch"
                        />

                        {this.state.isLoginScreen ?
                            <Animatable.View
                                style={styles.footer}
                                
                                animation={this.state.isLoginScreen ? "fadeInUpBig" : "fadeInUpBig"}>
                                <Form>
                                    <Item stackedLabel error={this.state.login.emailError}>
                                        <Label>Username</Label>
                                        <Input keyboardType='email-address' error="#f99"
                                            onChangeText={(text) => this.setState({ email: text })} />
                                    </Item>
                                    <Item stackedLabel error={this.state.login.passwordError}>
                                        <Label>Password</Label>
                                        <Input onChangeText={(text) => this.setState({ password: text })}
                                            error="#f99" />
                                    </Item>
                                </Form>
                                <View style={{ flexDirection: 'row', marginTop: 30, marginLeft: 10 }}>
                                    <Left>
                                        <Button style={{ margin: 10 }}
                                            info rounded bordered block onPress={() => this.toggleScreen()}>
                                            <Text>SignUp</Text>
                                        </Button>
                                    </Left>
                                    {/* <Body /> */}
                                    <Right>
                                        {/* <Button style={{ margin: 10 }}
                                        info rounded block onPress={() => this.onSignInClick()}>
                                        <Text>SignIn</Text>
                                    </Button> */}
                                        <AnimateLoadingButton
                                            ref={c => (this.loadingButton = c)}
                                            width={150}
                                            height={50}
                                            title="SIGNIN"
                                            titleFontSize={16}
                                            titleColor="rgb(255,255,255)"
                                            backgroundColor='#62B1F6'
                                            borderRadius={25}
                                            onPress={this.onSignInClick.bind(this)}
                                        />
                                    </Right>
                                </View>
                            </Animatable.View>
                            :
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
                                    <View style={{ flexDirection: 'row' }} >
                                        <Item stackedLabel style={{ flex: 1 }} error={this.state.firstNameError}>
                                            <Label>First Name</Label>
                                            <Input error="#f99" onChangeText={(text) => this.setState({ firstname: text })} />
                                        </Item>
                                        <Item stackedLabel style={{ flex: 1 }} error={this.state.lastNameError}>
                                            <Label>Last Name</Label>
                                            <Input error="#f99" onChangeText={(text) => this.setState({ lastname: text })} />
                                        </Item>
                                    </View>
                                    <Item stackedLabel>
                                        <Label>Phone Number</Label>
                                        <Input placeholder='Optional' placeholderTextColor='#ccc'
                                            keyboardType='phone-pad'
                                            onChangeText={(text) => this.setState({ phone: text })} />
                                    </Item>
                                </Form>
                                <View style={{ flexDirection: 'row', marginTop: 30, marginLeft: 10 }}>
                                    <Left>
                                        <Text>Sign in with Google</Text>
                                    </Left>
                                    <Right>
                                        <Button info rounded block onPress={() => this.registerUser()}>
                                            <Text>SignUp</Text>
                                        </Button>
                                    </Right>
                                </View>
                                {/* <Text>{this.state.usernameError}</Text> */}
                            </Animatable.View>
                        }
                    </Content>
                </Container>

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
        signInUser: (user) => dispatch(loginUser(user)),
        SignUpUser: (user) => dispatch(createUser(user))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen)