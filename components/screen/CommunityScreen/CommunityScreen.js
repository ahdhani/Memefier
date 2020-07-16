import React, { Component } from 'react'
import { View, StyleSheet, Image, FlatList } from 'react-native'
import { Container, Button, Item, Text, ListItem, Input, Header, Content, Left, Picker, Icon, Body, Right, H3, H2, DatePicker, Title, Thumbnail } from 'native-base'
import { connect } from 'react-redux'
import { db } from '../../../config'
import { unfollow_user, follow_user, updateUserDetails } from '../../../redux';
import { likePost , unlikePost , dislikePost , checkReaction, countLike } from '../../functions/reactions'
import { addComment , fetchAllComments , testFunction , fetchAllReplies } from '../../functions/comments'
import { changeDisplayPicture } from '../../functions/general'
import { addChallenge } from '../../functions/challenges'
import { algoliaTest , algoliaSearch , algoliaUpdate} from '../../functions/algolia'

class CommunityScreen extends Component {

    state = {
        users: []
    }

    likeCount = async () => {
        var like = await countLike()

        // console.log(like)
    }

    checkLike = async () => {

        // Loading begins
        var reaction = await checkReaction()
        // Loading ends
        // console.log("REACTION = " , reaction)
    }

    componentDidMount = () => {
        // console.log("COMPONENT DID MOUNTED (FEED SCREEN)");
        // this.props.fetchPosts();
        this.fetchUsers()
    }

    fetchComments = async () => {
        var comments = await fetchAllReplies()

        // console.log(comments)
    }

    test = () => {
        var ret = testFunction()

        // console.log(ret)
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

    updateUserDetailsCheck = async () => {
        dislikePost()
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
                    <FlatList
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
                    />
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
