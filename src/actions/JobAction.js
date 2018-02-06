import reverseGeocode from 'latlng-to-zip';
import axios from 'axios';
import qs from 'qs';
import {
 FETCH_JOBS,
 LIKE_JOB,
 DELETE_LIKED_JOBS
} from './types';

import fakeData from './fakeData.json';

const JOB_ROOT_URL = 'http://api.indeed.com/ads/apisearch?';
const JOB_QUERY_PARAMS = {
    publisher: '4201738803816157',
    format: 'json',
    v: '2',
    latlong: 1,
    radius: 100,
    q: 'javascript'
}

const buildJobUrl = (zipcode) => {
    const query = qs.stringify({ ...JOB_QUERY_PARAMS, l: zipcode });
    return `${JOB_ROOT_URL}${query}`;
}

export const fetchJobs = (region, callback) => async (dispatch) => {

    // For testing only
    console.log('---- fetchJobs ---- ');
    dispatch({ type: FETCH_JOBS, payload: fakeData });
    callback();

    // try {
    //     //console.log(region);
    //     let zipcode = await reverseGeocode(region);
    //     const url = buildJobUrl(zipcode);
    //     let { data } = await axios.get(url);
    //     //console.log(data);
    //     dispatch({ type: FETCH_JOBS, payload: data });
    //     callback();
    // } catch (err) {
    //     console.error(err);
    // }
}

export const likeJob = (job) => {
    return {
        type: LIKE_JOB,
        payload: job
    }
}

export const deleteLikedJobs = () => {
    return {
        type: DELETE_LIKED_JOBS
    }
}