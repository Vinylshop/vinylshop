import axios from 'axios'

/* -----------------    ACTIONS     ------------------ */

const INITIALIZE = 'INITIALIZE_ORDER'
const CREATE = 'CREATE_ORDER'
const REMOVE = 'REMOVE_ORDER'
const UPDATE = 'UPDATE_ORDER'

/* ------------   ACTION CREATORS     ------------------ */

const init = orders => ({type: INITIALIZE, orders})
const create = order => ({type: CREATE, order})
const remove = id => ({type: REMOVE, id})
const update = order => ({type: UPDATE, order})

/* ------------       REDUCER     ------------------ */

export default function reducer (orders = [], action) {
  switch (action.type) {
    case INITIALIZE:
      return action.orders

    case CREATE:
      return [
        action.order, ...orders
      ]

    case REMOVE:
      return orders.filter(order => order.id !== action.id)

    case UPDATE:
      return orders.map(order => (action.order.id === order.id
        ? action.order
        : order))

    default:
      return orders
  }
}

/* ------------   THUNK CREATORS     ------------------ */

export const fetchOrders = () => dispatch => {
  axios.get('/api/orders')
    .then(res => dispatch(init(res.data)))
    .catch(err => console.error(`Fetching users unsuccesful`, err))
}

export const fetchOrder = (id) => dispatch => {
  axios.get(`/api/orders/${id}`)
    .then(res => dispatch(update(res.data)))
    .catch(err => console.error('Fetching order unsuccesful', err))
}

export const removeOrder = id => dispatch => {
  dispatch(remove(id))
  axios.delete(`/api/orders/${id}`)
    .catch(err => console.error(`Removing order: ${id} unsuccesful`, err))
}

export const addOrder = order => dispatch => {
  axios.post('/api/orders', order).then(res => {
    axios.post(`/api/sendEmail/sendInitial`, res.data)
    dispatch(create(res.data))
  }).catch(err => console.error(`Creating order: ${order} unsuccesful`, err))
}

export const updateOrder = (id, orderUp) => dispatch => {
  axios.put(`/api/orders/${id}`, orderUp).then(res => {
    if (orderUp.status) axios.post(`/api/sendEmail/sendUpdate`, res.data)
    return dispatch(update(res.data))
  }).catch(err => console.error(`Updating order: ${update} unsuccesful`, err))
}
