import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { addReview } from '../store/review'
import ReviewItem from './ReviewItem'
import ProductItem from '../Product/ProductItem'

/* -----------------    COMPONENT     ------------------ */

<<<<<<< HEAD
=======
// dummyData
let testReviews = [
  {
    id: 1,
    title: 'Test Review 1',
    content: 'This is the content for Review 1',
    rating: 4
  },
  {
    id: 2,
    title: 'Test Review 2',
    content: 'This is the content for Review 2',
    rating: 2
  }
]

>>>>>>> 52c47780d68509a710957079f4ffb89fec68fb7a
export class ReviewList extends Component {
  constructor (props) {
    super(props)

    this.renderReviewForm = this.renderReviewForm.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.filterReview = this.filterReview.bind(this)
  }

  render () {
    const { products } = this.props
    return (
      <div className="container">
        <ul className="list-group">
          {this.renderReviewForm()}
          {
            this.props.reviews
              .filter(review => review.productId === products.id)
              .map(review => <ReviewItem review={review} key={review.id} />)
          }
        </ul>
      </div>
    )
  }

  renderReviewForm () {
    return (
      <form onSubmit={this.onSubmit}>
        <ul className="list-inline">
          <li>
            <input
              name="title"
              type="text"
              placeholder="Review Title"
            />
            <input
              name="content"
              type="text"
              placeholder="Review Content"
            />
            <select name="rating" defaultValue="" required>
              <option value="" disabled>(Select a Rating)</option>
              <option key='1' value="1">1</option>
              <option key='2' value="2">2</option>
              <option key='3' value="3">3</option>
            </select>
          </li>
        </ul>
        <button
          type="submit"
          className="btn btn-warning btn-xs">
          <span className="glyphicon glyphicon-plus" />
        </button>
      </form>
    )
  }

  onSubmit (event) {
    event.preventDefault()
    const review = {
      title: event.target.title.value,
      content: event.target.content.value,
      rating: event.target.rating.value
    }
    event.target.title.value = ''
    event.target.content.value = ''
    event.target.rating.value = ''
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({ products, reviews }) => ({ products, reviews })

const mapDispatch = { addReview }

export default connect(mapState, mapDispatch)(ReviewList)
