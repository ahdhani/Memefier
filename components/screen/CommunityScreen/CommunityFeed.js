import React, { Component } from 'react'
import { View , Text} from 'react-native'
import { Container, Button, Card, CardItem, Content, Right } from 'native-base'
import { connect } from 'react-redux';

class CommunityFeed extends Component {
    render() {
        return (
            <Container>
                <Content>
                    <Text>aisudfg</Text>
                    {/* <FlatList
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
                    /> */}
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
