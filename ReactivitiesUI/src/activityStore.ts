import agent from "./app/api/agent";
import { Activity } from "./app/models/activity";
import {v4 as uuid} from 'uuid';

export default class ActivityStore {
    
    activities: Activity[] =[];

    //activityRegistry = new Map<string, Activity>(); //using js Map object instead of array

    selectedActivity: Activity | undefined; //an object either an Activity or undefined type
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        this.loadActivities();   
    }
    
    //computed value
    get activitiesByDate() {
        return Array.from(this.activities.values()).sort((a,b) => Date.parse(a.date) - Date.parse(b.date))
    }
    // //Mobx using arrow function to automaticaly bind such function to observable class ActivityStore
    loadActivities = async () => { //async in js is sintaxis sugar for promises

        this.setLoadingInitial(true); //updates ActivityStore.loadingInitial changes go through React and changes React state      
        const activitiesRequest = await agent.Activities.list();

        try {
            const activitiesRequest = await agent.Activities.list();

            activitiesRequest.forEach(a => {
                a.date = a.date.split('T')[0];
                //this.activities.set(a.id, a);
                this.activities.push(a);
            });// populates this.activities with request data

            this.setLoadingInitial(false);

        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }

    }

    setLoadingInitial =  (state: boolean) => { // instead of using mobx runInAction on async calls
        this.loadingInitial= state;
    }

    selectActivity = (id: string) => {
        this.selectedActivity = this.activities.find(a => a.id === id);    
        //this.selectedActivity = this.activities.get(id);
    }

    cancelSelectedActivity =() =>{
        this.selectedActivity = undefined;
    }

    openForm = (id?: string) =>{
        id ? this.selectActivity(id): this.cancelSelectedActivity();
        this.editMode = true;
    }

    closeForm = () => {
        this.editMode = false;
    }

    createActivity = async (activity: Activity) => {
        this.loading = true;
        activity.id = uuid(); //creating new guid for new activity

        try {
            await agent.Activities.create(activity);

            this.activities.push(activity);
            //this.activities.set(activity.id, activity);
            this.selectedActivity = activity;
            this.editMode = false;
            this.loading = false;

        } catch (error) {
            console.log(error);

            this.loading = false;
        }
    }

    //
    updateActivity = async (activity: Activity) => {
        this.loading = true;

        try {
            await agent.Activities.update(activity);

            this.activities.filter(a => a.id !== activity.id);// bellow is cleaner way 
            this.activities.push(activity); 
            this.activities = [...this.activities.filter(a => a.id !== activity.id), activity];

            //using Map js object instead
            // this.activityRegistry.set(activity.id, activity);
            // this.selectedActivity = activity;
            // this.editMode = false;
            // this.loading = false;

        } catch (error) {
            console.log(error);
            this.loading = false;
        }

    }

    deleteActivity = async (id: string) => {
        this.loading = true;
        try {
            await agent.Activities.delete(id);
            this.activities = [...this.activities.filter(a => a.id !== id)];
            //this.activityRegistry.delete(id);
            if (this.selectedActivity?.id === id) this.cancelSelectedActivity();
            this.loading = false;
        } catch (error) {
            console.log(error);
            this.loading = false;
        }
    }
}