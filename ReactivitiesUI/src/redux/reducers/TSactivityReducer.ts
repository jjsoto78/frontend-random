import { act } from "react-dom/test-utils";
import ActivityStore from "../../activityStore";
import { Activity } from "../../app/models/activity";

// export interface ActivitiesState {
//     activities: Activity[],
// };

// const initialState = {
//     //activities: []
//     activities: [{
//         id: '1',
//         title: 'activity test 1',
//         date: '15/02/2000',
//         description: 'description test 1',
//         category: 'category test 1',
//         city: 'city test 1',
//         venue: 'venue test 1',
//     }]
// };

// const initialActivityStore = new ActivityStore();
//initialActivityStore.loadActivities();

export interface ActivitiesState {
    activityStore: ActivityStore,
};

const initialState = {
    activityStore: new ActivityStore(),
};





type Action = {type: 'LOAD_ACTIVITIES', payload: Activity}

export const TSactivityReducer = (state: ActivitiesState = initialState, action: Action) => {

    switch (action.type) {

        case 'LOAD_ACTIVITIES': {
            return { ...state, activities: [...state.activityStore.activities, action.payload] };
        }

        default:
            return state;
    }

}