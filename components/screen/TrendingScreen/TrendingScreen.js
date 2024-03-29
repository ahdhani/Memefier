import React, { Component } from 'react'
import { View, StyleSheet, FlatList, ImageBackground, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native'
import { Container, Button, Card, Text, Item, Input, Header, Content, Left, Picker, Icon, Body, Right, H3, H2, DatePicker, Title, Thumbnail } from 'native-base'
import { db } from '../../../config';
import { algoliaTest, algoliaSearch , algoliaSearchGroup} from '../../functions/algolia'
import { fetchUserId} from '../../functions/user'
import colors from '../../../constants/colors'

const cardWidth = Dimensions.get('window').width / 2;
const cardHeight = cardWidth * 1.25;

export default class TrendingScreen extends Component {

    state = {
        trendingPosts: [
        ],
    }


    toggleFollow = (index) => {
        let trendingPosts = this.state.trendingPosts;
        trendingPosts[index].isFollow = !trendingPosts[index].isFollow;
        this.setState({
            trendingPosts: trendingPosts,
        })
    }

    fetchPosts = async () => {
        await db.collection('posts')
            .get()
            .then(async snapshot => {
                var arr = []
                await snapshot.docs.forEach(doc => {
                    arr = [{ ...doc.data(), post_id: doc.id }, ...arr]
                })
                await this.setState({
                    trendingPosts: arr
                })
            }).
            catch(error => console.log("ERR : ", error.message))

    }


    componentDidMount = () => {
        this.fetchPosts()
    }

    render() {
        return (
            <Container>
                <Header searchBar rounded style={{backgroundColor: colors.color5}}>
                    <Body>
                        <Item>
                            <Icon name="ios-search" />
                            <Input placeholder="Search"
                                onFocus={()=> this.props.navigation.navigate('SearchScreen')}
                                underlineColorAndroid="transparent"
                            />
                        </Item>
                    </Body>
                </Header>

                <FlatList
                    data={this.state.trendingPosts}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <Item onPress={() => this.props.navigation.navigate('PostScrollScreen', {
                            post: this.state.trendingPosts,
                            index: index,
                        })}>
                            <ImageBackground resizeMode='contain' source={{ uri: item.img }}
                                style={{
                                    width: cardWidth, height: cardHeight,
                                    elevation: 5, zIndex: 5
                                }}>
                                {/* <View style={{ flexDirection: 'row', top: 200 }}>
                                    <Left>
                                        <Text style={{
                                            margin: 20, color: '#fff',
                                            shadowColor: '#111', textShadowColor: '#111',
                                            textShadowRadius: 10, fontWeight: '800',
                                        }}>{item.created_by}</Text>
                                        }}>{fetchUserId(item.created_by)}</Text> 
                                    </Left>
                                    <Right>
                                        <TouchableOpacity
                                            onPress={() => {
                                                this.toggleFollow(index)
                                            }}
                                        >
                                            <Text style={{
                                                margin: 20, color: '#fff',
                                                shadowColor: '#111', textShadowColor: '#111',
                                                textShadowRadius: 5, fontWeight: '600', fontSize: 12,
                                            }}>{item.isFollow ? 'Follow' : 'Unfollow'}</Text>
                                        </TouchableOpacity>

                                    </Right>
                                </View> */}
                            </ImageBackground>
                        </Item>
                    )}
                    numColumns={2}
                // enableEmptySections={true}
                />

            </Container>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#aaa',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
});
