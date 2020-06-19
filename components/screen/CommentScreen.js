import React, { Component } from 'react'
import { View, StyleSheet, Picker, TextInput, Image, FlatList, TouchableOpacity } from 'react-native'
import { Container, Button, Item, Input, Header, Content, Text, Left, Body, Title, Icon, Thumbnail, Right } from 'native-base'
import colors from '../../constants/colors'

// import { loginUser } from '../../redux'
// import { connect } from "react-redux";
// import { db } from '../../config'
// import { updateUserDetails } from '../../redux';

// const screenHeight = Dimensions.get('screen').height;


export default class CommentScreen extends Component {

    state = {
        commentText: '',
        replyText: '',
        replyIndex: null,
        comments: [{ comment: 'hgcjhdlkfnd', replies: [{ reply: 'f' }, { reply: 'f' }] }, { comment: 'hgcjh' }, { comment: 'hgcjh' },],
    }

    // componentDidMount() {
    //     // this.getPermissionAsync();

    // }

    addReply = (index) => {

    }

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
                    flex: 1
                }}>
                    <View style={{
                        flexDirection: 'row',
                    }}>
                        <Thumbnail resizeMode='cover' source={require('../../assets/dp/default.png')}
                            style={{ marginHorizontal: 5 }} small />
                        <View style={{ flex: 1 }}>
                            <Text style={{ color: '#fff', marginLeft: 6 }}>@ahdhani</Text>
                            <Input style={{ color: '#fff', }}
                                placeholder='Comment...'
                                onChangeText={(text) => this.setState({ commentText: text })}
                                value={this.state.commentText} />
                        </View>

                        <Icon name='send' style={{ margin: 15 }} onPress={() => this.setState({ comments: [...this.state.comments, { comment: this.state.commentText }] })} />
                    </View>
                    <FlatList
                        // style={{maxHeight: 500}}
                        data={this.state.comments}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => (
                            <Item style={{ flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}
                            // onPress={() => this.props.navigation.navigate('PostScrollScreen')}
                            >
                                <View style={{ flexDirection: 'row', width: '100%' }} >
                                    <Thumbnail small resizeMode='cover'
                                        source={require('../../assets/dp/default.png')} style={{ margin: 5, marginTop: 10 }} />
                                    {/* <Thumbnail source={{ uri:  }} />  */}
                                    <View style={{ margin: 5 }}>
                                        <Text style={{ color: '#fff' }}>@userID</Text>
                                        <Text style={{ color: '#fff' }}>{item.comment}</Text>
                                    </View>
                                    <Text style={{ position: 'absolute', right: 30, margin: 10, color: colors.color3 }}
                                        onPress={() => this.setState({ replyIndex: index })}
                                    >Reply</Text>
                                </View>


                                <FlatList
                                    data={item.replies}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({ item, index }) => (
                                        <View style={{
                                            flexDirection: 'row', alignItems: 'flex-start',
                                        }}
                                        >
                                            <Thumbnail small resizeMode='cover'
                                                source={require('../../assets/dp/default.png')} style={{ margin: 5, marginTop: 10 }} />
                                            {/* <Thumbnail source={{ uri:  }} />  */}
                                            <View style={{ margin: 5, flexGrow: 1 }}>
                                                <Text style={{ color: '#fff' }}>@userID</Text>
                                                <Text style={{ color: '#fff' }}>{item.reply}</Text>
                                            </View>
                                        </View>
                                    )}
                                    style={{ left: 50, width: '100%' }}
                                    ListFooterComponent={() => (
                                        this.state.replyIndex === index ?
                                            <View style={{
                                                flexDirection: 'row', backgroundColor: '#253237',
                                                alignItems: 'center', width: '100%'
                                            }}>
                                                <Thumbnail resizeMode='cover' source={require('../../assets/dp/default.png')}
                                                    style={{ marginHorizontal: 5 }} small />
                                                <View>
                                                    <Text style={{ color: '#fff', marginLeft: 6 }}>@ahdhani</Text>
                                                    <Input style={{ color: '#fff', width: 200 }}
                                                        placeholder='Reply...'
                                                        onChangeText={(text) => this.setState({ replyText: text })}
                                                        value={this.state.replyText} />
                                                </View>

                                                <Icon name='send' style={{ margin: 15 }} onPress={(index) => this.addReply(index)} />
                                            </View>
                                            : null
                                    )}

                                />


                            </Item>

                        )}

                    />

                    
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