import React, { Component } from 'react'
import { View, StyleSheet, FlatList, ImageBackground, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native'
import { Container, Button, Card, Text, Item, Input, Header, Content, Left, Tab, Tabs, Icon, Body, Right, H3, H2, DatePicker, Title, Thumbnail } from 'native-base'
import SearchComponent from './SearchComponent'
import colors from '../../../constants/colors'
import { db } from '../../../config';
import { algoliaTest, algoliaSearch } from '../../functions/algolia'

export default class SearchScreen extends Component {

    state = {
        searchText: '',
        searchResult: [],
        searchLoading: false,

    }

    onChangeTextSearch = (text) => {

        if (text != '') {
            this.setState({
                searchLoading: true,
                searchText: text,
            })
            var search_list = []
            db.collection('userDetails')
                .get()
                .then(snapshot => {
                    snapshot.docs.forEach(doc => {
                        if (doc.data().firstname.includes(text) || doc.data().lastname.includes(text)) {
                            search_list = [...search_list, { ...doc.data(), uuid: doc.id }]

                        }
                    })
                    this.setState({
                        searchResult: search_list,
                        searchLoading: false,
                    })
                })
                .catch(error => console.log(error.message))

        }
        else {
            this.setState({
                searchResult: [],
                searchText: '',
            })
        }
    }

    render() {
        return (
            <Container>
                <Header searchBar rounded>
                    <Body>
                        <Item>
                            <Icon name="ios-search" />
                            <Input placeholder="Search"
                                onChangeText={text => this.onChangeTextSearch(text)}
                                value={this.state.searchText}
                                underlineColorAndroid="transparent"
                                autoFocus
                            // onBlur={() => this.setState({
                            //     searchResult: [],
                            //     searchText: '',
                            // })}
                            />
                            <Icon name="ios-people" />
                        </Item>
                    </Body>
                </Header>
                <Content>
                    <Tabs tabBarPosition='top' locked
                        tabBarUnderlineStyle={{ backgroundColor: 'black', height: 2 }}>
                        <Tab heading="Members" tabStyle={{ backgroundColor: colors.color5 }}
                            activeTabStyle={{ backgroundColor: '#142116' }}
                            activeTextStyle={{ color: colors.color1, fontSize: 20 }}
                            textStyle={{ color: colors.color3, fontSize: 18 }}>
                            <SearchComponent list={this.state.searchResult} searchLoading={this.state.searchLoading} />
                            {/* <MemberReview group_id={this.props.route.params.group_id}
                        userId={this.props.user.uid} /> */}
                        </Tab>
                        <Tab heading="Post" tabStyle={{ backgroundColor: colors.color5 }}
                            activeTabStyle={{ backgroundColor: '#142116' }}
                            activeTextStyle={{ color: colors.color1, fontSize: 20 }}
                            textStyle={{ color: colors.color3, fontSize: 18 }}>
                            <SearchComponent list={this.state.searchResult} searchLoading={this.state.searchLoading} />

                            {/* <PostReview group_id={this.props.route.params.group_id} 
                        userId={this.props.user.uid} /> */}
                        </Tab>
                    </Tabs>
                </Content>
            </Container>
        )
    }

}
