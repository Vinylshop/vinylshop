import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import ImageWithStatusText from '../Utils/ImageWithStatusText'
import { removeProduct } from '../../store'

/**
 * COMPONENT
 */
class ProductCard extends Component {
  render () {
    const {product} = this.props
    return (
      <div className='col-lg-4'>
        <h3 className='display-5'>{product.title}</h3>
        <Link to={`/products/${product.id}`}>
          <ImageWithStatusText imageUrl={product.images} />
        </Link>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = ({currentUser}) => ({currentUser})
const mapDispatch = {removeProduct}
export default connect(mapState, mapDispatch)(ProductCard)
