import axios from 'axios'

/**
 * ACTION TYPES
 */
const INITIALIZE = 'INITIALIZE_PRODUCTS'
const CREATE = 'CREATE_PRODUCT'
const UPDATE = 'UPDATE_PRODUCT'
const REMOVE = 'REMOVE_PRODUCT'

/**
 * ACTION CREATORS
 */
const init = products => ({type: INITIALIZE, products})
const create = product => ({type: CREATE, product})
const update = product => ({type: UPDATE, product})
const remove = id => ({type: REMOVE, id})

/**
 * REDUCERS
 */
export default function reducer (products = [], action) {
  switch (action.type) {
    case INITIALIZE:
      return action.products

    case CREATE:
      return action.product

    case UPDATE:
      return action.update

    case REMOVE:
      return action.update

    default:
      return products
  }
}

/**
 * THUNK CREATORS
 */

export const fetchProducts = () => dispatch => {
  axios.get(`/api/products`)
    .then(res => dispatch(init(res.data)))
    .catch(err => console.error('Fetching Product unsuccessful', err))
}

export const fetchProduct = (id) => dispatch => {
  axios.get(`/api/products/${id}`)
    .then(res => dispatch(create(res.data)))
    .catch(err => console.error(`Fetching product unsuccessful`, err))
}

export const removeProduct = (id) => dispatch => {
  dispatch(remove(id))
  axios.delete(`/api/products/${id}`)
    .catch(err => console.error(`Removing product: ${id} unsuccessful`, err))
}

export const addProduct = (product) => dispatch => {
  axios.post(`/api/products`, product)
    .then(res => dispatch(create(res.data)))
    .catch(err => console.error(`Creating product: ${product} unsuccessful`, err))
}

export const updateProduct = (id, product) => dispatch => {
  axios.put(`/api/products/${id}`, product)
    .then(res => dispatch(update(res.data)))
    .catch(err => console.error(`Updating product: ${id} unsuccessful`, err))
}
