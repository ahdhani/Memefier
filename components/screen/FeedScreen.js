import React, { Component } from 'react'
import { View, Image, FlatList } from 'react-native'
import { Container, Button, Card, Text, CardItem, Input, Header, Content, Left, Picker, Icon, Body, Right, H3, H2, DatePicker, Title, Thumbnail } from 'native-base'
import FeedCards from '../FeedCards'
import { connect } from 'react-redux'
import { fetchPosts } from '../../redux'
import { db } from '../../config'
import {uuid} from 'react-uuid'

class FeedScreen extends Component {

    componentDidMount = async () => {
        console.log("COMPONENT DID MOUNTED (FEED SCREEN)");
        // this.props.fetchPosts();
        await db.collection('posts')
            .get()
            .then(snapshot => {
                snapshot.docs.forEach(doc => {
                    this.setState({
                        posts : [...this.state.posts , doc.data()]
                    })
                    // this.state.posts = [...this.state.posts , doc.data()]
                }
                )

                console.log(this.state.posts);
                // this.state.condition = "FETCHED"
                // console.log(this.state.condition)
            }).
            catch(error => console.log("ERR : " , error.message))


    }


    state = {
        posts : [] ,
        isRefreshing: false,
    }

    onEndReached = ({ distanceFromEnd }) => {
    }

    onRefresh = () => {
        this.setState({isRefreshing: true});

        // fetch next batch CODE HERE
        console.log("Refreshing")
        setTimeout(() => {
          this.setState({isRefreshing: false});
        }, 2000);
      }

    render() {
        return (
            <Container>
                <Header>
                    <Left />
                    <Body>
                        <Title>Feed</Title>
                    </Body>
                    <Right />
                </Header>
                <Text>
                    {this.state.condition}
                </Text>
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={this.state.posts}
                        renderItem={({ item }) => <FeedCards post={item} />}
                        // keyExtractor={item => uuid()}
                        // keyExtractor={item => item.id}
                        keyExtractor={(item,index) => `id_${index}`}
                        initialNumToRender={2} 
                        pagingEnabled={true} 
                        decelerationRate={'fast'}
                        snapToAlignment={'top'} 
                        viewabilityConfig={{itemVisiblePercentThreshold: 90}} 
                        // contentContainerStyle={{height: 700}}
                        // refreshControl={
                        //   <RefreshControl
                        //     refreshing = {this.state.refreshing}
                        //     onRefresh = {()=>this._onRefresh()}
                        //   />
                        // }
                        // curent value for debug is 0.5
                        refreshing={this.state.isRefreshing}
                        onRefresh={() => this.onRefresh()}
                        onEndReachedThreshold={0.5} // Tried 0, 0.01, 0.1, 0.7, 50, 100, 700
                  
                        onEndReached = {({distanceFromEnd})=>{ // problem
                          console.log(distanceFromEnd) // 607, 878 
                          console.log('reached'); // once, and if I scroll about 14% of the screen, 
                                               //it prints reached AGAIN. 
                        //   this.onEndReached()
                        }}
                    />
                </View>
            </Container>
        )
    }

}
const mapStateToProps = (state) => ({
    posts : state.post.posts
})
const mapDispatchToProps = (dispatch) => {
    return {
        fetchPosts: () => dispatch(fetchPosts())
    }
}


export default connect(null, mapDispatchToProps)(FeedScreen)