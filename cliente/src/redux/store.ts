import { combineReducers, createStore, applyMiddleware } from 'redux'
import { State } from '../types/storeTypes'
import { CombineReducer } from '../types/storeTypes'
import provinciaReducer from './reducers/ProvinciaReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import VacunaReducer from './reducers/VacunaReducer'

const reducers = combineReducers({
     provincias: provinciaReducer,
     vacunas: VacunaReducer,
     // vacunados: []
})


const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))

export default store