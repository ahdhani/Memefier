import React, { Component } from 'react'
import { View, StyleSheet, Image ,TouchableOpacity} from 'react-native'
// import PhotoUpload from 'react-native-photo-upload'
import { Container, Button, Card, Text, ListItem, Input, Header, Content, Left, Picker, Icon, Body, Right, H3, H2, DatePicker, Title, Thumbnail } from 'native-base'
import * as Animatable from 'react-native-animatable';
// imports for state management
import { connect } from 'react-redux';
import { logoutUser, unfollow_user, follow_user } from '../../redux';

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
            avatar: null,
        }
    }

    signOutClicked = () => {
        this.props.logoutUser() 
    }

    // Sarath uid : hxvrXBCpjXY1H7NvdHqZQEohH7o2

    followUser = () => {
        console.log("Follow user clicked");
        this.props.follow("hxvrXBCpjXY1H7NvdHqZQEohH7o2");
    }

    unfollowUser = () => {
        console.log("Unfollow clicked");
        this.props.unfollow("hxvrXBCpjXY1H7NvdHqZQEohH7o2");
    }

    render() {
        // Condition : !this.props.isAuthenticated
        // if (false) {
            // GOTO SignIn
        // }
        // else
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
                    <TouchableOpacity style={{alignSelf: 'center', marginVertical: 30}}>
                    <Image
                            style={{
                                paddingVertical: 30,
                                width: 150,
                                height: 150,
                                alignSelf: 'center',
                                borderRadius: 75,
                                backgroundColor: '#ccc'
                            }}
                            resizeMode='cover'
                            source={{uri: this.state.avatar}}
                            
                        />
                        <Icon name='add' style={{alignSelf: 'center', position: 'absolute',top: 65}} /> 
                    </TouchableOpacity>
                        
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
                        <ListItem icon>
                            <Left>
                                <Button style={{ backgroundColor: "#FF9501" }}>
                                    <Icon active name="airplane" />
                                </Button>
                            </Left>
                            <Body>
                                <Text>Following</Text>
                            </Body>
                            <Right>
                                <Text>{this.props.following}</Text>
                            </Right>
                        </ListItem>

                        <Button info onPress={() => this.followUser()}>
                            <Text>Follow SARATH</Text>
                        </Button>
                        <Button info onPress={() => this.unfollowUser()}>
                            <Text>Unfollow SARATH</Text>
                        </Button>
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
    userDetails: state.auth.userDetails , 
    following : state.auth.following
})

const mapDispatchToProps = (dispatch) => {
    return {
        logoutUser: () => dispatch(logoutUser()) ,
        unfollow : (user_id) => dispatch(unfollow_user(user_id)) ,
        follow : (user_id) => dispatch(follow_user(user_id))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)