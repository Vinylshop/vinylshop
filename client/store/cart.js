'use strict'
import axios from 'axios'

const initialState = {
  total: 0,
  items: []
}

const INIT = 'INITIALIZE_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_CART = 'DELETE_CART'

const init = cart => ({type: INIT, cart})
const add = item => ({type: ADD_TO_CART, item})
const del = cart => ({type: REMOVE_CART, cart})

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case INIT:
      return action.cart
    case ADD_TO_CART:
      return Object.assign({}, state, {items: [action.item, ...state.items]})
    case REMOVE_CART:
      return Object.assign({}, state)
    default:
      return state
  }
}

export const fetchCart = () => dispatch => {
  axios.get(`/api/cart/`)
    .then(res => dispatch(init(res.data)))
    .catch(err => console.error('Fetching cart unsuccessful', err))
}

export const addToCart = (itemToAdd) => dispatch => {
  console.log(itemToAdd)
  axios.put(`/api/cart/addItem`, itemToAdd)
    .then(res => dispatch(add(res.data)))
    .catch(err => console.error('Adding item to cart', err))
}

export const removeCart = () => dispatch => {
  axios.delete(`/cart`)
    .then(res => dispatch(del(res.data)))
    .catch(err => console.error('Removing cart', err))
}