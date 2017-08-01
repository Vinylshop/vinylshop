'use strict'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchProducts, addProduct } from '../../store'
import ProductItem from './ProductItem'

/* -----------------    COMPONENT     ------------------ */
class ProductList extends Component {

  constructor (props) {
    super(props)
    this.state = {
      title: '',
      description: '',
      price: '',
      quantity: '',
      images: ''
    }
    this.renderProductSearch = this.renderProductSearch.bind(this)
    this.filterProduct = this.filterProduct.bind(this)
    this.renderProducts = this.renderProducts.bind(this)
    this.renderAddProductForm = this.renderAddProductForm.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidLoad () {
    this.props.fetchProducts()
  }

  render () {
    return (
      <div className="container product-container">
        <h1>Product List</h1>
        <hr/>
        {this.renderProductSearch()}
        <br/>
        {this.renderAddProductForm()}
        <br/>
        <div className="product-list">
          {this.renderProducts()}
        </div>
      </div>
    )
  }

  renderProducts () {
    const {products} = this.props
    const {title, description} = this.state
    if (!title && !description) return <div className="container-fluid">Please search for product</div>
    return (
      <div>
        {
          products
            .filter(this.filterProduct)
            .map(product => <ProductItem key={product.id} product={product} />)
        })
      </div>
    )
  }

  renderProductSearch () {
    return (
      <div className="container-fluid">
        <form className="list-group-item product-item">
          <input
            name="title"
            type="text"
            className="form-like large-font"
            placeholder="Product Title"
            onChange={evt => this.setState({title: evt.target.value})}
            value={this.state.title}
          />
          <input
            name="description"
            type="text"
            className="form-like large-font"
            placeholder="Product Description"
            onChange={evt => this.setState({description: evt.target.value})}
            value={this.state.description}
          />
        </form>
      </div>
    )
  }

  filterProduct (product) {
    const titleMatch = new RegExp(this.state.title, 'i')
    const descriptionMatch = new RegExp(this.state.description, 'i')

    return titleMatch.test(product.title)
      && descriptionMatch.test(product.description)
      && product.quantity > 0
  }

  renderAddProductForm () {
    return (
      <div className="container-fluid">
        <form className="list-group-item" onSubmit={this.onSubmit}>
          <input
            className="form-like large-font"
            value={this.state.title}
            onChange={evt => this.setState({title: evt.target.value})}
            placeholder="Product Title"
          />
          <input
            className="form-like large-font"
            value={this.state.description}
            onChange={evt => this.setState({description: evt.target.value})}
            placeholder="Product Description"
          />
          <input
            className="form-like large-font"
            value={this.state.price}
            onChange={evt => this.setState({price: evt.target.value})}
            placeholder="Product Price"
          />
          <input
            className="form-like large-font"
            value={this.state.quantity}
            onChange={evt => this.setState({quantity: evt.target.value})}
            placeholder="Product Quantity"
          />
          <input
            className="form-like large-font"
            value={this.state.images}
            onChange={evt => this.setState({images: evt.target.value})}
            placeholder="Product Image"
          />
          <br/>
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
    evt.preventDefault()
    const {addNewProduct} = this.props
    const {title, description, price, quantity, images} = this.state
    const product = {title, description, price, quantity, images}
    addNewProduct(product)
    this.setState({
      title: '',
      description: '',
      price: '',
      quantity: '',
      images: ''
    })
  }

}

const mapState = ({products}) => ({products})
const mapDispatch = (dispatch) => {
  return {
    fetchProducts () {
      dispatch(fetchProducts())
    },
    addNewProduct (product) {
      dispatch(addProduct(product))
    }
  }
}
export default connect(mapState, mapDispatch)(ProductList)
