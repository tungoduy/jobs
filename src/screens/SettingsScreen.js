import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { deleteLikedJobs } from '../actions';

class SettingsScreen extends Component {
    static navigationOptions = {
        title: 'Settings'
    }

    render() {
        const messgae = 'Are you sure to delete all liked jobs ?';
        return (
            <View>
                <Card title={messgae} >
                    <Button 
                        title='Delete'
                        onPress={this.props.deleteLikedJobs}
                        backgroundColor='#009966'
                    />
                </Card>
            </View>
        );
    }
}

export default connect(null, { deleteLikedJobs })(SettingsScreen);
