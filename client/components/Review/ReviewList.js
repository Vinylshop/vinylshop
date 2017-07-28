import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import ReviewItem from './ProductItem'

/* -----------------    COMPONENT     ------------------ */

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

class ReviewList extends Component {
  constructor (props) {
    super(props)
  }

  render() {
    return (
      <div className="container">
        <ul className="list-group">
          {
            testReviews
              .map(review => <ReviewItem review={review} key={review.id} />)
          }
        </ul>
      </div>
    )
  }


}
