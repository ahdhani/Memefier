import React, { Component } from 'react'
import { View, StyleSheet, Image, TouchableOpacity, FlatList, Dimensions, ImageBackground } from 'react-native'
import { Container, Button, Card, Text, Item, ListItem, Input, Header, Content, Left, Picker, Icon, Body, Right, H3, H2, DatePicker, Title, Thumbnail, H1 } from 'native-base'
// imports for state management
import { connect } from 'react-redux';
import { logoutUser, unfollow_user, follow_user } from '../../redux';

import { db } from '../../config';

// import DpModal from '../DpModal'


const cardWidth = (Dimensions.get('window').width / 2) - 4;
const cardHeight = cardWidth * 1.25;

class ProfileScreen extends Component {

    state = {
        userPosts: [],
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
        this.fetchUserPosts();
        console.log("User post fetching..")

    }

    signOutClicked = () => {
        this.props.logoutUser()
    }

    render() {
        return (
            <Container>
                <Header style={{ backgroundColor: '#252337' }}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.navigate('EditProfileScreen')}>
                            <Text>Edit</Text>
                        </Button>
                    </Left>
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
                    <View style={{
                        flex: 1, flexGrow: 1, height: '100%'
                    }}>

                        <H1 style={{ alignSelf: 'center', marginTop: 30, color: '#9db4c0' }}>
                            @{this.props.userDetails.userId}
                        </H1>
                        <Text note style={{
                            alignSelf: 'center',
                            marginBottom: 150,
                        }}>
                            Rank 0
                        </Text>
                        <View style={{
                            flex: 1, flexGrow: 2, backgroundColor: '#ffffff',
                            borderTopLeftRadius: 30, borderTopRightRadius: 30, height: '100%' ////
                        }}>
                            <View style={{
                                flexDirection: 'row', justifyContent: 'space-around',
                                marginTop: -110,
                            }}>
                                <View style={{ justifyContent: 'center' }}>
                                    <H1 style={{ alignSelf: 'center', color: '#9db4c0' }}>0</H1>
                                    <Text note>Followers</Text>
                                </View>
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
                                    source={{ uri: this.props.userDetails.dp }}

                                />
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
                            }}>{this.props.userDetails.bio}</Text>
                            <Button transparent onPress={() => this.props.navigation.navigate('EditProfileScreen')}>
                                <Text>Edit Profile</Text>
                            </Button>

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
                                                borderRadius: 15,justifyContent: 'flex-end'
                                            }}>
                                            <View style={{ flexDirection: 'row',}}>
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
                                                             <Icon name='trending-down' style={{color: '#fff',fontSize: 20}} />
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
                                                             <Icon name='trending-up' style={{color: '#fff',fontSize: 20}} />
                                                              54</Text>
                                                    {/* </TouchableOpacity> */}

                                                </Right>
                                            </View>
                                        </ImageBackground>
                                    </Item>
                                )}
                                numColumns={2}
                                style={{ marginTop: 20, paddingTop: 5, backgroundColor: '#ddd' }}
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

this.props.userDetails.dp
default 'https://firebasestorage.googleapis.com/v0/b/memefier-rest-api.appspot.com/o/dp%2Fdefault.png?alt=media&token=b848e1ca-2c36-42cb-932a-049fe6dceeb9'

*/