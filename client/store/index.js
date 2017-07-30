import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import users from './users'
import user from './user'
import orders from './orders'
import product from './product'
import review from './review'

const reducer = combineReducers({orders, users, user, product, review})
const middleware = applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
const store = createStore(reducer, middleware)

export default store
export * from './users'
export * from './user'
export * from './orders'
export * from './product'
export * from './review'
