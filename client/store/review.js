import axios from 'axios'

/* -----------------    ACTION TYPES ------------------ */

const INITIALIZE = 'INITIALIZE_REVIEWS'
const CREATE = 'CREATE_REVIEW'
const UPDATE = 'UPDATE_REVIEW'
const REMOVE = 'REMOVE_REVIEW'

/* ------------   ACTION CREATORS     ------------------ */

const init = products => ({ type: INITIALIZE, products })
const create = product => ({ type: CREATE, product })
const remove = id => ({ type: REMOVE, id })
const update = product => ({ type: UPDATE, product })

/* ------------       REDUCERS     ------------------ */

export default function reducer (reviews = [], action) {
  switch (action.type) {

    case INITIALIZE:
      return action.reviews

    case CREATE:
      return [action.reviews, ...reviews]

    case REMOVE:
      return reviews.filter(review => review.id !== action.id)

    case UPDATE:
      return reviews.map(review => (
        action.review.id === review.id ? action.review : review
      ))
  }
}

/* ------------   THUNK CREATORS     ------------------ */

export const fetchReviews = () => dispatch => {
  axios.get('/api/reviews')
    .then(res => dispatch(init(res.data)))
    .catch(err => console.error('Fetching reviews unsuccessful', err))
}

export const fetchReview = (id) => dispatch => {
  axios.get(`/api/reviews/${id}`)
    .then(res => dispatch(update(res.data)))
    .catch(err => console.error('Fetching review unsuccessful', err))
}

export const removeReview = id => dispatch => {
  dispatch(remove(id))
  axios.delete(`/api/reviews/${id}`)
    .catch(err => console.error(`Removing review: ${id} unsuccessful`, err))
}

export const addReview = review => dispatch => {
  axios.post('/api/reviews', review)
    .then(res => dispatch(create(res.data)))
    .catch(err => console.error(`Creating review: ${review} unsuccessful`, err))
}

export const updateStory = (id, review) => dispatch => {
  axios.put(`/api/reviews/${id}`, review)
    .then(res => dispatch(update(res.data)))
    .catch(err => console.error(`Updating review: ${review} unsuccessful`, err))
}
