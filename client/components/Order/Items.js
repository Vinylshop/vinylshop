import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

/* -----------------    COMPONENT     ------------------ */

class Items extends Component {
  render () {
    const { item } = this.props

    return (
      <ul className='list-group'>
        <li className='list-group-item'>
          <Link to={`/products/${item.productId}`}>{item.product ? item.product.title : item.productname }</Link>
        </li>
        <li>
          <span>Quantity: {item.quantity}</span>
        </li>
        <li>
          <span>Price: {item.price}</span>
        </li>
        <li>
          <span>Item total: {item.quantity * item.price}</span>
        </li>
      </ul>
    )
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = null
const mapDispatch = null

export default connect(mapState, mapDispatch)(Items)
