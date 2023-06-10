import { bindActionCreators } from "redux"

const initialState = {
    activities: [{
        id: '1',
        title: 'activity test 1',
        date: '15/02/2000',
        description: 'description test 1',
        category: 'category test 1',
        city: 'city test 1',
        venue: 'venue test 1',
    }]
}

export const activityReducer = (state = initialState, {type, data}) => {

    switch(type){

        case 'SET_ACTIVITIES':
            return state;        
        default:
            return state; 
    }


}