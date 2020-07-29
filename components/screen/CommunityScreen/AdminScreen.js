import React, { Component } from 'react'
import { View, StyleSheet, Image, FlatList } from 'react-native'
import { Container, Tab, Tabs, Right, H3, H2, DatePicker, Title, Thumbnail } from 'native-base'
import MemberReview from './MemberReview';
import PostReview from './PostReview';
import colors from '../../../constants/colors'
import { connect } from 'react-redux';

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
                        <MemberReview group_id={this.props.route.params.group_id}/>
                    </Tab>
                    <Tab heading="Post" tabStyle={{ backgroundColor: colors.color5 }}
                        activeTabStyle={{ backgroundColor: '#142116' }}
                        activeTextStyle={{ color: colors.color1,fontSize: 20 }}
                        textStyle={{ color: colors.color3,fontSize: 18 }}>
                        <PostReview group_id={this.props.route.params.group_id} 
                        userId={this.props.user.uid} />
                    </Tab>
                </Tabs>
            </Container>
        )
    }

}

const mapStateToProps = (state) => ({
    user: state.auth.user
})

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminScreen)

// export default 
