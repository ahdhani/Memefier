import React, { Component } from 'react'
import { View, StyleSheet, Image, FlatList } from 'react-native'
import { Container, Tab, Tabs, Right, H3, H2, DatePicker, Title, Thumbnail } from 'native-base'
import MemberReview from './MemberReview';
import PostReview from './PostReview';
import colors from '../../../constants/colors'

class AdminScreen extends Component {


    render() {
        return (
            <Container>
                <Tabs tabBarPosition='top' locked
                    tabBarUnderlineStyle={{ backgroundColor: 'black', height: 2 }}>
                    <Tab heading="Members" tabStyle={{ backgroundColor: colors.color5 }}
                        activeTabStyle={{ backgroundColor: '#142116' }}
                        activeTextStyle={{ color: colors.color1,fontSize: 20 }}
                        textStyle={{ color: colors.color3,fontSize: 18 }}>
                        <MemberReview />
                    </Tab>
                    <Tab heading="Post" tabStyle={{ backgroundColor: colors.color5 }}
                        activeTabStyle={{ backgroundColor: '#142116' }}
                        activeTextStyle={{ color: colors.color1,fontSize: 20 }}
                        textStyle={{ color: colors.color3,fontSize: 18 }}>
                        <PostReview />
                    </Tab>
                </Tabs>
            </Container>
        )
    }

}


export default AdminScreen
