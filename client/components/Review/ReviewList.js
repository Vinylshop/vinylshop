import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchReviews, addReview } from '../../store/review'
import { fetchProduct, fetchProducts } from '../../store/product'
import ReviewItem from './ReviewItem'

/* -----------------    COMPONENT     ------------------ */

class ReviewList extends Component {
  constructor (props) {
    super(props)

    this.state = {
      product: {
        id: ''
      },
      review: {
        title: '',
        content: '',
        rating: 0
      }
    }

    this.renderReviewForm = this.renderReviewForm.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount () {
    this.props.fetchReviewsData()
    this.props.fetchProductsData()
  }

  componentWillReceiveProps (newProps) {

    if (newProps.match.params.id !== this.props.match.params.id) {
      this.props.fetchProductsData()
    }
    this.setState({
      product: newProps.retrievedProduct
    })
  }

  render () {
    const { product } = this.state
    console.log(this.props.review)
    return (
      <div className="container">
        <ul className="list-group">
          {this.renderReviewForm()}
          {
            this.props.review
              .filter(filteredReview => filteredReview.productId === product.id)
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
              onChange={ event => this.setState({review: {title: event.target.value}}) }
            />
            <input
              name="content"
              type="text"
              placeholder="Review Content"
              onChange={ event => this.setState({review: {content: event.target.value}}) }
            />
            <select name="rating"
            defaultValue=""
            onChange={ event => this.setState({review: {rating: event.target.value}}) }
            required>
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
          Submit Review
        </button>
      </form>
    )
  }

  onSubmit (event) {
    console.log(event.target.title.value)
    const review = {
      title: event.target.title.value,
      content: event.target.content.value,
      rating: event.target.rating.value,
      productId: this.state.product.id
    }
    this.props.addReviewData(review)
    event.target.title.value = ''
    event.target.content.value = ''
    event.target.rating.value = ''
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({ product, review }, ownProps) => {
  const retrievedProduct = product.find(aProduct => aProduct.id === +ownProps.match.params.id)

  return { retrievedProduct, review }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    fetchReviewsData: () => {
      dispatch(fetchReviews())
    },
    fetchProductData: (ownProps) => {
      const productId = ownProps.match.params.id
      dispatch(fetchProduct(productId))
    },
    fetchProductsData: () => {
      dispatch(fetchProducts())
    },
    addReviewData: (newReview) => {
      dispatch(addReview(newReview))
    }
  }
}

export default connect(mapState, mapDispatch)(ReviewList)
