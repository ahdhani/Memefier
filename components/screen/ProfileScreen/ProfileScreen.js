import React, { Component } from 'react'
import { View, StyleSheet, Image, TouchableOpacity, FlatList, Dimensions, ImageBackground, TouchableOpacityBase } from 'react-native'
import { Container, Button, Card, Text, Item, ListItem, Input, Header, Content, Left, Picker, Icon, Body, Right, H3, H2, DatePicker, Title, Thumbnail, H1 } from 'native-base'
import colors from '../../../constants/colors'
// imports for state management
import { connect } from 'react-redux';
import { logoutUser, unfollow_user, follow_user } from '../../../redux';

import { db } from '../../../config';
import { fetchUserDetails } from '../../functions/user'
// import DpModal from '../DpModal'
// hai

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
        if (this.props.route.params.uuid != null) {
            const user = await fetchUserDetails(this.props.route.params.uuid)
            this.setState({ userDetails: user },
                () => this.fetchUserPosts(this.props.route.params.uuid))
        }
        else {
            this.setState({ userDetails: this.props.userDetails },
                () => this.fetchUserPosts(this.props.user.uid))
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

                <Header style={{ backgroundColor: colors.color5 }}>
                    <Left />
                    <Body>
                        {/* <Title>Profile</Title> */}
                    </Body>
                    <Right>
                        {!uuid &&
                            // <Button transparent
                            // // onPress={() => this.signOutClicked()}
                            // >
                            //     <Text style={{ color: colors.color1 }} >Follow</Text>
                            // </Button>
                            // :
                            <Button transparent onPress={() => this.signOutClicked()}>
                                <Text style={{ color: colors.color1 }} >SignOut</Text>
                            </Button>
                        }

                    </Right>
                </Header>

                <Content style={{ backgroundColor: colors.color5, height: '100%', }}>
                    <View style={{
                        flex: 1, flexGrow: 1, height: '100%'
                    }}>

                        <H1 style={{ alignSelf: 'center', marginTop: 30, color: colors.color1 }}>
                            @{this.state.userDetails.userId}
                        </H1>
                        <Text note style={{
                            alignSelf: 'center',
                            marginBottom: 150,
                        }}>
                            Rank 0
                        </Text>
                        <View style={{
                            flex: 1, flexGrow: 2, backgroundColor: '#fff',
                            borderTopLeftRadius: 30, borderTopRightRadius: 30, height: '100%' ////
                        }}>
                            <View style={{
                                flexDirection: 'row', justifyContent: 'space-around',
                                marginTop: -110,
                            }}>
                                
                                <ImageBackground
                                    style={{
                                        borderRadius: 150,
                                        width: 150,
                                        height: 150,
                                        alignSelf: 'center',
                                        backgroundColor: colors.color3,
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
                                            alignItems: 'center', justifyContent: 'center'
                                        }} onPress={() => this.props.navigation.navigate('EditProfileScreen')}>
                                            <Icon name='create' style={{
                                                fontSize: 20
                                            }} />
                                        </TouchableOpacity>
                                    }
                                </ImageBackground>
                                <View style={{ justifyContent: 'center' }}>
                                    <H1 style={{ alignSelf: 'center', color: colors.color1 }}>{this.state.userDetails.followers}</H1>
                                    <Text note>Followers</Text>
                                </View>
                                {/* <View style={{ justifyContent: 'center' }}>
                                    <H1 style={{ alignSelf: 'center', color: colors.color1 }}>{this.state.userDetails.following}</H1>
                                    <Text note>Following</Text>
                                </View> */}
                            </View>

                            <H1 style={{ alignSelf: 'center', marginTop: 20, color: colors.color3 }}>
                                {uuid &&
                                    <Text onPress={() => this.toggleFollow(uuid)}
                                    >{(this.props.following.includes(uuid)) ? ' Unfollow ' : ' Follow'}</Text>}
                                {this.state.userDetails.firstname} {this.state.userDetails.lastname}  

                            </H1>
                            <Text note style={{
                                alignSelf: 'center',
                            }}>{this.state.userDetails.bio}</Text>

                            <FlatList
                                // getItemLayout={(data, index) => { return {length: cardHeight+2, index, offset: (cardHeight+2) * index} }}
                                // key={this.state.postExpand}
                                data={this.state.userPosts}
                                keyExtractor={(item, index) => index.toString()}
                                // ref={(ref) => { this.flatListRef = ref; }}
                                // initialNumToRender={2}
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
                                                    {/* <TouchableOpacity
                                                        onPress={() => {
                                                            this.toggleFollow(index)
                                                        }}
                                                    > */}

                                                    <Text style={{
                                                        margin: 10, color: '#fff',
                                                        shadowColor: '#111', textShadowColor: '#111',
                                                        textShadowRadius: 5, fontWeight: '600', fontSize: 12,
                                                    }}>
                                                        <Icon name='trending-down' style={{ color: '#fff', fontSize: 20 }} />
                                                              4</Text>
                                                    {/* </TouchableOpacity> */}

                                                </Left>
                                                <Right>
                                                    {/* <TouchableOpacity
                                                        onPress={() => {
                                                            this.toggleFollow(index)
                                                        }}
                                                    > */}

                                                    <Text style={{
                                                        margin: 10, color: '#fff',
                                                        shadowColor: '#111', textShadowColor: '#111',
                                                        textShadowRadius: 5, fontWeight: '600', fontSize: 12,
                                                    }}>
                                                        <Icon name='trending-up' style={{ color: '#fff', fontSize: 20 }} />
                                                              54</Text>
                                                    {/* </TouchableOpacity> */}

                                                </Right>
                                            </View>
                                        </ImageBackground>
                                    </Item>
                                )}
                                numColumns={2}
                                style={{ marginTop: 20, paddingTop: 5 }}
                            // enableEmptySections={true}
                            />
                        </View>
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
    following: state.auth.following,
    user: state.auth.user
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

this.state.userDetails.dp
default 'https://firebasestorage.googleapis.com/v0/b/memefier-rest-api.appspot.com/o/dp%2Fdefault.png?alt=media&token=b848e1ca-2c36-42cb-932a-049fe6dceeb9'

*/