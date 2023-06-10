import { createStore } from 'redux'
import { TSactivityReducer } from './reducers/TSactivityReducer'

export const TSstore = createStore(TSactivityReducer);  