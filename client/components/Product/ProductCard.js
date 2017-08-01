import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import ImageWithStatusText from '../Utils/ImageWithStatusText'
import { removeProduct } from '../../store'

/**
 * COMPONENT
 */
class ProductItem extends Component {
  render () {
    const {product} = this.props
    return (
      <div>
        <div className="card card-outline-secondary">
          <div className="card-block">{product.title}</div>
          <Link to={`/products/${product.id}`}>
            <ImageWithStatusText imageUrl={product.images} height={318}/>
          </Link>
        </div>
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
