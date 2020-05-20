import React, { Component } from 'react'
import { View, StyleSheet, Image } from 'react-native'
// import PhotoUpload from 'react-native-photo-upload'
import { Container, Button, Card, Text, ListItem, Input, Header, Content, Left, Picker, Icon, Body, Right, H3, H2, DatePicker, Title, Thumbnail } from 'native-base'
import * as Animatable from 'react-native-animatable';
// imports for state management
import { connect } from 'react-redux';
import { logoutUser } from '../../redux';

class ProfileScreen extends Component {

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
        this.props.logoutUser()
    }

    render() {
        // Condition : !this.props.isAuthenticated
        if (false) {
            // GOTO SignIn
        }
        else
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

                        {/* <PhotoUpload
                        onPhotoSelect={avatar => {
                            if (avatar) {
                                console.log('Image base64 string: ', avatar)
                            }
                        }}
                    > */}
                        <Image
                            style={{
                                paddingVertical: 30,
                                width: 150,
                                height: 150,
                                alignSelf: 'center',
                                borderRadius: 75
                            }}
                            resizeMode='cover'
                            source={require('../../assets/profile.jpeg')}
                        />
                        {/* </PhotoUpload> */}

                        {/* <Thumbnail circular large source={require('../../assets/profile.jpeg')} style={styles.logo}/> */}
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
                                <Text>{this.props.userDetails.firstname}</Text>
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
                                <Text>{this.props.userDetails.lastname}</Text>
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
                                <Text>{this.props.userDetails.phone}</Text>
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
                                <Text>{this.props.userDetails.dob}</Text>
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
                                <Text>{this.props.userDetails.gender}</Text>
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
        // height: 150,
        // width: 150,
        alignSelf: 'center',
        margin: 40,
    },
});

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    userDetails: state.auth.userDetails
})

const mapDispatchToProps = (dispatch) => {
    return {
        logoutUser: () => dispatch(logoutUser())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)