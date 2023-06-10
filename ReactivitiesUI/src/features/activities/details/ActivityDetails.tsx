import React from 'react';
import { useSelector } from 'react-redux';
import { Button, Card, Image } from 'semantic-ui-react';
import { ActivitiesState } from '../../../redux/reducers/TSactivityReducer';

export default function ActivityDetails() {

    const ActivitiesStateRedux = useSelector<ActivitiesState, ActivitiesState>((state) => state).activityStore;

    const {selectedActivity: activity, openForm, cancelSelectedActivity } = ActivitiesStateRedux;
    
    if(!activity) return null;

    return(
        <Card fluid>
            <Image src ={ `/assets/categoryImages/${activity.category}.jpg`} />
            <Card.Content>
                <Card.Header>{activity.title}</Card.Header>
                <Card.Meta>
                    <span>{activity.date}</span>
                </Card.Meta>
                <Card.Description>
                    {activity.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths='2'>
                    <Button onClick={()=>openForm(activity.id)} basic color='blue' content='Edit'/>
                    <Button onClick={cancelSelectedActivity} basic color='grey' content='Cancel'/>
                </Button.Group>
            </Card.Content>
        </Card>
    )
}