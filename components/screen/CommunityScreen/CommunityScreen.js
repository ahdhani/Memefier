import React, { Component } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Container, Button, Text, Card, CardItem, Content, Right } from 'native-base'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { connect } from 'react-redux';
import { FlatList } from 'react-native-gesture-handler';

class CommunityScreen extends Component {
    state = {
        dummyData: [1, 2],
    }
    render() {
        return (
            <Container>
                <Content>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('CreateCommunity')}>
                        <CardItem style={{ marginBottom: -10 }} >
                            <Card style={{ margin: 50, borderRadius: 8, flexDirection: 'row', alignItems: 'center' }}>
                                <CardItem style={{ marginLeft: 15 }}>
                                    <Button style={{ borderRadius: 100, alignItems: 'center', justifyContent: 'center' }} height={65} width={65} >
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
                    </TouchableOpacity>
                    <FlatList
                        data={this.state.dummyData}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => (
                            <CardItem style={{ marginVertical: -5 }}>
                                <Card style={{ padding: 0, borderRadius: 8, flexDirection: 'row', alignItems: 'center' }}
                                >
                                    <CardItem style={{ marginLeft: 15 }}>
                                        <Button style={{ borderRadius: 100, alignItems: 'center', justifyContent: 'center' }} height={65} width={65}
                                            onPress={() => this.props.navigation.navigate('CommunityFeed')} >
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
                        )}
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

export default connect(mapStateToProps, mapDispatchToProps)(CommunityScreen)
