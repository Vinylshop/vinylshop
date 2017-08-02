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
      <div className='col-md-4'>
        <p className='h4 text-center'>{product.title}</p>
        <Link to={`/products/${product.id}`}>
          <ImageWithStatusText imageUrl={product.images} height={296}/>
        </Link>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = ({currentUser}) => ({currentUser})
const mapDispatch = null

export default connect(mapState, mapDispatch)(ProductCard)
