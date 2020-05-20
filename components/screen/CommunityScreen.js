import React, { Component } from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { Container, Button, Card, Text, ListItem, Input, Header, Content, Left, Picker, Icon, Body, Right, H3, H2, DatePicker, Title, Thumbnail } from 'native-base'


export default class CommunityScreen extends Component {

    render() {
        return (
            <Container>
                <Header>
                    <Left />
                    <Body>
                        <Title>Community</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    <Text>Community</Text>
                </Content>
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
