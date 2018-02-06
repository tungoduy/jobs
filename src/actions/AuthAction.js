import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';
import {
    FACEBOOK_LOGIN_FAIL,
    FACEBOOK_LOGIN_SUCCESS
} from './types';

export const facebookLogin = () => {
    //console.log('-- facebookLogin');
    return async (dispatch) => {
        // Check existing token
        let token = await AsyncStorage.getItem('fb_token');
        if (token) {
            dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
        } else {
            doFacebookLogin(dispatch);
        }        
    }
}

const doFacebookLogin = async (dispatch) => {
    let { type, token } = await Facebook.logInWithReadPermissionsAsync('2051499335121825', {
        permissions: ['public_profile']
    });
    
    //console.log('-- facebookLogin - TYPE: ' + type);

    if (type == 'cancel') {
        dispatch({ type: FACEBOOK_LOGIN_FAIL });
    }
    
    await AsyncStorage.setItem('fb_token', token);

    //console.log('-- facebookLogin - TOKEN: ' + token);
    dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
}