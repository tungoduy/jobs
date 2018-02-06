import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { AppLoading } from 'expo';
import { getPersitData } from '../actions';
import Slide from '../components/Slide';

const SLIDE_DATA = [
    { text: 'Find your desire jobs here.', color: '#03A9F4'},
    //{ text: 'Swipe right for more information', color: '#009688'},
]

class WelcomeScreen extends Component {
    componentWillMount() {
        this.props.getPersitData('fb_token');
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.token) {
            this.props.navigation.navigate('map');
        }
    }

    onSlideComplete = () => {
        this.props.navigation.navigate('auth');
    }
    
    render() {
        if(_.isNull(this.props.token)) {
            return <AppLoading />;
        }

        return (
            <Slide 
                data={SLIDE_DATA}
                onComplete={this.onSlideComplete}
            />
        );
    }
}

const mapStateToProps = ({persitData}) => {
    //console.log(' --- ' + persitData.data);
    return { token: persitData.data };
}

export default connect(mapStateToProps, {getPersitData})(WelcomeScreen);
