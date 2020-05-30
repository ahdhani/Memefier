import React, { Component } from 'react'
import { StyleSheet, View, Dimensions, ImageBackground } from 'react-native'
import { Container, Button, Card, Text, Form, Label, Item, Input, Header, Content, Left, Picker, Icon, Body, Right, H3, H2, DatePicker, Title } from 'native-base'
import * as Animatable from 'react-native-animatable';
import MainScreen from './MainScreen'
// imports for state management
import { connect } from 'react-redux';
import { createUser } from '../../redux';

const screenHeight = Dimensions.get('screen').height;

class SignUp extends Component {

    state = {
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

    isValidUsername = () => {
        if (this.state.username != '') {
            this.setState({
                usernameError: false,
            })
            return true;
        }
        this.setState({
            usernameError: 'Atleast 8 characters',
        }, () =>
            Toast.show({
                text: this.state.usernameError,
                buttonText: 'Okay'
            }))
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
        }, () =>
            Toast.show({
                text: this.state.passwordError,
                buttonText: 'Okay'
            }))
        return false;
    }

    isValidFirstName = () => {
        if (this.state.firstname != '') {
            this.setState({
                firstNameError: false,
            })
            return true;
        }
        this.setState({
            firstNameError: true,
        }, () =>
            Toast.show({
                text: this.state.firstNameError,
                buttonText: 'Okay'
            }))
        return false;
    }

    isValidLastName = () => {
        if (this.state.lastname != '') {
            this.setState({
                lastNameError: false,
            })
            return true;
        }
        this.setState({
            lastNameError: true,
        }, () =>
            Toast.show({
                text: this.state.lastNameError,
                buttonText: 'Okay'
            }))
        return false;
    }

    onSignUpClick = () => {
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

    render() {
        if (this.props.isAuthenticated) {
            return <MainScreen />
        }
        else
            return (

                <Container>
                    <Content>
                        <ImageBackground resizeMode='cover' source={require('../../assets/bgImage.png')} style={{ height: screenHeight }}>
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
                                        <Text style={{color: '#555'}}>Sign in with Google</Text>
                                    </Left>
                                    <Right>
                                        <Button info rounded block onPress={() => this.onSignUpClick()}>
                                            <Text>SignUp</Text>
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
        elevation: 1,
        zIndex: 1,
        
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
        SignUpUser: (user) => dispatch(createUser(user))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SignUp)