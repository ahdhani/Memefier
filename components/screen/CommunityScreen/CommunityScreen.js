import React, { Component } from 'react'
import { StyleSheet, FlatList } from 'react-native'
import { Container, Button, Item, Text, ListItem, Input, Header, Content, Left, Picker, Icon, Body, Right, H3, H2, DatePicker, Title, Thumbnail } from 'native-base'
import { connect } from 'react-redux'
import { db } from '../../../config'
import { unfollow_user, follow_user, updateUserDetails } from '../../../redux';
import {dislikePost , checkReaction, countLike } from '../../functions/reactions'
import { testFunction , fetchAllReplies } from '../../functions/comments'
import { createGroup , createRequest , acceptRequest } from '../../functions/community'

class CommunityScreen extends Component {

    state = {
        users: []
    }

    componentDidMount = () => {
        // console.log("COMPONENT DID MOUNTED (FEED SCREEN)");
        // this.props.fetchPosts();
        this.fetchUsers()
    }

    fetchUsers = () => {
        var user_list = []
        db.collection('userDetails')
            .get()
            .then(snapshot => {
                snapshot.docs.forEach(user => {
                    // var isFollow = false // if following
                    // if (user.id in this.props.following) {
                    //     isFollow = true
                    // }
                    // console.log(this.props.user.uid , " == " , user.id)
                    if (user.id != this.props.user.uid) {
                        user_list = [{ ...user.data(), uid: user.id }, ...user_list]
                    }

                })
                this.setState({
                    users: user_list
                })

            })
            .catch(error => console.log("ERR :", error.message))
    }

    toggleFollow = (uid) => {
        if (this.props.following.includes(uid)) {
            this.unfollowUser(uid)
        } else {
            this.followUser(uid)
        }
    }

    followUser = (uid) => {
        console.log("Follow user clicked");
        this.props.follow(uid);
    }

    unfollowUser = (uid) => {
        console.log("Unfollow clicked");
        this.props.unfollow(uid);
    }

    render() {
        return (
            <Container>
                <Content>

                    <Button transparent onPress={() => this.props.navigation.navigate('CreateCommunity')}>
                        <Text>CreateCommunity</Text>
                    </Button>
                    <Button transparent onPress={() => this.props.navigation.navigate('CreatePost')}>
                        <Text>CreatePost</Text>
                    </Button>
                    <Button transparent onPress={() => this.props.navigation.navigate('AdminScreen')}>
                        <Text>AdminPrivileges</Text>
                    </Button>
                    <Button transparent onPress={() => this.props.navigation.navigate('CommunityFeed')}>
                        <Text>CommunityFeed</Text>
                    </Button>

                    <Button transparent onPress={() => {
                        createRequest("rao65J7MU6f3PBLyI5UY" , this.props.user.uid)
                            .then(res => {
                                // Success
                                console.log("Success," , res)
                            })
                            .catch(error => console.log("ERR :" , error.message))
                    }}>
                        <Text>Make Request</Text>
                    </Button>
                    <Button transparent onPress={() => {
                        acceptRequest("rao65J7MU6f3PBLyI5UY" , this.props.user.uid)
                            .then(res => {
                                // Success
                                console.log("Success," , res)
                            })
                            .catch(error => console.log("ERR :" , error.message))
                    }}>
                        <Text>Approve Request</Text>
                    </Button>
                    
                    {/* <FlatList
                        data={this.state.users}
                        renderItem={({ item, index }) => (
                            <Item style={{ flexDirection: 'row', padding: 4 }}>
                                <Thumbnail source={{ uri: item.avatar }} />
                                <Text style={{ marginLeft: 8 }}>{item.firstname} {item.lastname}</Text>
                                <Text style={{ marginLeft: 150 }}
                                    onPress={() => this.toggleFollow(item.uid)}
                                >{(this.props.following.includes(item.uid)) ? 'unfollow ' : 'follow'}</Text>
                            </Item>
                        )}
                        enableEmptySections={true}
                        keyExtractor={(item, index) => index.toString()}
                    /> */}
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
});

const mapStateToProps = (state) => ({
    user: state.auth.user,
    userDetails: state.auth.userDetails,
    following: state.auth.following
})

const mapDispatchToProps = (dispatch) => {
    return {
        unfollow: (user_id) => dispatch(unfollow_user(user_id)),
        follow: (user_id) => dispatch(follow_user(user_id)) ,
        updateUser : (data) => dispatch(updateUserDetails(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommunityScreen)
