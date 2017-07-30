import axios from 'axios'

// ACTION TYPES
const INITIALIZE = 'INITIALIZE_LISTS'
const CREATE = 'CREATE_LIST'
const REMOVE = 'REMOVE_LIST'
const UPDATE = 'UPDATE_LIST'

// ACTIONS
const init = lists => ({type: INITIALIZE, lists})
const create = list => ({type: CREATE, list})
const update = list => ({type: UPDATE, list})
const remove = id => ({type: REMOVE, id})

// REDUCERS
export default function reducer (lists = [], action) {
  switch (action.type) {
    case INITIALIZE:
      return action.lists

    case CREATE:
      return [action.list, ...lists]

    case UPDATE:
      return lists.map(list => (
        action.list.id === list.id ? action.list : list
      ))

    case REMOVE:
      return lists.filter(list => list.id !== action.id)

    default:
      return lists
  }
}

// THUNK CREATORS
export const fetchLists = () => dispatch => {
  axios.get(`/api/lists`)
    .then(res => dispatch(init(res.data)))
    .catch(err => console.error('Fetching List unsuccessful', err))
}

export const fetchList = (id) => dispatch => {
  axios.get(`/api/lists/${id}`)
    .then(res => dispatch(update(res.data)))
    .catch(err => console.error(`Fetching List unsuccessful`, err))
}

export const removeList = (id) => dispatch => {
  dispatch(remove(id))
  axios.delete(`/api/lists/${id}`)
    .catch(err => console.error(`Removing List: ${id} unsuccessful`, err))
}

export const addList = (list) => dispatch => {
  axios.post(`/api/lists`, list)
    .then(res => dispatch(create(res.data)))
    .catch(err => console.error(`Creating List: ${list} unsuccessful`, err))
}

export const updateList = (id, list) => dispatch => {
  axios.put(`/api/lists/${id}`, list)
    .then(res => dispatch(update(res.data)))
    .catch(err => console.error(`Updating List: ${id} unsuccessful`, err))
}
