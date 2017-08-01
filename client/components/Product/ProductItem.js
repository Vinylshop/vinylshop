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
    // const authorized = currentUser && currentUser.isAdmin

    return (
      <div>
        <Link className="large-font" key={this.props.productId} to={`/products/${product.id}`}>{product.title}</Link>
        {
          <button
            className="btn btn-default btn-xs"
            onClick={ () => removeProduct(product.id, product) }>
            X
          </button>
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
