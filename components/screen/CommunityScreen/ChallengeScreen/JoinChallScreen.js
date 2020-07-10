//Join Challenge Screen

import React, { Component } from 'react';
import { Card, CardItem, Right, Button, Container } from 'native-base';
import { View, Text, TouchableOpacity, Animated, ScrollView, Dimensions, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get("window");

export default class JoinChallScreen extends Component {

    state = {
        active: 0,
        xTabOne: 0,
        xTabTwo: 0,
        translateX: new Animated.Value(0),
        translateXTabOne: new Animated.Value(0),
        translateXTabTwo: new Animated.Value(width),
        translateY: -1000
    };

    handleSlide = type => {
        let {
            active,
            xTabOne,
            xTabTwo,
            translateX,
            translateXTabOne,
            translateXTabTwo
        } = this.state;
        Animated.spring(translateX, {
            toValue: type,
            duration: 100
        }).start();
        if (active === 0) {
            Animated.parallel([
                Animated.spring(translateXTabOne, {
                    toValue: 0,
                    duration: 100
                }).start(),
                Animated.spring(translateXTabTwo, {
                    toValue: width,
                    duration: 100
                }).start()
            ]);
        } else {
            Animated.parallel([
                Animated.spring(translateXTabOne, {
                    toValue: -width,
                    duration: 100
                }).start(),
                Animated.spring(translateXTabTwo, {
                    toValue: 0,
                    duration: 100
                }).start()
            ]);
        }
    };


    render() {
        const { navigate } = this.props.navigation;

        let LeaderBoard = [];                               //LeaderBoard array
        LeaderBoard.push(
            <Card style={{ padding: 0, borderRadius: 8 }}>
                <CardItem  >
                    <View style={{
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }} >
                        <Text style={{ fontWeight: 'bold', fontSize: 35, color: 'green' }}>#1</Text>
                        <Text style={{ fontSize: 20 }}>@ahdhani</Text>
                    </View>
                    <Right>
                        <View style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center"
                        }}>
                            <MaterialCommunityIcons name="heart" color='#3F51B5' size={20} />
                            <Text > 22k</Text>
                        </View>
                        <View style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center"
                        }}>
                            <MaterialCommunityIcons name="heart-broken" color='#3F51B5' size={20} />
                            <Text > 13k</Text>
                        </View>
                    </Right>
                </CardItem>
            </Card>
        );

        let {
            xTabOne,
            xTabTwo,
            translateX,
            active,
            translateXTabOne,
            translateXTabTwo,
            translateY
        } = this.state;
        return (
            <Container>
                <View style={{ flex: 1 }}>
                    <View
                        style={{
                            width: "90%",
                            marginLeft: "auto",
                            marginRight: "auto"
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                marginTop: 12,
                                marginBottom: 20,
                                height: 36,
                                position: "relative"
                            }}
                        >
                            <Animated.View
                                style={{
                                    position: "absolute",
                                    width: "50%",
                                    height: "100%",
                                    top: 0,
                                    left: 0,
                                    backgroundColor: "#3F51B5",
                                    borderRadius: 4,
                                    transform: [
                                        {
                                            translateX
                                        }
                                    ]
                                }}
                            />
                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderWidth: 1,
                                    borderColor: "#3F51B5",
                                    borderRadius: 4,
                                    borderRightWidth: 0,
                                    borderTopRightRadius: 0,
                                    borderBottomRightRadius: 0
                                }}
                                onLayout={event =>
                                    this.setState({
                                        xTabOne: event.nativeEvent.layout.x
                                    })
                                }
                                onPress={() =>
                                    this.setState({ active: 0 }, () =>
                                        this.handleSlide(xTabOne)
                                    )
                                }
                            >
                                <Text
                                    style={{
                                        color: active === 0 ? "#fff" : "#3F51B5",
                                        fontSize: 16
                                    }}
                                >
                                    Description
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderWidth: 1,
                                    borderColor: "#3F51B5",
                                    borderRadius: 4,
                                    borderLeftWidth: 0,
                                    borderTopLeftRadius: 0,
                                    borderBottomLeftRadius: 0
                                }}
                                onLayout={event =>
                                    this.setState({
                                        xTabTwo: event.nativeEvent.layout.x
                                    })
                                }
                                onPress={() =>
                                    this.setState({ active: 1 }, () =>
                                        this.handleSlide(xTabTwo)
                                    )
                                }
                            >
                                <Text
                                    style={{
                                        color: active === 1 ? "#fff" : "#3F51B5",
                                        fontSize: 16
                                    }}
                                >
                                    Leaderboard
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <ScrollView>

                            <Animated.View
                                style={{
                                    justifyContent: "center",
                                    transform: [
                                        {
                                            translateX: translateXTabOne
                                        }
                                    ]
                                }}
                                onLayout={event =>
                                    this.setState({
                                        translateY: event.nativeEvent.layout.height
                                    })
                                }
                            >

                                <Card style={styles.challDesc} >
                                    <Text style={{ fontSize: 16 }} multiline>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only . It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                    </Text>
                                </Card>

                                <Button block style={{ marginTop: 22 }} >
                                    <Text style={{ color: "white", fontSize: 18 }}>Post</Text>
                                </Button>

                            </Animated.View>

                            <Animated.View
                                style={{
                                    justifyContent: "center",
                                    transform: [
                                        {
                                            translateX: translateXTabTwo
                                        },
                                        {
                                            translateY: -translateY
                                        }
                                    ]
                                }}
                            >
                                {LeaderBoard}
                            </Animated.View>
                        </ScrollView>
                    </View>

                </View>
            </Container>
        );
    }

}

const styles = StyleSheet.create(
    {
        challDesc: {
            paddingLeft: 4,
            height: 250,
            width: '99.3%',
            borderRadius: 8
        }
    }
);

