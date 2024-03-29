import React, { Component } from 'react'
import { View, Image, FlatList, StatusBar } from 'react-native'
import { Container, Button, Card, Text, CardItem, Input, Header, Content, Left, Picker, Icon, Body, Right, H3, H2, DatePicker, Title, Thumbnail } from 'native-base'
import FeedCards from './FeedCards'
import colors from '../../../constants/colors'

import { connect } from 'react-redux'
import { fetchPosts } from '../../../redux'
import { db } from '../../../config'
import { fetchFeedPosts } from '../../functions/posts'
class FeedScreen extends Component {

    fetchPosts = async () => {
        var arr = []
        var snapshots_arr = []

        fetchFeedPosts([...this.props.following, this.props.user.uid])
            .then(async snapshots => {

                snapshots_arr = snapshots
                await snapshots.forEach(doc => {
                    arr = [...arr , { ...doc.data(), post_id: doc.id } ]
                })

                this.setState({
                    posts: arr ,
                    snapshots_arr 
                })

            })

    }

    componentDidMount = () => {
        this.fetchPosts()
    }


    state = {
        posts: [],
        snapshots_arr : [] ,
        isRefreshing: false,
    }

    onEndReached = ({ distanceFromEnd }) => {
        // fetch next batch CODE HERE
        fetchFeedPosts([...this.props.following, this.props.user.uid] , this.state.snapshots_arr[this.state.snapshots_arr.length - 1])
            .then(async snapshots => {
                var arr = []
                await snapshots.forEach(doc => {
                    arr = [...arr , { ...doc.data(), post_id: doc.id } ]
                })

                this.setState({
                    posts: [...this.state.posts, ...arr] ,
                    snapshots_arr : [...this.state.snapshots_arr , ...snapshots]
                })

            })
            .catch(err => console.log(err.message))
    }

    onRefresh = async () => {
        this.setState({ isRefreshing: true });
        await this.fetchPosts()
        this.setState({ isRefreshing: false });
    }

    render() {
        return (
            <Container >
                <StatusBar barStyle="light-content" backgroundColor={colors.color5}/>
                <FlatList
                    data={this.state.posts}
                    renderItem={({ item }) => <FeedCards post={item} />}
                    keyExtractor={(item, index) => `id_${index}`}

                    refreshing={this.state.isRefreshing}
                    onRefresh={() => this.onRefresh()}
                    onEndReachedThreshold={0.5}

                    onEndReached={({ distanceFromEnd }) => {
                        this.onEndReached(distanceFromEnd)
                    }}
                />
            </Container>
        )
    }

}
const mapStateToProps = (state) => ({
    user: state.auth.user,
    userDetails: state.auth.userDetails,
    following: state.auth.following
})
const mapDispatchToProps = (dispatch) => {
    return {
        fetchPosts_: () => dispatch(fetchPosts())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(FeedScreen)