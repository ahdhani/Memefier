import React, { Component } from 'react'
import { StyleSheet, View, Dimensions, ImageBackground, KeyboardAvoidingView } from 'react-native'
import { Container, Button, Card, Text, Form, Label, Item, Input, Header, Content, Left, Root, Toast, Icon, Right, H3, H2, DatePicker, Title } from 'native-base'
import * as Animatable from 'react-native-animatable';
import MainScreen from '../MainScreen'
import LoaderModal from '../LoaderModal'

// imports for state management
import { connect } from 'react-redux';
import { createUser } from '../../../redux';
import { db } from '../../../config';

const screenHeight = Dimensions.get('screen').height;

// Note: Root is used for toast

class SignUp extends Component {

    state = {
        email: '',
        password: '',
        userId: '',
        firstname: '',
        lastname: '',
        emailError: '',
        userIdValid: null,
        passwordError: '',
        firstNameError: false,
        lastNameError: false,
        isLoading: false,
        passwordVisible: false,
    }


    onChangeUserId = async (text) => {
        this.setState({ userId: text });
        if (text !== '') {
            // this.checkUserId(text);
            await db.collection('userId').doc(this.state.userId)
            .get()
            .then((doc) => {
                if (doc.exists) {
                    this.setState({
                        userIdValid: false
                    });
                } else {
                    // doc.data() will be undefined in this case
                    this.setState({
                        userIdValid: true
                    });
                }
            })
            .catch(error => console.log("ERR:", error.message))
        }
        else {
            this.setState({
                userIdValid: false
            });
        }
    }

    isValidUserId = () => {
        if (this.state.userId != '') {
            return this.state.userIdValid
        }
        else {
            this.setState({
                userIdValid: false
            }, () => alert('Invalid User ID'));
            return false
        }
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
        }, () => alert(this.state.passwordError))
        return false;
    }

    isValidEmail = () => {
        if (this.state.email != '') {
            this.setState({
                emailError: '',
            })
            return true;
        }
        this.setState({
            emailError: 'Enter a valid email',
        }, () => alert(this.state.emailError))
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
        })
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
        })
        return false;
    }

    onSignUpClick = async () => {
        this.setState({ isLoading: true });

        // if (true) {
        console.log('user  id ', this.state.userIdValid);

        if (this.isValidEmail() && this.isValidPassword() && this.isValidUserId() && this.isValidFirstName()
            && this.isValidLastName()) {
            console.log(this.state.userIdValid);
            let user = {
                email: this.state.email,
                password: this.state.password,
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                // dob: this.state.dob,
                userId: this.state.userId,
                // gender: this.state.gender,
                // phone: '007'
            }
            console.log(user);
            await this.props.SignUpUser(user)
        }

        this.setState({ isLoading: false });
    }

    render() {
        if (this.props.isAuthenticated) {
            return <MainScreen />
        }
        else
            return (
                <Container>
                    <Content>
                        <LoaderModal loading={this.state.isLoading} />
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

                                    <Item stackedLabel error={this.state.emailError !== ''}>
                                        <Label>Email *</Label>
                                        <Input style={{ color: '#fff' }}
                                            keyboardType='email-address' error="#f99"
                                            onChangeText={(text) => this.setState({ email: text })} />
                                    </Item>
                                    <Item stackedLabel error={this.state.passwordError !== ''}>
                                        <Label>Password *</Label>
                                        <View style={{ flexDirection: 'row', height: 50, alignItems: 'center' }}>
                                            <Input secureTextEntry={!this.state.passwordVisible} style={{ color: '#fff' }}
                                                onChangeText={(text) => this.setState({ password: text })}
                                                error="#f99" />
                                            <Icon name={this.state.passwordVisible ? 'eye-off' : 'eye'}
                                                style={{ color: '#555', height: 50 }}
                                                onPress={() => this.setState({ passwordVisible: !this.state.passwordVisible })} />
                                        </View>

                                    </Item>
                                    <Item stackedLabel error={this.state.userIdValid===false}>
                                        <Label>UserId *</Label>
                                        <View style={{ flexDirection: 'row', height: 50, alignItems: 'center' }}>
                                            <Input style={{ color: '#fff' }} error="#f99" value={this.state.userId}
                                                onChangeText={(text) => this.onChangeUserId(text)} />
                                            <Icon name={this.state.userIdValid ? 'checkmark' : null}
                                                style={{ color: 'green', height: 50 }} />
                                        </View>
                                    </Item>
                                    <View style={{ flexDirection: 'row' }} >
                                        <Item stackedLabel style={{ flex: 1 }} error={this.state.firstNameError}>
                                            <Label>First Name *</Label>
                                            <Input style={{ color: '#fff' }}
                                                error="#f99" onChangeText={(text) => this.setState({ firstname: text })} />
                                        </Item>
                                        <Item stackedLabel style={{ flex: 1 }} error={this.state.lastNameError}>
                                            <Label>Last Name *</Label>
                                            <Input style={{ color: '#fff' }}
                                                error="#f99" onChangeText={(text) => this.setState({ lastname: text })} />
                                        </Item>
                                    </View>
                                </Form>
                                <View style={{ flexDirection: 'row', marginTop: 30, marginLeft: 10 }}>
                                    <Left>
                                        <Text style={{ color: '#ccc', }}>Sign in with Google</Text>
                                    </Left>
                                    <Right>
                                        <Button style={{ backgroundColor: '#05375a', elevation: 10, zIndex: 10 }} rounded block onPress={() => this.onSignUpClick()}>
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
        SignUpUser: (user) => dispatch(createUser(user))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SignUp)