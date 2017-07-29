import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeProduct } from '../../store/product'

/**
 * COMPONENT
 */
class ProductItem extends Component {
  render () {
    const {product, removeProduct, currentUser} = this.props
    const authorized = currentUser && currentUser.isAdmin

    return (
      <li className="list-group-item product-item">
        <ul className="list-inline">
          <Link className="large-font" to={`/api/products/${product.id}`}>{product.title}</Link>
        </ul>
        {
          authorized ? <button
            className="btn btn-default btn-xs"
            onClick={ () => removeProduct(product.id) }>
          </button>
            : null
        }
      </li>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = ({currentUser}) => ({currentUser})
const mapDispatch = {removeProduct}
export default connect(mapState, mapDispatch)(ProductItem)
