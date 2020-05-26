import React, { Component } from 'react'
import { View, Image, FlatList } from 'react-native'
import { Container, Button, Card, Text, CardItem, Input, Header, Content, Left, Picker, Icon, Body, Right, H3, H2, DatePicker, Title, Thumbnail } from 'native-base'
import FeedCards from '../FeedCards'
import { connect } from 'react-redux'
import { fetchPosts } from '../../redux'
import { db } from '../../config'
import {uuid} from 'react-uuid'

class FeedScreen extends Component {

    fetchPosts = async () => {
        var arr = []
        await db.collection('posts')
            .get()
            .then(snapshot => {
                snapshot.docs.forEach(doc => {
                    arr = [doc.data() , ...arr]
                    // this.state.posts = [...this.state.posts , doc.data()]
                })

                this.setState({
                    posts : arr
                })

                // console.log(this.state.posts);
                // this.state.condition = "FETCHED"
                // console.log(this.state.condition)
            }).
            catch(error => console.log("ERR : " , error.message))
    }

    componentDidMount = () => {
        console.log("COMPONENT DID MOUNTED (FEED SCREEN)");
        // this.props.fetchPosts();
        this.fetchPosts()
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
        // console.log("Refreshing")
        this.fetchPosts()
        setTimeout(() => {
          this.setState({isRefreshing: false});
        }, 2000);
      }

    render() {
        return (
            <Container>
                {/* <Header>
                    <Left />
                    <Body>
                        <Title>Feed</Title>
                    </Body>
                    <Right />
                </Header> */}
                {/* <Text>
                    {this.state.condition}
                </Text> */}
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
    posts : state.post.posts
})
const mapDispatchToProps = (dispatch) => {
    return {
        fetchPosts_: () => dispatch(fetchPosts())
    }
}


export default connect(null, mapDispatchToProps)(FeedScreen)