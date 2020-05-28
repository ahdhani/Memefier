import React, { Component } from 'react'
import { View, StyleSheet, Image, FlatList } from 'react-native'
import { Container, Button, Item, Text, ListItem, Input, Header, Content, Left, Picker, Icon, Body, Right, H3, H2, DatePicker, Title, Thumbnail } from 'native-base'
import { connect } from 'react-redux'
import { db } from '../../config'
import { unfollow_user, follow_user } from '../../redux';

class CommunityScreen extends Component {

    state = {
        users: []
    }

    componentDidMount = () => {
        console.log("COMPONENT DID MOUNTED (FEED SCREEN)");
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
                
                    user_list = [{...user.data() , uid : user.id} , ...user_list]
                })

                console.log(user_list)

                this.setState({
                    users : user_list
                })

            })
            .catch(error => console.log("ERR :" , error.message))
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
                <Header>
                    <Left />
                    <Body>
                        <Title>Community</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    <FlatList
                        data={this.state.users}
                        renderItem={({ item , index}) => (
                            <Item style={{ flexDirection: 'row', padding: 4 }}>
                                <Thumbnail source={{ uri: item.avatar }} />
                                <Text style={{ marginLeft: 8 }}>{item.firstname} {item.lastname}</Text>
                                <Text style={{ marginLeft: 150 }}
                                        onPress = {() => this.toggleFollow(item.uid)}
                                >{(this.props.following.includes(item.uid)) ? 'unfollow ': 'follow'}</Text>
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
    userDetails: state.auth.userDetails , 
    following : state.auth.following
})

const mapDispatchToProps = (dispatch) => {
    return {
        unfollow : (user_id) => dispatch(unfollow_user(user_id)) ,
        follow : (user_id) => dispatch(follow_user(user_id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommunityScreen)
