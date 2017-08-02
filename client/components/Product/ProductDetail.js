import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { updateProduct, fetchProduct } from '../../store'
import ImageWithStatusText from '../Utils/ImageWithStatusText'
import ReviewItem from '../Review/ReviewItem'
import CartBuyButton from '../Utils/CartBuyButton'

/**
 * COMPONENT
 */

class ProductDetail extends Component {
  constructor (props) {
    super(props)

    this.state = {
      product: {
        title: '',
        description: '',
        price: '',
        quantity: '',
        images: ''
      }
    }
    this.onProductUpdate = this.onProductUpdate.bind(this)
    this.renderProductDetailForm = this.renderProductDetailForm.bind(this)
    this.renderProductDetail = this.renderProductDetail.bind(this)
    this.renderProductImage = this.renderProductImage.bind(this)
    this.renderProductMainTitle = this.renderProductMainTitle.bind(this)
    this.renderProductDescription = this.renderProductDescription.bind(this)
    this.renderProductReviews = this.renderProductReviews.bind(this)
  }

  componentDidMount () {
    this.props.fetchProductData()
  }

  componentWillReceiveProps (newProps) {
    if (newProps.match.params.id !== this.props.match.params.id) {
      this.props.fetchProductData()
    }

    this.setState({
      product: newProps.product
    })
  }

  /**
   *   PRODUCT DETAIL COMPONENT
   *
   *****************************************************/
  render () {
    const {product} = this.state
    const {currentUser, isLoggedIn} = this.props
    return (
      <div className="container">
        <div className="row heading text-center">
          <h3 className='display-5'>PRODUCT DETAILS</h3>
        </div>

        <div className="row separator"/>
        <div className="row">
          <div className='col-xs-6 col-xs-offset-3'>
            {isLoggedIn && currentUser.isAdmin && this.renderProductDetailForm()}
          </div>
        </div>
        <div>
          <div className="row">
            <div className="col-xs-5">
              {this.renderProductImage()}
            </div>
            <div className="row">
              <div className="col-xs-7">
                {this.renderProductDetail()}
                ${product.price}
                <CartBuyButton productId={product.id} price={product.price} productname={product.title}/>
                <hr/>
              </div>
              {this.renderProductDescription()}
              {this.renderProductReviews()}
            </div>
          </div>
        </div>

      </div>
    )
  }

  /*****************************************************/

  renderProductDetail () {
    const {product} = this.state
    if (!product) return <div/>
    return (
      <div>
        {this.renderProductMainTitle()}
      </div>
    )
  }

  renderProductMainTitle () {
    const {product} = this.state
    if (!product || !product.images) return <div/>
    return ( <h3 className="display-5">{product.title}</h3> )
  }

  renderProductImage () {
    const height = 240
    const width = 320
    const {product} = this.state
    if (!product.images) return <div/>
    return (
      <div className="container-fluid">
        <ImageWithStatusText imageUrl={product.images} height={height} width={width}/>
      </div>
    )
  }

  renderProductDescription () {
    const {product} = this.state
    if (!product.images) return <div/>
    return ( <div> {product.description} </div> )
  }

  renderProductReviews () {
    const {product} = this.state
    if (!product.reviews) return <div>Be the first to review a {product.title}!</div>
    return (
      <div>
        <h3>Product Reviews</h3>
        {
          product.reviews
            .map(review => <ReviewItem review={review} key={review.id}/>)
        }
      </div>
    )
  }

  renderProductDetailForm () {
    const {product} = this.state
    if (!product) return <div/>
    return (
      <div className="row">
        <form onSubmit={this.onSubmit}>
          <input
            className="form-control"
            id="form-field"
            placeholder="Product Title"
            type="input"
            value={product.title}
            onChange={evt => this.onProductUpdate({title: evt.target.value})}
          />
          <input
            id="description"
            type="input"
            className="form-control"
            placeholder="Product Description"
            value={product.description}
            onChange={evt => this.onProductUpdate({description: evt.target.value})}
          />
          <input
            type="input"
            id="price"
            className="form-control"
            placeholder="Price"
            value={product.price}
            onChange={evt => this.onProductUpdate({price: evt.target.value})}
          />
          <input
            type="input"
            placeholder="Quantity"
            id="quantity"
            className="form-control"
            value={product.quantity}
            onChange={evt => this.onProductUpdate({quantity: evt.target.value})}
          />
          <input
            type="input"
            placeholder="Category"
            id="Category"
            className="form-control"
            value={product.quantity}
            onChange={evt => this.onProductUpdate({quantity: evt.target.value})}
          />
          <input
            type="input"
            placholder="Image"
            id="image"
            className="form-control"
            value={product.images}
            onChange={evt => this.onProductUpdate({images: evt.target.value})}
          />
          <button type='submit' className='btn btn-submit'>Submit</button>
        </form>
      </div>
    )
  }

  onSubmit (evt) {
    this.preventDefault()
    this.onProductUpdate(this.state.product)
  }

  onProductUpdate (productUpdateObj) {
    const {debouncedUpdateProduct} = this.props
    const {product} = this.state
    this.setState({
      product: Object.assign(product, productUpdateObj)
    })
    debouncedUpdateProduct(product.id, productUpdateObj)
  }
}

/**
 * CONTAINER
 */
const mapState = ({products, currentUser}, ownProps) => {
  const product = products.find(aProduct => aProduct.id === +ownProps.match.params.id)
  const productId = ownProps.productId
  return {product, productId, currentUser, isLoggedIn: !!currentUser}
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    debouncedUpdateProduct: _.debounce((...args) => {
      dispatch(updateProduct(...args))
    }, 500),
    fetchProductData () {
      const productId = ownProps.match.params.id
      dispatch(fetchProduct(productId))
    }
  }
}

export default connect(mapState, mapDispatch)(ProductDetail)
