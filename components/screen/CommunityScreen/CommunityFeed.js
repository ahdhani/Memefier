import React, { Component } from 'react'
import { View, StyleSheet, ScrollView, TouchableOpacity, FlatList, Dimensions, ImageBackground, YellowBox } from 'react-native'
import { Container, Button, Card, Text, Item, ListItem, Input, Header, Content, Left, Picker, Icon, Body, Right, H3, H2, DatePicker, Title, Thumbnail, H1, CardItem } from 'native-base'
import colors from '../../../constants/colors'
// imports for state management
import { connect } from 'react-redux';
import { logoutUser, unfollow_user, follow_user, fetchPosts } from '../../../redux';


const cardWidth = (Dimensions.get('window').width / 2) - 4;
const cardHeight = cardWidth * 1.25;

class CommunityFeed extends Component {

    state = {
        userPosts: [{
            commentCount: 0,
            created_at: 1594375074398,
            created_by: "R5EGajrkyahxpXuizmSlZWt5Frq1",
            dislikeCount: 0,
            img: "https://firebasestorage.googleapis.com/v0/b/memefier-rest-api.appspot.com/o/memes%2F83b8236-0f36-0a1-2c83-efe75f7a5263?alt=media&token=a29ce73e-f3ba-4376-aa30-01c214e10a2c",
            likeCount: 0,
        },{},],
    }

    render() {
        return (
            <Container>
                <ScrollView>
                    {/* 
                <Header style={{ backgroundColor: colors.color5 }}>
                    <Left />
                    <Body>
                        <Title>Profile</Title>
                    </Body>
                    <Right>
                        {!uuid &&
                            <Button transparent onPress={() => this.signOutClicked()}>
                                <Text style={{ color: colors.color1 }} >SignOut</Text>
                            </Button>
                        }

                    </Right>
                </Header> */}

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
                                source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/memefier-rest-api.appspot.com/o/dp%2FR5EGajrkyahxpXuizmSlZWt5Frq1?alt=media&token=b1b8d45a-d297-407b-bb87-d6b2ab1b3d61' }}

                            >
                                {/* {!uuid &&
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
                                } */}
                            </ImageBackground>

                            <View style={{ alignItems: 'center' }}>
                                <H1 style={{ color: colors.color1 }}>
                                    kzjdbdg
                                </H1>
                                <Text note>Rank 0</Text>
                            </View>
                        </View>
                        <View style={{
                            flexDirection: 'row', justifyContent: 'space-between',
                            alignItems: 'flex-end', marginTop: 20,
                        }}>
                            <View style={{ paddingLeft: 40 }}>
                                <H1 style={{ color: colors.color3 }}>
                                    dfhsfh
                                    {/* {uuid && uuid != this.props.user.uid && */}
                                    <Text>
                                        shhsfdg
                                        </Text>
                                    {/* } */}
                                </H1>
                                <Text note>hkvghkfv</Text>
                            </View>
                            <View style={{ justifyContent: 'center', marginRight: 40, }}>
                                <H1 style={{ alignSelf: 'center', color: colors.color3 }}>20</H1>
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
                                        <Item 
                                        // onPress={() => this.props.navigation.navigate('PostScrollScreen', {
                                        //     post: this.state.userPosts,
                                        //     index: index,
                                        // })}
                                        >
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
                                                            <Icon name='trending-down' style={{ color: '#fff', fontSize: 20 }} />
                                                              4</Text>
                                                    </Left>
                                                    <Right>
                                                        <Text style={{
                                                            margin: 10, color: '#fff',
                                                            shadowColor: '#111', textShadowColor: '#111',
                                                            textShadowRadius: 5, fontWeight: '600', fontSize: 12,
                                                        }}>
                                                            <Icon name='trending-up' style={{ color: '#fff', fontSize: 20 }} />
                                                              54</Text>
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

const mapStateToProps = (state) => ({
    // isAuthenticated: state.auth.isAuthenticated,
    // userDetails: state.auth.userDetails,
    // userPosts: state.post.posts,
    // following: state.auth.following,
    // user: state.auth.user
})

const mapDispatchToProps = (dispatch) => {
    return {
        // logoutUser: () => dispatch(logoutUser()),
        // unfollow: (user_id) => dispatch(unfollow_user(user_id)),
        // follow: (user_id) => dispatch(follow_user(user_id)),
        // fetchPosts: () => dispatch(fetchPosts()),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommunityFeed)
