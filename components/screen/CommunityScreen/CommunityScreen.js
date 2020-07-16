import React, { Component } from 'react'
import { View, TouchableOpacity, FlatList } from 'react-native'
import { Container, Button, Text, Card, CardItem, Content, Right } from 'native-base'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { connect } from 'react-redux';
import { fetchGroups, joinGroup, fetchGroupDetails } from '../../functions/community'


class CommunityScreen extends Component {

    state = {
        dummyData: [1, 2],
        groups: [],
        groupUid: ['NMrpYCug4AJnItPAMVYP']
    }

    componentDidMount = async () => {
        fetchGroups(this.props.user.uid).then(
            groups => {

                //forEach{
                    fetchGroupDetails(groups).then( group =>
                        this.setState({ groups: [...this.state.groups,group] })
                    )
                // }
            }
        );
    console.log(this.state.groups)
    alert(this.state.groups)
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
                <Button onPress={() => joinGroup(this.state.groupUid[0], this.props.user.uid)}>
                    <Text>Join Group1</Text>
                </Button>
                <FlatList
                    data={this.state.groups}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('CommunityFeed')}>
                            <CardItem style={{ marginVertical: -5 }}>
                                <Card style={{ padding: 0, borderRadius: 8, flexDirection: 'row', alignItems: 'center' }}
                                >
                                    <CardItem style={{ marginLeft: 15 }}>
                                        <Button style={{ borderRadius: 100, alignItems: 'center', justifyContent: 'center' }} height={65} width={65}
                                        // onPress={() => this.props.navigation.navigate('CommunityFeed')} 
                                        >
                                        </Button>
                                        <View style={{ marginLeft: 15 }}>
                                            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{this.state.groups.name}</Text>
                                            <Text style={{ color: 'rgba(0,0,0,0.35)' }}>{this.state.groups.members} members</Text>
                                        </View>
                                    </CardItem>
                                    <Right>
                                    </Right>
                                </Card>
                            </CardItem>
                        </TouchableOpacity>

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

export default connect(mapStateToProps, mapDispatchToProps)(CommunityScreen)
