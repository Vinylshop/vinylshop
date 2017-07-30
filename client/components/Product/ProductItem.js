import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeProduct } from '../../store'

/**
 * COMPONENT
 */
class ProductItem extends Component {
  render () {
    const {product, removeProduct, currentUser} = this.props
    const authorized = currentUser && currentUser.isAdmin

    return (
      <div>
        <Link className="large-font" to={`/products/${product.id}`}>{product.title}</Link>
        {
          authorized ? <button
            className="btn btn-default btn-xs"
            onClick={ () => removeProduct(product.title) }>
          </button>
            : null
        }
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = ({currentUser}) => ({currentUser})
const mapDispatch = {removeProduct}
export default connect(mapState, mapDispatch)(ProductItem)
