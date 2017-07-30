import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

/* -----------------    COMPONENT     ------------------ */

export default class ReviewItem extends Component {
  render () {
    const { review } = this.props
    return (
      <ul>
        <li>
          Review Title:
          <br />
          {review.title}
        </li>
        <li>
          Review Content:
          <br />
          {review.content}
        </li>
        <li>
          Review Rating: {review.rating}
        </li>
        <li>
          By Customer:
        </li>
        <br />
        <br />
      </ul>
    )
  }
}
