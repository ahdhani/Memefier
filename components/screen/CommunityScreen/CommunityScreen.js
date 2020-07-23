import React, { Component } from 'react'
import { View, TouchableOpacity, FlatList } from 'react-native'
import { Container, Button, Text, Card, CardItem, Content, Right } from 'native-base'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { connect } from 'react-redux';
import { fetchGroups, joinGroup, fetchGroupDetails } from '../../functions/community'
import CommunityCard from './CommunityCard';


class CommunityScreen extends Component {

    state = {
        dummyData: [1, 2],
        groups: [],
        groupUid: ['NMrpYCug4AJnItPAMVYP']
    }

    componentDidMount = async () => {
        fetchGroups(this.props.user.uid)
            .then(groups => {
                groups.forEach(group => {
                    this.setState({ groups: [...this.state.groups, group.data().group_id] })
                })
            });
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
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('CommunityFeed',{ group_id: item, })}>
                                <CommunityCard group_id={item} />
                            </TouchableOpacity>

                        )}
                    />


                </Content>
            </Container>

        )
    }

}

const mapStateToProps = (state) => ({
    user: state.auth.user
})

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommunityScreen)