import { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashBoard from '../../features/activities/dashboard/ActivityDashBoard';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';
import { useSelector } from 'react-redux';
import { ActivitiesState } from '../../redux/reducers/TSactivityReducer';

function App() {
//creates an array to hold data for the components to use, check App on google dev tools extension on chrome
//notice how the array created is global variable
  const [activities, setActivities]=useState<Activity[]>([]); //applies chages to DOM
  const [selectedActivity, setSelectedActivity]=useState<Activity | undefined>(undefined); //applies chages to DOM, inicial state is undefined

  const [editMode, setEditMode]=useState<boolean>(false); //applies chages to DOM
  const [submitting, setSubmitting]=useState<boolean>(false); //applies chages to DOM
//

//   useEffect(() => {
//     //centralized requests on agent.ts
//     agent.Activities.list().then(response => {
//     const activities: Activity[] = [];
//     response.forEach(a => {a.date = a.date.split('T')[0];
//     activities.push(a);
//   })  
//     console.log(response)
//     setActivities(activities); //stores retrieved data on activities
//     setLoading(false);
//   })
// },[])

const ActivitiesStateRedux = useSelector<ActivitiesState, ActivitiesState>((state) => state).activityStore;

function handleCreateOrEditAcitivity(activity: Activity) {
  setSubmitting(true);

  if (activity.id) {
    agent.Activities.update(activity).then(()=>{
      setActivities([...activities.filter(a => a.id !== activity.id),activity]);
      setSelectedActivity(activity);
      setEditMode(false);
      setSubmitting(false);
    })
  } else {
    activity.id = uuid();
    agent.Activities.create(activity).then(()=>{
      setActivities([...activities,activity]);
      setSelectedActivity(activity);
      setEditMode(false);
      setSubmitting(false);
    })
  }
}

function handleDeleteActivity(id: string) {
  setSubmitting(true);
  agent.Activities.delete(id).then(()=>{
    setActivities([...activities.filter(a => a.id !== id)])
    setSubmitting(false);
  })
  
}

if (ActivitiesStateRedux.loading) return <LoadingComponent content = 'Loading App' />
////////////
  return (
    // <> shortcut to jsx <Fragment>
    <>
      <NavBar />
      <Container style={{marginTop:'6em'}}>
       <ActivityDashBoard 
          activities={ActivitiesStateRedux.activities}
          createOrEdit={handleCreateOrEditAcitivity}
          deleteActivity ={handleDeleteActivity}
          submitting = {submitting}
          />
      </Container>
    </>
  );
}

export default App;