import React, { Component } from 'react'
import { View } from 'react-native'
import { Container, Button, Text, Card, CardItem, Content, Right } from 'native-base'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

class CommunityFeed extends Component {
    render() {
        return (
            <Container>
                <Content>
                    <CardItem style={{ marginVertical: -10 }} >
                        <Card style={{ margin: 50, borderRadius: 8, flexDirection: 'row', alignItems: 'center' }}>
                            <CardItem style={{ marginLeft: 15 }}>
                                <Button onPress={() => this.props.navigation.navigate('CreateCommunity')} style={{ borderRadius: 100, alignItems: 'center', justifyContent: 'center' }} height={65} width={65} >
                                    <MaterialCommunityIcons
                                        name='plus'
                                        color="white"
                                        size={30}
                                    />
                                </Button>
                                <Text style={{ marginLeft: 15, fontWeight: 'bold', fontSize: 25 }}>Create a Group</Text>
                            </CardItem>
                            <Right>
                            </Right>
                        </Card>
                    </CardItem>
                    <CardItem style={{ marginVertical: -5 }} >
                        <Card style={{ padding: 0, borderRadius: 8, flexDirection: 'row', alignItems: 'center' }}>
                            <CardItem style={{ marginLeft: 15 }}>
                                <Button style={{ borderRadius: 100, alignItems: 'center', justifyContent: 'center' }} height={65} width={65} >
                                </Button>
                                <View style={{ marginLeft: 15 }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Fan Fight Club</Text>
                                    <Text style={{ color: 'rgba(0,0,0,0.35)' }}>5.5k members</Text>
                                </View>
                            </CardItem>
                            <Right>
                            </Right>
                        </Card>
                    </CardItem>




                </Content>
            </Container>

        )
    }

}


export default CommunityFeed;
