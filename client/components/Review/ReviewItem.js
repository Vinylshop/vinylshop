import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

/* -----------------    COMPONENT     ------------------ */

export default class ReviewItem extends Component {
  render() {

    const {review} = this.props
    return(
      <li>
        {review.title}
      </li>
    )
  }
}
