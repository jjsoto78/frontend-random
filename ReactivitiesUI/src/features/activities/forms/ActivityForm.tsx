import React, { ChangeEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Form, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import { ActivitiesState } from '../../../redux/reducers/TSactivityReducer';

interface Props {   
    createOrEdit: (activity: Activity) => void;
    submitting: boolean;
}

export default function ActivityForm({createOrEdit,submitting}: Props) {

    const ActivitiesStateRedux = useSelector<ActivitiesState,ActivitiesState>((state) => state).activityStore;

    const {selectedActivity, closeForm} = ActivitiesStateRedux;

    const initialState = selectedActivity ?? { //null coalescent, means if activity is null execute anything to the right of ??
        id: '',
        title: '',
        date: '',
        description: '',
        category: '',
        city: '',
        venue: ''
    }

    const [activity, setActivity] = useState(initialState); //applies chages to DOM


    function handleSubmit() {
        console.log(activity);
        createOrEdit(activity);
    }

    //having React handle changes to the DOM over editing form fields, otherwise DOM is edited manually by input
    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) { //get the event from react, hover over property to check what it takes as parameter if is a function
        const {name, value}=event.target; //destructing the name and value comming from  <Form.Input placeholder='Title' value ={activity.title} name='title'
        //... spread React operator, used to access the object properties
        setActivity({...activity, [name]: value});
    }

    return(
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' value ={activity.title} name='title' onChange={handleInputChange} />
                <Form.TextArea placeholder='Description' value ={activity.description} name='description' onChange={handleInputChange}/>
                <Form.Input placeholder='Category' value ={activity.category} name='category' onChange={handleInputChange}/>
                <Form.Input type='date' placeholder='Date' value ={activity.date} name='date' onChange={handleInputChange}/>
                <Form.Input placeholder='City' value ={activity.city} name='city' onChange={handleInputChange} />
                <Form.Input placeholder='Venue' value ={activity.venue} name='venue' onChange={handleInputChange}/>
                
                <Button loading={submitting} floated='right' positive type ='submit' content = 'submit'/>
                <Button onClick={closeForm} floated='right' type ='button' content = 'Cancel'/>
            </Form>
        </Segment>
    )
}