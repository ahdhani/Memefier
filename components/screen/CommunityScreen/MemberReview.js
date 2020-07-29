import React, { Component, useEffect, useState } from 'react';
import { Card, Thumbnail, CardItem, Left, Body, Right, Button, Icon } from 'native-base'
import { View, FlatList, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { viewRequests, acceptRequest, deleteRequest } from '../../functions/community'
import MemberReviewCard from './MemberReviewCard'

class MemberReview extends Component {

    state = {
        members: null,
    }

    componentDidMount = () => {
        viewRequests(this.props.group_id)
            .then(res => {
                this.setState({members: res})
            });
    }

    cardHandled = (id) => {
        this.setState({
            members: this.state.members.filter((item , index) => index !== id)
           })
    }
    render() {

        return (

                <FlatList
                    style={{ padding: 15 }}
                    data={this.state.members}
                    extraData={this.state}
                    renderItem={({ item, index }) => (
                        <MemberReviewCard group_id={this.props.group_id} user_uid={item.user_uid}
                            cardHandled={() => this.cardHandled(index)} />
                    )}
                    enableEmptySections={true}
                    keyExtractor={(item, index) => index.toString()}
                />
        )
    }
}

export default MemberReview;