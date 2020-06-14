import React, { Component } from 'react'
import { View, StyleSheet, Picker, TextInput, Image, FlatList, TouchableOpacity } from 'react-native'
import { Container, Button, Item, Input, Header, Content, Text, Left, Body, Title, Icon, Thumbnail, Right } from 'native-base'

// import { loginUser } from '../../redux'
// import { connect } from "react-redux";
// import { db } from '../../config'
// import { updateUserDetails } from '../../redux';

// const screenHeight = Dimensions.get('screen').height;


export default class CommentScreen extends Component {

    state = {
        commentText: '',
        comments: [{ comment: 'hgcjhdlkfndlfma;fma \n /nlm \nsl\nf' }, { comment: 'hgcjh' }, { comment: 'hgcjh' },],
    }

    // componentDidMount() {
    //     // this.getPermissionAsync();

    // }

    render() {

        return (
            <Container style={{ backgroundColor: '#253237' }}>
                <Header style={{ backgroundColor: '#252337' }}>
                    <Left >
                        <Icon style={{ marginLeft: 10, color: '#fff' }} name='ios-arrow-round-back'
                            onPress={() => this.props.navigation.goBack()}
                        />
                    </Left>
                    <Body>
                        <Title>Comments</Title>
                    </Body>
                </Header>
                <View style={{
                    backgroundColor: '#253237',
                    padding: 10,
                }}>
                    <FlatList
                        // style={{maxHeight: 500}}
                        data={this.state.comments}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => (
                            <Item style={{ flexDirection: 'row' }}
                            // onPress={() => this.props.navigation.navigate('PostScrollScreen')}
                            >
                                <View style={{ alignContent: 'flex-start' ,alignItems: 'flex-start',
                                justifyContent: 'flex-start',backgroundColor: 'black'}}>
                                    <Thumbnail small resizeMode='cover' source={require('../../assets/dp/default.png')} style={{ margin: 5 }} />
                                </View>
                                {/* <Thumbnail source={{ uri:  }} />  */}
                                <View style={{ margin: 5 }}>
                                    <Text style={{ color: '#fff' }}>@userID</Text>
                                    <Text style={{ color: '#fff' }}>{item.comment}</Text>
                                </View>
                            </Item>
                        )}

                    />
                    {/* </Content> */}

                    <View style={{
                        flexDirection: 'row', backgroundColor: '#253237',
                        alignItems: 'center', marginVertical: 10
                    }}>
                        <Thumbnail resizeMode='cover' source={require('../../assets/dp/default.png')} style={{ margin: 10 }} />
                        <View style={{ flex: 1 }}>
                            <Text style={{ color: '#fff', marginLeft: 6 }}>@ahdhani</Text>
                            <Input style={{ color: '#fff', }}
                                placeholder='Comment...'
                                onChangeText={(text) => this.setState({ commentText: text })}
                                value={this.state.commentText} multiline />
                        </View>

                        <Icon name='send' style={{ margin: 15 }} onPress={() => this.setState({ comments: [...this.state.comments, { comment: this.state.commentText }] })} />
                    </View>
                </View>
            </Container>
        )
    }

}

// const mapStateToProps = (state) => ({
//     userDetails: state.auth.userDetails,
// })
// const mapDispatchToProps = (dispatch) => {
//     return {
//         updateUser: (data) => dispatch(updateUserDetails(data))
//     }
// }


// export default connect(mapStateToProps, mapDispatchToProps)(CommentScreen)