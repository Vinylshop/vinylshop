import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchReviews, addReview } from '../../store/review'
import { fetchProduct, fetchProducts } from '../../store'
import ReviewItem from './ReviewItem'
import ReviewForm from './ReviewForm'

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
  }

  componentWillReceiveProps (newProps) {
    if (newProps.match.params.id !== this.props.match.params.id) {
    }
    this.setState({
      product: newProps.retrievedProduct
    })
  }

  render () {
    const {product, review} = this.state
    const {isLoggedIn, currentUser, products} = this.props
    console.log(isLoggedIn)
    if (!product.id) return <div></div>
    // if(!currentUser.id) return <div/>
    return (
      <div className="container">
        <ul className="list-group">
          {isLoggedIn && <ReviewForm/>}
          {
            this.props.review
              .filter(filteredReview => filteredReview.productId === product.id)
              .map(review => <ReviewItem review={review} key={review.id}/>)
          }
        </ul>
      </div>
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

const mapState = (state, ownProps) => {
  const {products, review, currentUser} = state
  const retrievedProduct = products.find(aProduct => aProduct.id === +ownProps.match.params.id)
  const isLoggedIn = !!currentUser.id
  return {retrievedProduct, review, currentUser, isLoggedIn, products}
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
    addReviewData: (newReview) => {
      dispatch(addReview(newReview))
    }
  }
}

export default connect(mapState, mapDispatch)(ReviewList)
