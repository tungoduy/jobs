import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import { connect } from 'react-redux';
import { MapView } from 'expo';
import { Button, Card } from 'react-native-elements';
import { likeJob } from '../actions';

import Swipe from '../components/Swipe';

class DeckScreen extends Component {
    static navigationOptions = {
        title: 'Jobs',
        tabBarIcon: ({ tintColor }) => {
                return <Icon name='description' size={20} color={tintColor} />;
        }
    }

    componentDidMount() {
        console.log('------ componentDidMount - DeckScreen');
    }

    renderCard(job) {

        const initialRegion = {
            latitude: job.latitude,
            longitude: job.longitude,
            latitudeDelta: 0.045,
            longitudeDelta: 0.02,
        }

        return (
            <Card title={job.jobtitle} >
                <View style={{ height: 300 }}>
                    <MapView 
                        style={{ flex: 1 }}
                        scrollEnabled={false}
                        cacheEnabled={ Platform.OS === 'android' ? true : false }
                        initialRegion={initialRegion}
                    />
                </View>
                <View style={styles.wrapperStyle}>
                    <Text>{job.company}</Text>
                    <Text>{job.formattedRelativeTime}</Text>
                </View>
                <Text>{job.snippet.replace(/<b>/g,''.replace(/<\/b>/g, ''))}</Text>
            </Card>
        );
    }

    renderNoMoreCards = () => {
        return (
            <Card title='No more jobs'>
                <Button
                    large
                    icon={{ name: 'my-location'}}
                    backgroundColor='#008866'
                    title='Back to map'
                    onPress={() => this.props.navigation.navigate('map')}
                />
            </Card>
        );
    }

    render() {
        return (
            <View style={{ marginTop: 15 }}>
                <Swipe
                    data={this.props.jobs}
                    renderCard={this.renderCard}
                    keyProp='jobkey'
                    onSwipeRight={(job) => this.props.likeJob(job)}
                    renderNoMoreCards={this.renderNoMoreCards}
                />
            </View>
        );
    }
}

const styles = {
    wrapperStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10
    }
}

const mapStateToProps = ({ jobs, likeJobs }) => {
    //console.log(likeJobs);
    return { jobs: jobs.results };
}

export default connect(mapStateToProps, { likeJob })(DeckScreen);
