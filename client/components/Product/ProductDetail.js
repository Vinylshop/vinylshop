import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { updateProduct, fetchProduct } from '../../store'
import ImageWithStatusText from '../Utils/ImageWithStatusText'
import ReviewItem from '../Review/ReviewItem'

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
    const product = this.state.product
    console.log(product)
    return (
      <div className="container product-container">
        <h1>Product Detail</h1>
        <hr/>
        {this.renderProductDetailForm()}
        <hr/>
        {this.renderProductDetail()}
        {this.renderProductDescription()}
        <hr/>
        {this.renderProductReviews()}
      </div>
    )
  }

  /*****************************************************/

  renderProductDetail () {
    const product = this.state.product
    if (!product) return <div/>
    return (
      <div>
        {this.renderProductMainTitle()}
        {this.renderProductImage()}
      </div>
    )
  }

  renderProductMainTitle () {
    const product = this.state.product
    if (!product || !product.images) return <div/>
    return (
      <div className="container-fluid">
        <h2>{product.title}</h2>
      </div>
    )
  }

  renderProductImage () {
    const height = 240
    const width = 320
    const product = this.state.product
    if (!product.images) return <div/>
    return (
      <div className="container-fluid">
        <ImageWithStatusText imageUrl={product.images} height={height} width={width}/>
      </div>
    )
  }

  renderProductDescription () {
    const product = this.state.product
    if (!product.images) return <div/>
    return (
      <div className="container-fluid">
        {product.description}
      </div>
    )
  }

  renderProductReviews () {
    const product = this.state.product
    if (!product.reviews) return <div>Be the first to review a {product.name}!</div>
    return (
      <div>
        <h3>Product Reviews</h3>
        {
          product.reviews.map(review => {
            return (
              <div>
                <h6><strong>{review.title}</strong></h6><div>{review.rating / 2} stars</div>
                <p>{review.content}</p>
              </div>
            )
          })
        }
      </div>
    )
  }

  renderProductDetailForm () {
    const product = this.state.product
    if (!product) return <div/>
    return (
      <div>
        <h4>Detail Form</h4>
        Title, Price, Description, Quantity, imageUrl<br/>
        <form className="list-group-item product-item" onSubmit={this.onSubmit}>
          <input
            className="form-like large-font"
            value={product.title}
            onChange={evt => this.onProductUpdate({title: evt.target.value})}
          />
          <input
            className="form-like large-font"
            value={product.description}
            onChange={evt => this.onProductUpdate({description: evt.target.value})}
          />
          <input
            className="form-like large-font"
            value={product.price}
            onChange={evt => this.onProductUpdate({price: evt.target.value})}
          />
          <input
            className="form-like large-font"
            value={product.quantity}
            onChange={evt => this.onProductUpdate({quantity: evt.target.value})}
          />
          <input
            className="form-like large-font"
            value={product.images}
            onChange={evt => this.onProductUpdate({images: evt.target.value})}
          />
          <button
            type="submit"
            className="btn btn-default">
            <span className="glyphicon glyphicon-plus"/>
            Submit
          </button>
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
const mapState = ({products}, ownProps) => {
  const product = products.find(aProduct => aProduct.id === +ownProps.match.params.id)
  const productId = ownProps.productId
  return {product, productId}
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
