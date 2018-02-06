import {
    GET_PERSIT_DATA_SUCCESS,
    GET_PERSIT_DATA_FAIL
} from '../actions/types';

const INITIAL_STATE = { data: null}
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_PERSIT_DATA_SUCCESS:
            return { ...state, data: action.payload };
        case GET_PERSIT_DATA_FAIL:
            return { ...state, ...INITIAL_STATE };
        default:
            return state;
    }
}