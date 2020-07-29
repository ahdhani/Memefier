import React, { Component } from 'react'
import { View, StyleSheet, ScrollView, TouchableOpacity, FlatList, Dimensions, ImageBackground } from 'react-native'
import { Container, Button, Card, Text, Item,Header, Left, Icon, Body, Right,CardItem } from 'native-base'
import colors from '../../../constants/colors'
// imports for state management
import { connect } from 'react-redux';
import { logoutUser, unfollow_user, follow_user, } from '../../../redux';

import { db } from '../../../config';
import { fetchUserDetails } from '../../functions/user'

const cardWidth = (Dimensions.get('window').width / 2) - 4;
const cardHeight = cardWidth * 1.25;

class ProfileScreen extends Component {

    state = {
        userPosts: [],
        userDetails: [],
    }

    fetchUserPosts = async (uuid) => {
        var arr = []
        await db.collection('posts')
            .where('created_by', '==', uuid)   //KUDU please check this statement
            .get()
            .then(snapshot => {
                snapshot.docs.forEach(doc => {
                    arr = [doc.data(), ...arr]
                })
                this.setState({
                    userPosts: arr
                })
            }).
            catch(error => console.log("ERR : ", error.message))
    }

    componentDidMount = async () => {
        // this.props.navigation.addListener(
        //     'didFocus',
        //     payload => {
        //       this.forceUpdate();
        //     }
        //   );
        console.log(this.props.userPosts)
        if (this.props.route.params.uuid != null) {
            const user = await fetchUserDetails(this.props.route.params.uuid)
            this.setState({ userDetails: user },
                () => this.fetchUserPosts(this.props.route.params.uuid))
        }
        else {
            this.setState({ userDetails: this.props.userDetails },
                () => this.fetchUserPosts(this.props.user.uid)
                // async () => {
                // await this.props.fetchPosts()
                // this.setState({ userPosts: this.props.userPosts })
                // }
            )
        }
    }

    toggleFollow = (uuid) => {
        if (this.props.following.includes(uuid)) {
            this.props.unfollow(uuid);
        } else {
            this.props.follow(uuid);
        }
    }

    signOutClicked = () => {
        this.props.logoutUser()
    }

    render() {
        const { uuid } = this.props.route.params;

        return (
            <Container>
                <ScrollView>

                    <Header style={{ backgroundColor: colors.color5 }}>
                        <Left />
                        <Body>
                            {/* <Title>Profile</Title> */}
                        </Body>
                        <Right>
                            {!uuid &&
                                <Button transparent onPress={() => this.signOutClicked()}>
                                    <Text style={{ color: colors.color1 }} >SignOut</Text>
                                </Button>
                            }

                        </Right>
                    </Header>

                    <View style={{ backgroundColor: colors.color5, height: 180 }} />
                    <View style={{
                        backgroundColor: '#fff', marginTop: -30,
                        borderTopLeftRadius: 30, borderTopRightRadius: 30
                    }}>
                        <View style={{
                            flexDirection: 'row', justifyContent: 'space-around',
                            marginTop: -110, alignItems: 'center'
                        }}>

                            <ImageBackground
                                style={{
                                    borderRadius: 150,
                                    width: 150,
                                    height: 150,
                                    alignSelf: 'center',
                                    backgroundColor: colors.color3,
                                    zIndex: 10,
                                    elevation: 10,
                                }}
                                imageStyle={{ borderRadius: 150 }}
                                resizeMode='cover'
                                source={{ uri: this.state.userDetails.dp }}

                            >
                                {!uuid &&
                                    <TouchableOpacity style={{
                                        position: 'absolute', bottom: 5,
                                        right: 5, backgroundColor: colors.color1,
                                        borderRadius: 20,
                                        height: 40, width: 40,
                                        alignItems: 'center', justifyContent: 'center',
                                        zIndex: 10, elevation: 10,
                                    }} onPress={() => this.props.navigation.navigate('EditProfileScreen')}>
                                        <Icon name='create' style={{ fontSize: 20, textAlign: 'center' }} />
                                    </TouchableOpacity>
                                }
                            </ImageBackground>

                            <View style={{ alignItems: 'center' }}>
                                <Text style={{ color: colors.color1, fontSize: 25 }}>
                                    @{this.state.userDetails.userId}
                                </Text>
                                <Text note>Rank 0</Text>
                            </View>
                        </View>
                        <View style={{
                            flexDirection: 'row', justifyContent: 'space-between',
                            alignItems: 'flex-end', marginTop: 20,
                        }}>
                            <View style={{ paddingLeft: 40 }}>
                                <Text style={{ color: colors.color3, fontSize: 26 }}>
                                    {this.state.userDetails.firstname} {this.state.userDetails.lastname}
                                    {uuid && uuid != this.props.user.uid &&
                                        <Text style={{ color: colors.color3, fontSize: 16 }}
                                            onPress={() => this.toggleFollow(uuid)}>
                                            {(this.props.following.includes(uuid)) ? '  Unfollow ' : '  Follow'}
                                        </Text>
                                    }
                                </Text>
                                <Text note>{this.state.userDetails.bio}</Text>
                            </View>
                            <View style={{ justifyContent: 'center', marginRight: 40, }}>
                                <Text style={{ alignSelf: 'center', color: colors.color3, fontSize: 25 }}>
                                    {this.state.userDetails.followers}
                                </Text>
                                <Text note>Followers</Text>
                            </View>
                        </View>
                        <Card>
                            <CardItem style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                <TouchableOpacity style={{
                                    flexDirection: 'row', backgroundColor: colors.color1,
                                    borderRadius: 5, padding: 5,
                                    elevation: 5, zIndex: 5,
                                }} onPress={() => this.props.navigation.navigate('UploadScreen')}>
                                    <Icon name='add' style={{ textAlign: 'center' }} />
                                    <Text>Create  </Text>
                                </TouchableOpacity>
                            </CardItem>

                            <CardItem cardBody>
                                <FlatList
                                    data={this.state.userPosts}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({ item, index }) => (
                                        <Item onPress={() => this.props.navigation.navigate('PostScrollScreen', {
                                            post: this.state.userPosts,
                                            index: index,
                                        })}>
                                            <ImageBackground resizeMode='contain' source={{ uri: item.img }}
                                                style={{
                                                    // flex: 1,width: '100%',
                                                    width: cardWidth, height: cardHeight, margin: 1,
                                                    borderRadius: 15, justifyContent: 'flex-end'
                                                }}>
                                                <View style={{ flexDirection: 'row', }}>
                                                    <Left>
                                                        <Text style={{
                                                            margin: 10, color: '#fff',
                                                            shadowColor: '#111', textShadowColor: '#111',
                                                            textShadowRadius: 5, fontWeight: '600', fontSize: 12,
                                                        }}>
                                                            <Icon name='thumbs-down' style={{ color: '#fff', fontSize: 20 }} />
                                                            {item.dislikeCount}</Text>
                                                    </Left>
                                                    <Right>
                                                        <Text style={{
                                                            margin: 10, color: '#fff',
                                                            shadowColor: '#111', textShadowColor: '#111',
                                                            textShadowRadius: 5, fontWeight: '600', fontSize: 12,
                                                        }}>
                                                            <Icon name='thumbs-up' style={{ color: '#fff', fontSize: 20 }} />
                                                            {item.likeCount}</Text>
                                                    </Right>
                                                </View>
                                            </ImageBackground>
                                        </Item>
                                    )}
                                    numColumns={2}
                                    style={{ marginTop: 20, paddingTop: 5 }}
                                // enableEmptySections={true}
                                />
                            </CardItem>
                        </Card>
                    </View>

                </ScrollView>
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
    // userPosts: state.post.posts,
    following: state.auth.following,
    user: state.auth.user
})

const mapDispatchToProps = (dispatch) => {
    return {
        logoutUser: () => dispatch(logoutUser()),
        unfollow: (user_id) => dispatch(unfollow_user(user_id)),
        follow: (user_id) => dispatch(follow_user(user_id)),
        // fetchPosts: () => dispatch(fetchPosts()),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)
