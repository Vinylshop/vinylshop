import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import ContentEditable from 'react-contenteditable'
import { updateReview, fetchReview } from '../../store/review'

/* -----------------    COMPONENT     ------------------ */

class ReviewDetail extends Component {
  constructor (props) {
    super(props)

    this.state = {
      review: {
        title: '',
        content: '',
        rating: 0,
        id: ''
      }
    }
  }

  componentDidMount () {
    this.props.fetchReviewData()
  }

  componentWillReceiveProps (newProps) {

    if (newProps.match.params.id !== this.props.match.params.id) {
      this.props.fetchReviewData()
    }

    this.setState({
      review: newProps.retrievedReview
    })
  }

  render () {
    return (
      <div>
      </div>
    )
  }

  onSubmit (event) {
    event.preventDefault()
    const review = {
      title: event.target.review.value,
      content: event.target.content.value,
      rating: event.target.rating.value
    }
    const id = this.state.review.id
    this.props.debouncedUpdateReview(id, review)
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({ user, review }, ownProps) => {
  const retrievedReview = review.find(aReview => aReview.id === +ownProps.match.params.id)
  return { retrievedReview, user }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    debouncedUpdateReview: _.debounce((...args) => {
      dispatch(updateReview(...args))
    }, 500),

    fetchStoryData: () => {
      const reviewId = ownProps.match.params.id
      dispatch(fetchReview(reviewId))
    }
  }
}

export default connect(mapState, mapDispatch)(ReviewDetail)
