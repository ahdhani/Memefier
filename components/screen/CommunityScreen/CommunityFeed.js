import React, { Component, } from 'react'
import { View, Text, Dimensions, FlatList, ImageBackground, TouchableOpacity, StyleSheet, TouchableOpacityBase } from 'react-native'
import { Container, Button, Card, CardItem, Content, Right, Icon, Left, Item, H1 } from 'native-base'
import { connect } from 'react-redux';
import colors from '../../../constants/colors'
import { fetchGroupDetails, checkRequestStatus, joinGroup, createRequest, deleteRequest } from '../../functions/community'
import { fetchGroupPosts } from '../../functions/posts'

const cardWidth = (Dimensions.get('window').width / 2) - 4;
const cardHeight = cardWidth * 1.25;

class CommunityFeed extends Component {

    state = {
        groupDetails: {},
        groupStatus: null,
        groupPosts: null,
        uri: 'https://firebasestorage.googleapis.com/v0/b/memefier-rest-api.appspot.com/o/dp%2FR5EGajrkyahxpXuizmSlZWt5Frq1?alt=media&token=b1b8d45a-d297-407b-bb87-d6b2ab1b3d61',
    }

    componentDidMount = async () => {
        checkRequestStatus(this.props.route.params.group_id, this.props.user.uid)
            .then(res => {
                this.setState({ groupStatus: res })
            });
        fetchGroupDetails(this.props.route.params.group_id)
            .then(res => {
                this.setState({ groupDetails: res })
            });
        fetchGroupPosts(this.props.route.params.group_id)
            .then(res => {
                this.setState({ groupPosts: res })
            });
    }

    handleFollow = () => {
        if (this.state.groupStatus == null) {
            if (this.state.groupDetails.closed) {
                createRequest(this.props.route.params.group_id, this.props.user.uid)
                    .then(
                        this.setState({ groupStatus: false })
                    )
            }
            else {
                joinGroup(this.props.route.params.group_id, this.props.user.uid)
                    .then(
                        this.setState({ groupStatus: true })
                    )
            }
        }
        else {
            deleteRequest(this.props.route.params.group_id, this.props.user.uid)
                .then(
                    this.setState({ groupStatus: null })
                )
        }
    }

    render() {

        const { group_id } = this.props.route.params
        return (
            <Container>
                <Content>
                    <View style={{ backgroundColor: colors.color5, height: 150 }} />
                    <TouchableOpacity style={{
                        position: 'absolute', top: 15, right: 20,
                        justifyContent: 'center'
                    }} onPress={() => this.props.navigation.navigate('AdminScreen', { group_id: group_id, })}>
                        <Icon name='menu' style={{ fontSize: 20, color: '#fff' }} />
                    </TouchableOpacity>
                    <View style={{
                        backgroundColor: '#fff', marginTop: -35,
                        borderTopLeftRadius: 30, borderTopRightRadius: 30
                    }}>
                        <View style={{
                            flexDirection: 'row', justifyContent: 'space-around',
                            alignItems: 'center', marginTop: -60,
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
                                source={{ uri: this.state.groupDetails.dp }}

                            >
                                <TouchableOpacity style={{
                                    position: 'absolute', bottom: 7,
                                    right: 7, backgroundColor: colors.color1,
                                    borderRadius: 15,
                                    height: 30, width: 30,
                                    alignItems: 'center', justifyContent: 'center',
                                    zIndex: 10, elevation: 10,
                                }}
                                //  onPress={() => this.props.navigation.navigate('EditProfileScreen')}
                                >
                                    <Icon name='create' style={{ fontSize: 20, textAlign: 'center' }} />
                                </TouchableOpacity>
                            </ImageBackground>

                            <View style={{ alignItems: 'center', marginTop: 60 }}>

                                <Text style={{ color: colors.color5, fontSize: 24 }}>
                                    {this.state.groupDetails.name}
                                    <Text style={{ fontSize: 16, color: '#000' }}>   {this.state.groupDetails.members}&nbsp;
                                        <Icon name='people' style={{ fontSize: 14 }} />
                                    </Text>
                                </Text>

                                <Text style={{ color: colors.color3 }}>{this.state.groupDetails.desc}</Text>

                            </View>
                        </View>
                        <Card>
                            <CardItem style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <TouchableOpacity style={styles.button}
                                    onPress={() => this.handleFollow()}>
                                    <Text>
                                        {
                                            this.state.groupStatus == null ?
                                                'Follow'
                                                :
                                                this.state.groupStatus == true ?
                                                    'Unfollow'
                                                    :
                                                    'Requested'
                                        }
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => this.props.navigation.navigate('CreatePost',
                                        { group_id: group_id, user_uid: this.props.user.uid })}
                                >
                                    <Icon name='add' style={{ textAlign: 'center' }} />
                                    <Text>Create  </Text>
                                </TouchableOpacity>
                            </CardItem>
                            <CardItem cardBody>
                                <FlatList
                                    data={this.state.groupPosts}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({ item, index }) => (
                                        <Item
                                        //  onPress={() => this.props.navigation.navigate('PostScrollScreen', {
                                        //     post: this.state.groupPosts,
                                        //     index: index,
                                        // })}
                                        >
                                            <ImageBackground resizeMode='contain' source={{
                                                uri: item.img
                                            }}
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
                                                            <Icon name='trending-down' style={{ color: '#fff', fontSize: 16, textAlign: 'center' }} />
                                                            {item.dislikeCount}
                                                        </Text>
                                                    </Left>
                                                    <Right>
                                                        <Text style={{
                                                            margin: 10, color: '#fff',
                                                            shadowColor: '#111', textShadowColor: '#111',
                                                            textShadowRadius: 5, fontWeight: '600', fontSize: 12,
                                                        }}>
                                                            <Icon name='trending-up' style={{ color: '#fff', fontSize: 16, textAlign: 'center' }} />
                                                            {item.likeCount}
                                                        </Text>
                                                    </Right>
                                                </View>
                                            </ImageBackground>
                                        </Item>
                                    )}
                                    numColumns={2}
                                    style={{ marginTop: 20, paddingTop: 5 }}
                                />
                            </CardItem>
                        </Card>
                    </View>

                </Content>
            </Container>

        )
    }

}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        padding: 3,
        paddingHorizontal: 20,
        borderRadius: 5,
        backgroundColor: '#eee',
        zIndex: 3,
        elevation: 3,
        marginBottom: 10,
        height: 30,
    }
});

const mapStateToProps = (state) => ({
    // isAuthenticated: state.auth.isAuthenticated,
    // userDetails: state.auth.userDetails,
    // userPosts: state.post.posts,
    // following: state.auth.following,
    user: state.auth.user
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
// export default CommunityFeed
