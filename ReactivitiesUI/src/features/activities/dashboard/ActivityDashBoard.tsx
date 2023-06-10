import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, GridColumn } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import { ActivitiesState } from '../../../redux/reducers/TSactivityReducer';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../forms/ActivityForm';
import ActivityList from './ActivityList';

//why an interface? this is typescript, it is being used to define types for the Props
interface Props {
    activities: Activity[];  
    createOrEdit: (activity: Activity) => void;
    deleteActivity: (id: string) => void;
    submitting: boolean;
}

export default function ActivityDashBoard({activities, createOrEdit, deleteActivity, submitting}: Props ) {

    const ActivitiesStateRedux = useSelector<ActivitiesState, ActivitiesState>((state) => state).activityStore;
    const {selectedActivity, editMode} = ActivitiesStateRedux; //de-estructuring 

    return(
        //Grid splits the screen in 16 columns
        <Grid>
            {/* //lets display the list of activities using 10 out of 16 columns*/}
            <GridColumn width ='10'>
                <ActivityList submitting={submitting}
                />
            </GridColumn>
            {/* lets display the Activity Details and form using the remaining 6 columns of the grid */}
            <GridColumn width ='6'>
                {/* whatever to the right of && and executes only if left side isnt null, used to avoid accesing unloaded data when the component first renders */}
                {selectedActivity && !editMode &&
                <ActivityDetails />}
                {editMode &&
                <ActivityForm 
                    createOrEdit={createOrEdit}
                    submitting={submitting}
                />}
            </GridColumn>
        </Grid>
    )
}