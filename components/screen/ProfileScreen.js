import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { Container, Button, Card, Text, ListItem, Input, Header, Content, Left, Picker, Icon, Body, Right, H3, H2, DatePicker, Title } from 'native-base'
import * as Animatable from 'react-native-animatable';


export default class ProfileScreen extends Component {

    state = {
        user: {
            username: 'kjdsb',
            password: 'laksnf',
            phone: '9526724541',
            firstname: 'askln',
            lastname: 'kasn',
            gender: 'M',
            dob: '2000-01-01',
        }
    }

    signOutClicked = () => {

    }

    render() {
        return (
            <Container>
                <Header>
                    <Left />
                    <Body>
                        <Title>Profile</Title>
                    </Body>
                    <Right>
                        <Button info onPress={() => this.signOutClicked()}>
                            <Text>SignOut</Text>
                        </Button>
                    </Right>
                </Header>
                <Content>

                    <Animatable.Image
                            animation="bounceIn"
                            // duration= {2000}
                            style={styles.logo}
                            source={require('../../assets/splash.png')}
                            resizeMode="stretch"
                        />
                    <ListItem icon>
                        <Left>
                            <Button style={{ backgroundColor: "#FF9501" }}>
                                <Icon active name="airplane" />
                            </Button>
                        </Left>
                        <Body>
                            <Text>Name</Text>
                        </Body>
                        <Right>
                            <Text>{this.state.user.firstname}</Text>
                        </Right>
                    </ListItem>
                    <ListItem icon>
                        <Left>
                            <Button style={{ backgroundColor: "#FF9501" }}>
                                <Icon active name="airplane" />
                            </Button>
                        </Left>
                        <Body>
                            <Text>Email</Text>
                        </Body>
                        <Right>
                            <Text>{this.state.user.username}</Text>
                        </Right>
                    </ListItem>
                    <ListItem icon>
                        <Left>
                            <Button style={{ backgroundColor: "#FF9501" }}>
                                <Icon active name="airplane" />
                            </Button>
                        </Left>
                        <Body>
                            <Text>Phone Number</Text>
                        </Body>
                        <Right>
                            <Text>{this.state.user.phone}</Text>
                        </Right>
                    </ListItem>
                    <ListItem icon>
                        <Left>
                            <Button style={{ backgroundColor: "#FF9501" }}>
                                <Icon active name="airplane" />
                            </Button>
                        </Left>
                        <Body>
                            <Text>Date of Birth</Text>
                        </Body>
                        <Right>
                            <Text>{this.state.user.dob}</Text>
                        </Right>
                    </ListItem>
                    <ListItem icon>
                        <Left>
                            <Button style={{ backgroundColor: "#FF9501" }}>
                                <Icon active name="airplane" />
                            </Button>
                        </Left>
                        <Body>
                            <Text>Gender</Text>
                        </Body>
                        <Right>
                            <Text>{this.state.user.gender}</Text>
                        </Right>
                    </ListItem>
                </Content>
            </Container>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#aaa',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    logo: {
        height: 150,
        width: 150,
        alignSelf: 'center',
        margin: 40,
    },
});
