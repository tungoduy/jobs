import _ from 'lodash';
import { REHYDRATE } from 'redux-persist/es/constants';
import {
    LIKE_JOB,
    DELETE_LIKED_JOBS
} from '../actions/types';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case REHYDRATE:
            return action.payload.likedJobs || INITIAL_STATE;
        case LIKE_JOB:
            return _.uniqBy([action.payload, ...state], 'jobkey');
        case DELETE_LIKED_JOBS:
            return INITIAL_STATE;
        default:
            return state;
    }
}