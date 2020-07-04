import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Container, Content, CardItem, Card, Button } from 'native-base';
import { addChallenge } from './../../../functions/challenges';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import { connect } from 'react-redux';

class MakeChallScreen extends Component {

    state = {
        chalName: '',
        chalDesc: '',
        dateBool: false,
        buttonDisplay: 'Deadline',
        buttonTextColor: 'white',
        deadline: 0
    };

    hideDatePicker = () => {
        this.setState({
            dateBool: false
        })
    };

    handleDateConfirm = (date) => {
        this.hideDatePicker();
        this.setState({
            deadline: Date.parse(date),
            buttonDisplay: moment(date).format('Do MMM YYYY') + ' at ' + moment(date).format('hh:mm A'),
            buttonTextColor: 'yellow'
        });
    };

    showDatePicker = () => {
        this.setState({
            dateBool: true
        })
    };

    render() {
        return (
            <Container>
                <Content>
                    <CardItem>
                        <Card style={{ padding: 0, borderRadius: 8 }}>

                            <CardItem >
                                <TextInput onChangeText={(text) => this.setState({ chalName: text })} style={styles.challName} placeholder="Challenge Name"></TextInput>
                            </CardItem>

                            <CardItem>
                                <Card style={styles.challDesc} >
                                    <TextInput onChangeText={(text) => this.setState({ chalDesc: text })} style={{ fontSize: 16 }} multiline placeholder="Description"></TextInput>
                                </Card>
                            </CardItem>

                            <CardItem style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', marginBottom: 15 }}>
                                <Button style={{ height: 40, width: 230, padding: 23, borderRadius: 8 }} onPress={this.showDatePicker} >
                                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                                        <Text style={{ color: this.state.buttonTextColor, fontSize: 14 }}>{this.state.buttonDisplay}</Text>
                                    </View>
                                </Button>

                                <DateTimePickerModal
                                    minimumDate={Date.now()}
                                    isVisible={this.state.dateBool}
                                    mode="datetime"
                                    onConfirm={this.handleDateConfirm}
                                    onCancel={this.hideDatePicker}
                                />
                            </CardItem>

                        </Card>
                    </CardItem>
                    <CardItem style={{ flexDirection: 'column' }}>
                        <Button onPress={() => {
                            console.log(this.state.deadline)
                            addChallenge(this.state.chalName, this.state.chalDesc, this.props.user.uid,
                                this.state.deadline).then((ref) => console.log("ref = ", ref).catch(error => console.error(error)))
                        }}
                            block >
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


const mapStateToProps = (state) => ({
    user: state.auth.user
})

export default connect(mapStateToProps)(MakeChallScreen)