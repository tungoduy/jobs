import React, { Component } from 'react';
import { View, Text, ActivityIndicator, Dimensions } from 'react-native';
import { MapView } from 'expo';
import { Button, Icon } from 'react-native-elements';
import { connect } from 'react-redux';

import { fetchJobs } from '../actions';

const SCREEEN_WIDTH = Dimensions.get('window').width;

class MapScreen extends Component {
    static navigationOptions = {
        title: 'Map',
        tabBarIcon: ({ tintColor }) => {
                return <Icon name='my-location' size={20} color={tintColor} />;
        }
    }

    state = {
        mapLoaded: false,
        region: {
            latitude: 37,
            longitude: -122,
            latitudeDelta: 0.09,
            longitudeDelta: 0.04,
        }
    }

    componentDidMount() {
        this.setState({ mapLoaded: true });
    }

    onRegionChangeComplete = (region) => {
        //console.log(region);
        this.setState({ region });
    }

    onSearchJobs = () => {
        this.props.fetchJobs(this.state.region, () => {
            this.props.navigation.navigate('deck');
        });
    }

    render() {
        if (!this.state.mapLoaded) {
            //console.log(' map NOT Loaded ');
            return (
                <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'black'}} >
                    <ActivityIndicator large />
                </View>  
            );
        }

        //console.log(' map IS Loaded ');

        return (
            <View style={{ flex: 1 }}>
                <MapView 
                    style={{ flex: 1 }} 
                    region={this.state.region}
                    initialRegion={this.state.region}
                    onRegionChangeComplete={this.onRegionChangeComplete}
                />
                <View style={styles.buttonContainer} >
                    <Button 
                        title='Search Nearby Jobs'
                        onPress={this.onSearchJobs}
                        backgroundColor='#009988'
                        icon={{ name: 'search' }}
                        large
                    />
                </View>
            </View>
        );
    }
}

const styles = {
    buttonContainer: {
        position: 'absolute',
        bottom: 25,
        width: SCREEEN_WIDTH
    }
}

export default connect(null, { fetchJobs })(MapScreen);
