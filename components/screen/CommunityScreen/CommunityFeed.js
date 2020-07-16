import React, { Component } from 'react'
import { View, Text, Dimensions, FlatList, ImageBackground,} from 'react-native'
import { Container, Button, Card, CardItem, Content, Right, Icon, Left, Item} from 'native-base'
import { connect } from 'react-redux';

const cardWidth = (Dimensions.get('window').width / 2) - 4;
const cardHeight = cardWidth * 1.25;

class CommunityFeed extends Component {

    state = {
        userPosts: [1, 2, 3, 4],
    }
    
    render() {
        return (
            <Container>
                <Content>
                    <View>

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
                                    uri: 'https://firebasestorage.googleapis.com/v0/b/memefier-rest-api.appspot.com/o/dp%2FR5EGajrkyahxpXuizmSlZWt5Frq1?alt=media&token=b1b8d45a-d297-407b-bb87-d6b2ab1b3d61'
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
