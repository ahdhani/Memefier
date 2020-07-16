import React, { Component } from 'react'
import { View } from 'react-native'
import { Container, Button, Text, Card, CardItem, Content, Right } from 'native-base'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

class CommunityFeed extends Component {
    render() {
        return (
            <Container>
                <Content>
                    <CardItem style={{ marginVertical: -10 }} >
                        <Card style={{ margin: 50, borderRadius: 8, flexDirection: 'row', alignItems: 'center' }}>
                            <CardItem style={{ marginLeft: 15 }}>
                                <Button onPress={() => this.props.navigation.navigate('CreateCommunity')} style={{ borderRadius: 100, alignItems: 'center', justifyContent: 'center' }} height={65} width={65} >
                                    <MaterialCommunityIcons
                                        name='plus'
                                        color="white"
                                        size={30}
                                    />
                                </Button>
                                <Text style={{ marginLeft: 15, fontWeight: 'bold', fontSize: 25 }}>Create a Group</Text>
                            </CardItem>
                            <Right>
                            </Right>
                        </Card>
                    </CardItem>
                    <CardItem style={{ marginVertical: -5 }} >
                        <Card style={{ padding: 0, borderRadius: 8, flexDirection: 'row', alignItems: 'center' }}>
                            <CardItem style={{ marginLeft: 15 }}>
                                <Button style={{ borderRadius: 100, alignItems: 'center', justifyContent: 'center' }} height={65} width={65} >
                                </Button>
                                <View style={{ marginLeft: 15 }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Fan Fight Club</Text>
                                    <Text style={{ color: 'rgba(0,0,0,0.35)' }}>5.5k members</Text>
                                </View>
                            </CardItem>
                            <Right>
                            </Right>
                        </Card>
                    </CardItem>




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

<<<<<<< HEAD
export default connect(mapStateToProps, mapDispatchToProps)(CommunityFeed)
=======
export default CommunityFeed;
>>>>>>> 5a7718e296779b6e8c5af1ad2652b180c694b416
