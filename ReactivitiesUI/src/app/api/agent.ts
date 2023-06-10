//this file is intended to contain all requests to API backend
import axios, { AxiosResponse } from 'axios';
import { Activity } from '../models/activity';

//adding some delay to mock production enviroment
const sleep = (delay: number) =>{
    return new Promise((resolve) =>{
        setTimeout(resolve,delay)
    })
}
//axios interceptors do something over recieving a response
axios.interceptors.response.use(async response => {
    try {
        await sleep(1000);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
})

axios.defaults.baseURL = 'http://localhost:5000/api';

const responseBody = <T>(response: AxiosResponse<T>) => response.data; //data holds the array of activities

const requests = {
    get:  <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url,body).then(responseBody), //{} is type object in jsx
    put:  <T>(url: string, body: {}) => axios.put<T>(url,body).then(responseBody),
    del:  <T>(url: string) => axios.delete<T>(url).then(responseBody)
}

const Activities = {
    list: () => requests.get<Activity[]>('/activities'),
    details: (id: string) => requests.get<Activity>(`/activities/${id}`),
    create: (activity: Activity) => requests.post<void>(`/activities`,activity),
    update: (activity: Activity) => requests.put<void>(`/activities/${activity.id}`,activity),
    delete: (id: string) => requests.del<Activity>(`/activities/${id}`),
}

const agent = {
    Activities
}

export default agent; //make it available globallly to react components