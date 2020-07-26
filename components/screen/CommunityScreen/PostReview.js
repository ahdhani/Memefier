import React, { Component, useEffect, useState } from 'react';
import { Card, Thumbnail, CardItem, Left, Body, Right, Button, Icon } from 'native-base'
import { View, FlatList, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PostReviewCard from './PostReviewCard';
import { viewPendingPosts } from '../../functions/community'

const screenWidth = Dimensions.get('window').width;
const postHeight = screenWidth * 1.25;

const PostReview = props => {

    const navigation = useNavigation();
    const [post, setPost] = useState()

    useEffect(() => {

        viewPendingPosts(props.group_id)
            .then(res => setPost(res))

    }, []);

    // spliceCard = () => {

    // }

    return (
        <FlatList
            data={post}
            style={{ padding: 15 }}
            renderItem={({ item,index }) => (
                <PostReviewCard post={item} spliceCard={() => setPost(post.splice(index))} />
            )}
            enableEmptySections={true}
            keyExtractor={(item, index) => index.toString()
            }
        />
    )
}

export default PostReview;