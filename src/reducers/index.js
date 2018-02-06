import { combineReducers } from 'redux';
import auth from './AuthReducer';
import PersitDataReducer from './PersitDataReducer';
import jobs from './JobReducer';
import likedJobs from './LikeJobReducer';

export default combineReducers({
    auth,
    persitData: PersitDataReducer,
    jobs,
    likedJobs
})