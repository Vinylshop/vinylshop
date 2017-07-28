import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import ReviewItem from './ProductItem'


/* -----------------    COMPONENT     ------------------ */

class ReviewList extends Component {
  constructor (props) {
    super(props)

    this.state = {
      title: '',
      content: '',
      rating: []
    }
  }
}
