import React, { Component } from 'react'
import { Container, Button, Text, Card, CardItem, Input, Content,Spinner ,} from 'native-base'
import * as Animatable from 'react-native-animatable'
import {createGroup} from './../../functions/community';
import { connect } from 'react-redux';

class CreateCommunity extends Component {
    state = {
        name: '',
        nameError: false,
        bio: '',
        id: '',
        idError: false,
        loading: false,
    }

    render() {
        return (
            <Container>
                <Content>
                    <Card >
                        <CardItem style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                            <Text style={{ fontWeight: 'bold' }}>Name:</Text>
                            <Card style={{
                                width: '100%',
                                padding: 5,

                                margin: 0
                            }}>
                                <Input onChangeText={(text) => this.setState({ name: text })}
                                    placeholder='Eg:CETIANS' placeholderTextColor='#ccc'
                                    style={{ fontSize: 15, paddingLeft: 0 }} multiline maxLength={50} />
                            </Card>
                            {this.state.nameError ?
                                <Animatable.View animation='fadeIn' duration={500}>
                                    <Text style={{ color: 'red', fontSize: 12 }}>*Name must not be empty</Text>
                                </Animatable.View> : null
                            }
                        </CardItem>

                        <CardItem style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                            <Text style={{ fontWeight: 'bold' }}>Bio:</Text>
                            <Card style={{
                                width: '100%',
                                padding: 5,
                                margin: 0
                            }}>
                                <Input onChangeText={(text) => this.setState({ bio: text })}
                                    placeholder='College Meme Group' placeholderTextColor='#ccc'
                                    style={{ fontSize: 15, paddingLeft: 0 }} multiline maxLength={50} />
                            </Card>
                        </CardItem>

                        <CardItem style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                            <Text style={{ fontWeight: 'bold' }}>Id:</Text>
                            <Card style={{
                                width: '100%',
                                padding: 5,
                                margin: 0
                            }}>
                                <Input onChangeText={(text) => this.setState({ id: text })}
                                    placeholder='Eg:cetians' placeholderTextColor='#ccc'
                                    style={{ fontSize: 15, paddingLeft: 0 }} multiline maxLength={50} />
                            </Card>
                            {this.state.idError ?
                                <Animatable.View animation='fadeIn' duration={500}>
                                    <Text style={{ color: 'red', fontSize: 12 }}>*Id must not be empty</Text>
                                </Animatable.View> : null
                            }
                        </CardItem>

                        <CardItem style={{ marginTop:105,flexDirection: 'column' }}>
                            <Button block
                                onPress={() => {
                                    if (this.state.name.length != 0 && this.state.id.length != 0) {
                                        this.setState({
                                            nameError: false,
                                            idError: false
                                        });
                                        createGroup(this.state.name,this.props.user.uid,this.state.bio)
                                            .then(id => {

                                                this.props.navigation.goBack();
                                                // SUCCESS AND REDIRECT TO PREV SCREEN -- @hani
                                            })
                                            .catch(error => {
                                                // SHOW FAILED MSG -- @hani
                                            })
                                    }
                                    else {
                                        if (this.state.name.length == 0 && this.state.id.length != 0)
                                            this.setState({
                                                nameError: true,
                                                idError: false
                                            })

                                        if (this.state.id.length == 0 && this.state.name.length != 0)
                                            this.setState({
                                                idError: true,
                                                nameError: false
                                            })
                                        if (this.state.id.length == 0 && this.state.name.length == 0)
                                            this.setState({
                                                idError: true,
                                                nameError: true
                                            })
                                    }
                                }}>
                                <Text>Create Group</Text>
                            </Button>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        )
    }
}


const mapStateToProps = (state) => ({
    // isAuthenticated: state.auth.isAuthenticated,
    // userDetails: state.auth.userDetails,
    // userPosts: state.post.posts,
    // following: state.auth.following,
    user: state.auth.user
})

export default connect(mapStateToProps, null)(CreateCommunity)
