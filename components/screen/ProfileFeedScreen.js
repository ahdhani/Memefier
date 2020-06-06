import React, { Component } from 'react'
import { View, Image, FlatList } from 'react-native'
import { Container, Button, Card, Text, CardItem, Input, Header, Content, Left, Picker, Icon, Body, Right, H3, H2, DatePicker, Title, Thumbnail } from 'native-base'
import FeedCards from '../FeedCards'
import { connect } from 'react-redux'
import { fetchPosts } from '../../redux'

class ProfileFeedScreen extends Component {

    state = {
        posts : [] ,
        isRefreshing: false,
    }

    onEndReached = ({ distanceFromEnd }) => {
    }

    onRefresh = () => {
        this.setState({isRefreshing: true});


        // fetch next batch CODE HERE
        // console.log("Refreshing")
        this.fetchPosts()

        // refreshed fetch CODE HERE
        // console.log("Refreshing")

        setTimeout(() => {
          this.setState({isRefreshing: false});
        }, 2000);
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
                        keyExtractor={(item,index) => `id_${index}`}
                        // pagingEnabled={true} 
                        // decelerationRate={'fast'}
                        initialScrollIndex={index}
                        snapToAlignment={'top'} 
                        viewabilityConfig={{itemVisiblePercentThreshold: 90}} 
                        refreshing={this.state.isRefreshing}
                        onRefresh={() => this.onRefresh()}
                        onEndReachedThreshold={0.5}
                  
                        onEndReached = {({distanceFromEnd})=>{
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
    user : state.auth.user ,
    userDetails: state.auth.userDetails , 
    following : state.auth.following
})
const mapDispatchToProps = (dispatch) => {
    return {
        fetchPosts_: () => dispatch(fetchPosts())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProfileFeedScreen)