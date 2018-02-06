import {
    FACEBOOK_LOGIN_FAIL,
    FACEBOOK_LOGIN_SUCCESS
} from '../actions/types';

const INITIAL_STATE = { token: ''}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FACEBOOK_LOGIN_SUCCESS:
            //console.log(FACEBOOK_LOGIN_SUCCESS);
            return { ...state, token: action.payload };
        case FACEBOOK_LOGIN_FAIL:
            //console.log(FACEBOOK_LOGIN_FAIL);
            return { ...state, ...INITIAL_STATE };
        default:
            //console.log('Default');
            return state;
    }
}