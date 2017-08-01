import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addReview } from '../../store'

class ReviewForm extends Component {
  constructor (props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }

  render () {
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
          <span className="glyphicon glyphicon-plus"/>
          Submit Review
        </button>
      </form>
    )
  }

  onSubmit (event) {
    event.preventDefault()
    const review = {
      title: event.target.title.value,
      content: event.target.content.value,
      rating: event.target.rating.value,
      productId: this.props.productId
    }
    console.log(review.productId)
    this.props.addReview(review)
    event.target.title.value = ''
    event.target.content.value = ''
    event.target.rating.value = ''
  }
}

const mapState = null
const mapDispatch = ({addReview})
export default connect(mapState, mapDispatch)(ReviewForm)
