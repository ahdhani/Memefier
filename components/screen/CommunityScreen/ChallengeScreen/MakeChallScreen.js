import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Container, Content, CardItem, Card, Button } from 'native-base';

export default class MakeChallScreen extends Component {
    render() {
        return (
            <Container>
                <Content>
                    <CardItem>
                        <Card style={{ padding: 0, borderRadius: 8 }}>
                            <CardItem >
                                <TextInput style={styles.challName} placeholder="Challenge Name"></TextInput>
                            </CardItem>
                            <CardItem>
                                <Card style={styles.challDesc} >
                                    <TextInput style={{ fontSize: 16 }} multiline placeholder="Description"></TextInput>
                                </Card>
                            </CardItem>
                        </Card>
                    </CardItem>
                    <CardItem style={{ flexDirection: 'column' }}>
                        <Button block >
                            <Text style={{ color: "white", fontSize: 18 }}>Post</Text>
                        </Button>
                    </CardItem>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create(
    {
        challName: {
            width: '100%',
            height: 42,
            borderBottomColor: '#3F51B5',
            borderBottomWidth: 3,
            paddingBottom: 0,
            fontSize: 18,
            fontWeight: 'bold'

        },
        challDesc: {
            paddingLeft: 4,
            height: 200,
            width: '100%',
            padding: 0,
            borderRadius: 8
        }
    }
);