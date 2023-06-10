import React, { SyntheticEvent, useState } from 'react';
import {  useSelector } from 'react-redux';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { ActivitiesState } from '../../../redux/reducers/TSactivityReducer';

//why an interface? this is typescript, it is being used to define types for the Props
interface Props {
    // activities: Activity[];
    // selectActivity: (id: string) => void; //property is a function, being passed down, define its parameters and return type
    // deleteActivity: (id: string) => void;
    submitting: boolean;
}
// ({activities,selectActivity}: Props) called deEstructuring the properties, 
// meaning the data from such variables defined in the Props Interface for such component,
// as method parameters and passed down to this instace over some other jsx markup ActivityDashBoard-- <ActivityList activities={activities} selectActivity={selectActivity} />
export default function ActivityList ({submitting}: Props) {
    
    const [target, setTarget]=useState(''); //applies chages to DOM
    // semantic ui events come from SyntheticEvent React 
    function handleActivityDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name); //target matches the name for the button
        ActivitiesStateRedux.deleteActivity(id); //thanks to hoisting
    }

    //test redux state access
    // type RootState = ReturnType<typeof store.getState>;
    // type DefaultRootState = ReturnType<typeof store.getState>; 

    //const activitiesRedux = useSelector<ActivitiesState,ActivitiesState>((state) => state).activityStore.activities;
   // console.log(activitiesRedux); //shows up as an arbitrary object in console
   //activities = activitiesRedux; 
    const ActivitiesStateRedux = useSelector<ActivitiesState,ActivitiesState>((state) => state).activityStore;

    return(
        <Segment>
            <Item.Group divided>
                {ActivitiesStateRedux.activities.map(activity =>( //lets iterate through activities returning such jsx
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as ='a'> {activity.title} </Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city},{activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                {/* ()=>selectActivity(activity.id) to prevent function execution on comoonent render */}
                                <Button onClick={()=>ActivitiesStateRedux.selectActivity(activity.id)} floated='right' content='View' color='blue' />
                                <Button
                                    name= {activity.id} 
                                    loading={submitting && target=== activity.id} 
                                    onClick={(e)=>handleActivityDelete(e,activity.id)} 
                                    floated='right' 
                                    content='Delete' 
                                    color='red' 
                                />
                                <Label basic content={activity.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}