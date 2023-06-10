import { combineReducers } from 'redux';
import {activityReducer} from './activityReducer';

const reducers = combineReducers({
    allActivities: activityReducer,
    //TODO add more reduers to combine
});

export default reducers;