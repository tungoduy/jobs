import { AsyncStorage } from 'react-native';
import {
    GET_PERSIT_DATA_SUCCESS,
    GET_PERSIT_DATA_FAIL
} from './types';

export const getPersitData = (key) => {
    return async (dispatch) => {
        try {
            let result = await AsyncStorage.getItem(key);
            dispatch({ type: GET_PERSIT_DATA_SUCCESS, payload: result })
        } catch (err) {
            dispatch({ type: GET_PERSIT_DATA_FAIL })
        }
        
    }
}
