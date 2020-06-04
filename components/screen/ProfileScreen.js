import React, { Component } from 'react'
import { View, StyleSheet, Image, TouchableOpacity, FlatList, Dimensions } from 'react-native'
import { Container, Button, Card, Text, ListItem, Input, Header, Content, Left, Picker, Icon, Body, Right, H3, H2, DatePicker, Title, Thumbnail, H1 } from 'native-base'
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
// imports for state management
import { connect } from 'react-redux';
import { logoutUser, unfollow_user, follow_user } from '../../redux';
import { storage } from '../../config'

import { db } from '../../config';


const cardWidth = Dimensions.get('window').width / 2;
const cardHeight = cardWidth * 1.25;

class ProfileScreen extends Component {

    state = {
        userPosts: [],
        user: {
            username: 'kjdsb',
            password: 'laksnf',
            phone: '9526724541',
            firstname: 'askln',
            lastname: 'kasn',
            gender: 'M',
            dob: '2000-01-01',
            avatar: null,
        } ,
        image: null,
        postOnProgress: false,
        progress: null
    }

    fetchUserPosts = async () => {
        var arr = []
        await db.collection('posts')
            .where('created_by', '==', this.props.user.uid)   //KUDU please check this statement
            .get()
            .then(snapshot => {
                snapshot.docs.forEach(doc => {
                    arr = [doc.data(), ...arr]
                })

                console.log("User post", arr)
                this.setState({
                    userPosts: arr
                })
            }).
            catch(error => console.log("ERR : ", error.message))
    }

    componentDidMount() {
        this.getPermissionAsync();
        this.fetchUserPosts();
        console.log("User post")

    }

    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    };

    _pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });
            if (!result.cancelled) {
                const user = this.state.user;
                user.avatar = result.uri;
                this.setState({ user: user });
                this.setState({             //Code added by Hani
                    ...this.state,
                    postOnProgress: true,
                })
            } 
            // console.log(result);
        } catch (E) {
            console.log(E);
        }
    };

    signOutClicked = () => {
        this.props.logoutUser()
    }

    render() {
        // Condition : !this.props.isAuthenticated
        // if (false) {
        // GOTO SignIn
        // }
        // else
        return (
            <Container>
                <Header style={{ backgroundColor: '#252337' }}>
                    <Left />
                    <Body>
                        {/* <Title>Profile</Title> */}
                    </Body>
                    <Right>
                        <Button transparent onPress={() => this.signOutClicked()}>
                            <Text>SignOut</Text>
                        </Button>
                    </Right>
                </Header>
                <Content style={{ backgroundColor: '#252337', height: '100%', }}>
                    <H1 style={{ alignSelf: 'center', marginTop: 30, color: '#9db4c0' }}>
                        @userID
                        </H1>
                    <Text note style={{
                        alignSelf: 'center',
                        marginBottom: 150,
                    }}>
                        Rank 0
                        </Text>
                    <View style={{ flexGrow: 2,flex: 2, backgroundColor: '#ffffff', borderTopLeftRadius: 30, borderTopRightRadius: 30, }}>
                        <View style={{
                            flexDirection: 'row', justifyContent: 'space-around',
                            marginTop: -110,
                        }}>
                            <View style={{ justifyContent: 'center' }}>
                                <H1 style={{ alignSelf: 'center', color: '#9db4c0' }}>0</H1>
                                <Text note>Followers</Text>
                            </View>

                            <TouchableOpacity style={{
                                alignSelf: 'center', elevation: 10,
                                zIndex: 10, width: 150,
                                height: 150, borderRadius: 75,
                                }}
                                onPress={() => this._pickImage()}>
                                <Image
                                    style={{
                                        paddingVertical: 30,
                                        width: 150,
                                        height: 150,
                                        alignSelf: 'center',
                                        borderRadius: 75,
                                        backgroundColor: '#5c6b73',
                                    }}
                                    resizeMode='cover'
                                    source={{ uri: this.state.user.avatar ? this.state.user.avatar : null }}  //change null to defaault uri

                                />
                            </TouchableOpacity>
                            <View style={{ justifyContent: 'center' }}>
                                <H1 style={{ alignSelf: 'center', color: '#9db4c0' }}>{this.props.following.length}</H1>
                                <Text note>Following</Text>
                            </View>
                        </View>

                        <H1 style={{ alignSelf: 'center', marginTop: 20 }}>
                            {this.props.userDetails.firstname} {this.props.userDetails.lastname}
                        </H1>
                        <Text note style={{
                            alignSelf: 'center',
                            // height: 500   //clear when wanted
                        }}>Description</Text>

                        <FlatList
                            data={this.state.userPosts}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index }) => (
                                <Item>
                                    <Image resizeMode='contain' source={require('../../assets/profile.jpeg')}
                                        style={{
                                            width: cardWidth, height: cardHeight,
                                            elevation: 5, zIndex: 5
                                        }}>
                                    </Image>
                                </Item>
                            )}
                            numColumns={2}
                        // enableEmptySections={true}
                        />
                    </View>

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
    userDetails: state.auth.userDetails,
    following: state.auth.following
})

const mapDispatchToProps = (dispatch) => {
    return {
        logoutUser: () => dispatch(logoutUser()),
        unfollow: (user_id) => dispatch(unfollow_user(user_id)),
        follow: (user_id) => dispatch(follow_user(user_id))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)

/*
@reference :
===============================================================================
For display picture uri

this.props.userDetails.dp
default 'https://firebasestorage.googleapis.com/v0/b/memefier-rest-api.appspot.com/o/dp%2Fdefault.png?alt=media&token=b848e1ca-2c36-42cb-932a-049fe6dceeb9'

*/