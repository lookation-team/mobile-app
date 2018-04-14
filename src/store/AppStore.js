import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { routerMiddleware, routerReducer } from 'react-router-redux'
import { hashHistory } from 'react-router'
import { HomeReducer, store as HomeReducerStore } from '../home/reducers/HomeReducer'

const router = routerMiddleware(hashHistory)

const enhancer = applyMiddleware(thunk, router, logger)

const AppStore = createStore(combineReducers({
    HomeReducer,
    routing: routerReducer
}), {
    HomeReducer: HomeReducerStore
}, enhancer)

export default AppStore
