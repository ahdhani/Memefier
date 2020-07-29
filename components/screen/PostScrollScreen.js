import React, { Component } from 'react'
import { View, Image, FlatList } from 'react-native'
import { Container, Button, Card, Text, CardItem, Input, Header, Content, Left, Picker, Icon, Body, Right, H3, H2, DatePicker, Title, Thumbnail } from 'native-base'
import FeedCards from './FeedScreen/FeedCards'
import { connect } from 'react-redux'
import { fetchPosts } from '../../redux'

class PostScrollScreen extends Component {

    state = {
        posts: [],
    }

    onEndReached = ({ distanceFromEnd }) => {
    }

    componentDidMount = () => {
        console.log(this.props.route.params.post)
    }

    render() {

        const { post } = this.props.route.params;
        const { index } = this.props.route.params;

        return (
            <Container>
                {/* <Header>
                    <Left />
                    <Body>
                        <Title>Feed</Title>
                    </Body>
                    <Right />
                </Header> */}
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={post}
                        renderItem={({ item }) => <FeedCards post={item} />}
                        keyExtractor={(item, index) => `id_${index}`}
                        // pagingEnabled={true} 
                        // decelerationRate={'fast'}
                        initialScrollIndex={index}
                        snapToAlignment={'top'}
                        viewabilityConfig={{ itemVisiblePercentThreshold: 90 }}
                        // refreshing={this.state.isRefreshing}
                        // onRefresh={() => this.onRefresh()}
                        onEndReachedThreshold={0.5}

                        onEndReached={({ distanceFromEnd }) => {
                            console.log(distanceFromEnd)
                            console.log('reached');
                            //   this.onEndReached()
                        }}
                    />
                </View>
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


export default connect(mapStateToProps, mapDispatchToProps)(PostScrollScreen)