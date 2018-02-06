import { AsyncStorage } from 'react-native';
import { Permissions, Notifications } from 'expo';
import axios from 'axios';

const PUSH_ENDPOINT = 'http://rallycoding.herokuapp.com/api/tokens'

export default async () => {
    await AsyncStorage.removeItem('pushtoken');
    let previousToken = await AsyncStorage.getItem('pushtoken');
    console.log(previousToken);
    if  (previousToken) {
        return;
    } else {
        let {status} = await Permissions.askAsync(Permissions.REMOTE_NOTIFICATIONS);

        if (status !== 'granted') {
            return;
        }
        
        let pushtoken = await Notifications.getExpoPushTokenAsync();

        let xxx = await axios.post(PUSH_ENDPOINT, { token : { token: pushtoken }, message: 'hello'});
        console.log(xxx);
        AsyncStorage.setItem('pushtoken', pushtoken);
    }
}