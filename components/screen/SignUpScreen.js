import React, { Component } from 'react'
import {  StyleSheet, View} from 'react-native'
import { Container , Button, Card, Text, Form, Label, Item, Input, Header, Content, Left, Picker, Icon, Body, Right, H3, H2, DatePicker} from 'native-base'
import GlobalStyles from '../../constants/GlobalStyles';
import * as Animatable from 'react-native-animatable';

// const Items = Picker.Item;



export default class SignUp extends Component {

    state = {
        username: '',
        password: '',
        phone: null,
        firstname: '',
        lastname: '',
        gender: 'M',
        dob: new Date(),
        usernameError: '',
        passwordError: '',
        firstNameError: false,
        lastNameError: false,

    }
    
    // componentDidMount = async () => {
    //     const requestOptions = {
    //         method: 'GET',
    //         redirect: 'follow'
    //     };
    //     fetch("https://us-central1-memefier.cloudfunctions.net/helloWorld", requestOptions)
    //     .then(response => response.text())
    //     .then(result => console.log(result))
    //     .catch(error => console.log('error', error));
    // }

    isValidUsername = () => {
        if(this.state.username!='')
        {
            this.setState({
                usernameError: false,
            })
            return true;
        }
        this.setState({
            usernameError: 'Atleast 8 characters',
        })
        return false;
    }

    isValidPassword = () => {
        if(this.state.password.length >= 8)
        {
            this.setState({
                passwordError: '',
            })
            return true;
        }
        this.setState({
            passwordError: 'Atleast 8 characters',
        })
        return false;
    }

    isValidFirstName = () => {
        if(this.state.firstname!='')
        {
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
        if(this.state.lastname!='')
        {
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

    onSignUpClick = () => {
        if(this.isValidUsername() && this.isValidPassword() &&
         this.isValidFirstName() && this.isValidLastName())
        {
            let user = {
                username: this.state.username,
                password: this.state.password,
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                dob: this.state.dob,
                phone: this.state.phone,
                gender: this.state.gender,
            }
            alert(user);
            console.log(user);
        }
            
    }

    render() {
        return (

                <Container style={styles.container}>
                    <Header>
                        <Left style={{padding: 10}}>
                            {/* <Icon name='left' /> */}
                        </Left>
                        <Body>
                            <H2 style={{fontWeight: 'bold',}}>SignUp</H2>
                            {/* <Text>SignUp</Text> */}
                        </Body>
                        <Right/>
                    </Header>
        
                    <Content style={{bottom: 0,position: 'absolute',width: '100%',backgroundColor: "#05375a",}}>
                    <Animatable.Image
                            animation="bounceIn"
                            // duration= {2000}
                            style={styles.logo}
                            source={require('../../assets/logo.png')}
                            resizeMode="stretch"
                        />
                    <Animatable.View
                        style = {styles.footer}
                        animation = "fadeInUpBig">
                    <Form>
                        <Item stackedLabel error={this.state.usernameError!==''}>
                            <Label>Username</Label>
                            <Input keyboardType='email-address' error="#f99"
                                onChangeText={(text) => this.setState({username: text})  }/>
                        </Item>
                        <Item stackedLabel error={this.state.passwordError!==''}>
                            <Label>Password</Label>
                            <Input onChangeText={(text) => this.setState({password: text})  }
                                  error="#f99"  />
                        </Item>
                        <View style={{flexDirection:'row'}} >
                            <Item stackedLabel style={{flex: 1}} error={this.state.firstNameError}>
                                <Label>First Name</Label>
                                <Input error="#f99" onChangeText={(text) => this.setState({firstname: text})  }/>
                           </Item>
                            <Item stackedLabel style={{flex: 1}} error={this.state.lastNameError}>
                                <Label>Last Name</Label>
                                <Input error="#f99" onChangeText={(text) => this.setState({lastname: text})  }/>
                            </Item>
                        </View>
                    
                    
                        <View style={{flexDirection:'row'}}>
                            <Item stackedLabel style={{flex: 1}}>
                                <Label>Date of Birth</Label>
                                <DatePicker
                                    defaultDate={new Date(2000, 1, 1)}
                                    minimumDate={new Date(1940, 1, 1)}
                                    maximumDate={new Date(2020, 12, 31)}
                                    locale={"en"}
                                    timeZoneOffsetInMinutes={undefined}
                                    modalTransparent={false}
                                    animationType={"fade"}
                                    androidMode={"spinner"}
                                    placeHolderText="Select"
                                    // textStyle={{ color: "green" }}
                                    placeHolderTextStyle={{ color: "#d3d3d3" }}
                                    onDateChange={ (date) => this.setState({dob: date})  }
                                    disabled={false}
                                    />
                            </Item>
                            <Item stackedLabel style={{flex: 1}}>
                                <Label>Gender</Label>
                                <Picker
                                    iosHeader="Select one"
                                    mode="dropdown"
                                    selectedValue={this.state.gender}
                                    onValueChange={(itemValue,itemIndex) => this.setState({gender: itemValue})  }
                                    >
                                        <Picker.Item label="Male" value="M" />
                                        <Picker.Item label="Female" value="F" />
                                        <Picker.Item label="Other" value="O" />
                                    </Picker>
                            </Item>
                        </View>
                        <Item stackedLabel>
                            <Label>Phone Number</Label>
                            <Input placeholder='Optional' placeholderTextColor='#ccc' 
                                    keyboardType='phone-pad'
                                    onChangeText={(text) => this.setState({phone: text})  }/>
                        </Item>
                    </Form>
                    <View style={{flexDirection: 'row',marginTop: 30,marginLeft: 10}}>
                            <Left>
                                <Text>Sign in with Google</Text>
                            </Left>
                            <Right>
                                <Button info rounded block onPress ={() =>this.onSignUpClick()}>
                                     <H3 style={{color: '#fff'}}>
                                         Signup
                                     </H3>
                                </Button>
                            </Right>
                    </View>
        {/* <Text>{this.state.usernameError}</Text> */}
                    </Animatable.View>
                    </Content>
                </Container>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: "#05375a",
    },
    footer: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 20,
    },
    logo: {
        height: 100,
        width: 100,
        alignSelf: 'center',
        margin: 40,
    },
});