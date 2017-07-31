import axios from 'axios'

/* -----------------    ACTION TYPES ------------------ */

const INITIALIZE_USERS = 'INITIALIZE_USERS'
const GET_USER = 'GET_USER'
const CREATE_USER = 'CREATE_USER'
export const REMOVE_USER = 'REMOVE_USER'
const UPDATE_USER = 'UPDATE_USER'

/* ------------   ACTION CREATORS     ------------------ */

export function initUsers (users) {
  const action = { type: INITIALIZE_USERS, users }
  return action
}

export function createUser (user) {
  const action = { type: CREATE_USER, user }
  return action
}

export function removeUser (id) {
  const action = { type: REMOVE_USER, id }
  return action
}

export function updateUser (user) {
  const action = { type: UPDATE_USER, user }
  return action
}

/* ------------       REDUCER     ------------------ */

export default function reducer (users = [], action) {
  switch (action.type) {
    case INITIALIZE_USERS:
      return action.users

    case GET_USER:
      return action.user

    case CREATE_USER:
      return [action.user, ...users]

    case REMOVE_USER:
      return users.filter(user => user.id !== action.id)

    case UPDATE_USER:
      return users.map(user => (
        action.user.id === user.id ? action.user : user
      ))

    default:
      return users
  }
}

/* ------------   THUNK CREATORS     ------------------ */

export const fetchUsers = () => dispatch => {
  axios.get('/api/users')
       .then(res => dispatch(initUsers(res.data)))
}

export const fetchUser = () => dispatch => {
  axios.get(`/api/users/${id}`)
       .then(res => dispatch(getUser(res.data)))
}

// optimistic
export const deleteUser = id => dispatch => {
  dispatch(removeUser(id))
  axios.delete(`/api/users/${id}`)
       .catch(err => console.error(`Removing user: ${id} unsuccesful`, err))
}

export const postUser = user => dispatch => {
  axios.post('/api/users', user)
       .then(res => dispatch(createUser(res.data)))
       .catch(err => console.error(`Creating user: ${user} unsuccesful`, err))
}

export const putUser = (id, user) => dispatch => {
  axios.put(`/api/users/${id}`, user)
       .then(res => dispatch(updateUser(res.data)))
       .catch(err => console.error(`Updating user: ${user} unsuccesful`, err))
}
