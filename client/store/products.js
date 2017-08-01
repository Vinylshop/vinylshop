import axios from 'axios'

const initialState = [
  {
    title: 'Vinylshop',
    description: 'Vinylshop',
    price: '4444',
    quantity: '4444',
    images: 'http://localhost:8080/images/vinlyshoplogo.png'
  }
]

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
export default function reducer (products = initialState, action) {
  switch (action.type) {
    case INITIALIZE:
      return action.products

    case CREATE:
      return [action.product, ...products]

    case UPDATE:
      console.log(products)
      return products.map(product => (
        action.product.id === product.id ? action.product : product
      ))

    case REMOVE:
      return products.filter(product => product.id !== action.id)

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
    .catch(err => console.error('Fetching product unsuccessful', err))
}

export const fetchProduct = (id) => dispatch => {
  axios.get(`/api/products/${id}`)
    .then(res => dispatch(update(res.data)))
    .catch(err => console.error(`Fetching product unsuccessful`, err))
}

export const removeProduct = (id, product) => dispatch => {
  const obj = Object.assign({}, product, {quantity: 0})
  axios.put(`/api/products/${id}`, obj)
    .then(() => dispatch(remove(id)))
    .catch(err => console.error(`Removing product inventory: ${id} unsuccessful`, err))
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
