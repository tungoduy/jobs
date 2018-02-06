import React, { Component } from 'react';
import { View, Text, Platform, ScrollView, Linking } from 'react-native';
import { Button, Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { MapView } from 'expo';

class ReviewScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Review jobs',
        tabBarIcon: ({ tintColor }) => {
            return <Icon name='favourit' size={20} color={tintColor} />;
        },
        headerRight: (
            <Button 
                title='Settings' 
                onPress={() => navigation.navigate('settings')}
                backgroundColor='rgba(0,0,0,0)'
                color='rgba(0, 122, 255, 1)'
            />
        ),
        headerStyle: {
            marginTop: Platform.OS === 'android' ? 0 : 0, 
        },
    })


    renderCards() {
        return this.props.likedJobs.map((job, index) => {
            const { company, jobtitle, formattedRelativeTime, latitude, longitude, jobkey, url } = job;
            const initialRegion = {
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 0.045,
                longitudeDelta: 0.02,
            }
            return (
                <Card key={jobkey} title={jobtitle}>
                    <View  style={{height: 200}}>
                        <MapView
                            initialRegion={initialRegion}
                            style={{ flex: 1 }}
                            scrollEnabled={false}
                            cacheEnabled={ Platform.OS === 'android'}
                        />
                        <View style={styles.detailWrapperStyle}>
                            <Text style={styles.italics}>{company}</Text>
                            <Text style={styles.italics}>{formattedRelativeTime}</Text>
                        </View>
                        <Button 
                            title="Apply Now"
                            onPress={() => Linking.openURL(url)}
                            backgroundColor='#009966'
                        />
                    </View>
                </Card>
            );
        })
    }

    render() {
        return (
            <ScrollView>
                {this.renderCards()}
            </ScrollView>
        );
    }
}

const styles = {
    detailWrapperStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        marginBottom: 10
    },
    italics: {
        fontStyle: 'italic'
    }
}

const mapStateToProps = (state) => {
    return { likedJobs: state.likedJobs }
}

export default connect(mapStateToProps)(ReviewScreen);
