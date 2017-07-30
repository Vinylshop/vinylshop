import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import users from './users'
import user from './user'
import products from './products'
import orders from './orders'
import review from './review'
import lists from './lists'

const reducer = combineReducers({orders, users, user, products, review, lists})
const middleware = applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
const store = createStore(reducer, middleware)

export default store
export * from './users'
export * from './user'
export * from './products'
export * from './orders'
export * from './review'
export * from './lists'
