import React, { Component } from 'react'
import { View, Text, Dimensions, FlatList, ImageBackground, TouchableOpacity } from 'react-native'
import { Container, Button, Card, CardItem, Content, Right, Icon, Left, Item, H1 } from 'native-base'
import { connect } from 'react-redux';
import colors from '../../../constants/colors'
import { fetchGroupDetails } from '../../functions/community'

const cardWidth = (Dimensions.get('window').width / 2) - 4;
const cardHeight = cardWidth * 1.25;

class CommunityFeed extends Component {

    state = {
        groupDetails: {},
        userPosts: [1, 2, 3, 4],
        uri: 'https://firebasestorage.googleapis.com/v0/b/memefier-rest-api.appspot.com/o/dp%2FR5EGajrkyahxpXuizmSlZWt5Frq1?alt=media&token=b1b8d45a-d297-407b-bb87-d6b2ab1b3d61',
    }

    componentDidMount = async () => {
        // console.log('param : ', this.props.route.params.group_id)

        fetchGroupDetails(this.props.route.params.group_id)
            .then(res => {
                this.setState({ groupDetails: res })
            });
    }

    render() {

        const {group_id} = this.props.route.params
        return (
            <Container>
                <Content>
                    <Button style={{
                        position: 'absolute', top: 5, right: 5,
                        width: 80,justifyContent: 'center'
                    }} onPress={() => this.props.navigation.navigate('AdminScreen',{ group_id: group_id, })}>
                        <Text style={{color: '#fff'}}>Info</Text>
                    </Button>
                    <View style={{
                        backgroundColor: '#fff', marginTop: 50,
                        borderTopLeftRadius: 30, borderTopRightRadius: 30
                    }}>
                        <View style={{
                            flexDirection: 'row', justifyContent: 'space-around',
                            alignItems: 'center'
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

                            <View style={{ alignItems: 'center' }}>
                                <Text style={{ color: colors.color1, fontSize: 24 }}>
                                    {this.state.groupDetails.name}
                                    <Text style={{ fontSize: 16, color: '#000' }}>   {this.state.groupDetails.members}&nbsp;
                                        <Icon name='people' style={{ fontSize: 14 }} />
                                    </Text>
                                </Text>

                                <Text note>{this.state.groupDetails.desc}</Text>

                            </View>
                        </View>
                    </View>
                    <FlatList
                        data={this.state.userPosts}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => (
                            <Item
                            //  onPress={() => this.props.navigation.navigate('PostScrollScreen', {
                            //     post: this.state.userPosts,
                            //     index: index,
                            // })}
                            >
                                <ImageBackground resizeMode='contain' source={{
                                    uri: this.state.uri
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
                                                <Icon name='trending-down' style={{ color: '#fff', fontSize: 20 }} />
                                                4
                                            </Text>
                                        </Left>
                                        <Right>
                                            <Text style={{
                                                margin: 10, color: '#fff',
                                                shadowColor: '#111', textShadowColor: '#111',
                                                textShadowRadius: 5, fontWeight: '600', fontSize: 12,
                                            }}>
                                                <Icon name='trending-up' style={{ color: '#fff', fontSize: 20 }} />
                                                54
                                            </Text>
                                        </Right>
                                    </View>
                                </ImageBackground>
                            </Item>
                        )}
                        numColumns={2}
                        style={{ marginTop: 20, paddingTop: 5 }}
                    />
                </Content>
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
// export default CommunityFeed
