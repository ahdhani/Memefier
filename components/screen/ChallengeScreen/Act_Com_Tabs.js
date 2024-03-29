//Active and Complete Tabs
 
import React from "react";
import { Card, CardItem } from 'native-base';
import { View, Text, TouchableOpacity, Animated, ScrollView, Dimensions } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../../constants/colors'

const { width } = Dimensions.get("window");

export default class Act_Com_Tabs extends React.Component {
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

        let ActiveChall = [];                            //Active Challenges array
        let ComChall = [];                               //Completed Challenges array

        ActiveChall.push(
            <TouchableOpacity onPress={() => navigate('ChallengeFeed')}>
                <Card style={{ padding: 0, borderRadius: 8 }}>
                    <CardItem>
                        <View>
                            <Text style={{ fontWeight: 'bold', fontSize: 20, color: colors.color5 }}>Titanic Challenge</Text>
                            <Text style={{ fontSize: 12, color: colors.color5 }} >Offered by Coursera</Text>
                        </View>

                        <View style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center", paddingLeft: 25
                        }}>
                            <Text style={{ color: 'green' }}>Ends in 5hrs</Text>
                            <MaterialCommunityIcons name="timer-sand" color='green' size={20} />
                        </View>

                    </CardItem>
                </Card>
            </TouchableOpacity>
        );

        ComChall.push(
            <Card style={{ padding: 0, borderRadius: 8 }}>
                <CardItem style={{ backgroundColor: "#e6ebe7" }}>
                    <View>
                        <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'grey' }}>Corona Challenge</Text>
                        <Text style={{ fontSize: 12, color: 'grey' }} >Offered by China</Text>
                    </View>
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center", paddingLeft: 25
                    }}>
                        <Text style={{ color: 'red' }} >Ended</Text>
                        <MaterialCommunityIcons name="timer-sand-full" color='red' size={20} />
                    </View>
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
                                backgroundColor: colors.color5,
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
                                borderColor: colors.color5,
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
                                    color: active === 0 ? colors.color1 : colors.color5,
                                    fontSize: 16
                                }}
                            >
                                Active
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "center",
                                borderWidth: 1,
                                borderColor: colors.color5,
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
                                    color: active === 1 ? colors.color1 : colors.color5,
                                    fontSize: 16
                                }}
                            >
                                Completed
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

                            {ActiveChall}

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

                            {ComChall}

                        </Animated.View>

                    </ScrollView>
                </View>
            </View>
        );
    }
}