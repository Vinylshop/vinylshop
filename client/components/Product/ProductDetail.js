import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { updateProduct, fetchProduct } from '../../store'

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
        images: ''
      }
    }
    this.onProductUpdate = this.onProductUpdate.bind(this)
  }

  componentDidMount () {
    this.props.fetchProductData()
  }

  componentWillReceiveProps (newProps) {
    if (newProps.match.params.id !== this.props.match.params.id) {
      this.props.fetchProductData()
    }

    this.state({
      product: newProps.product
    })
  }

  render () {
    const product = this.state.product
    if (!product) return <div />
    return (
      <div className="container product-container">
        <ul className="list-inline large-font">
          <li>
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
              value={product.images}
              onChange={evt => this.onProductUpdate({images: evt.target.value})}
            />
          </li>
        </ul>
      </div>
    )
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
