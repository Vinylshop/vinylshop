import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProductItem from './ProductItem'
import { addProduct } from '../../store/product'

/**
 * COMPONENT
 */
class ProductList extends Component {
  constructor (props) {
    super(props)

    this.state = {
      title: '',
      description: '',
      price: '',
      images: ''
    }

    this.renderProductSearch = this.renderProductSearch.bind(this)
    this.filterProduct = this.filterProduct.bind(this)
    this.renderNewProductWidget = this.renderNewProductWidget.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  render () {
    return (
      <div className="container">
        { this.renderProductSearch }
        <br />

        <ul className="list-group">
          {
            this.props.products
              .filter(this.filterProduct)
              .map(product => <ProductItem product={product} key={product.id}/>)
          }
        </ul>
      </div>
    )
  }

  renderProductSearch () {
    return (
      <div className="list-group-item product-item">
        <ul className="list-inline">
          <li>
            <input
              type="text"
              placeholder="Product Title"
              className="form-like large-font"
              onChange={evt => this.setState({title: evt.target.value})}
            />
          </li>
        </ul>
        <span className="glyphicon glyphicon-search"/>
      </div>
    )
  }

  renderNewProductWidget () {
    return (
      <form onSubmit={this.onSubmit} className="list-group-item product-item">
        <ul className="list-inline">
          <li>
            <input
              name="title"
              type="text"
              className="form-like large-font"
              placeholder="Product Title"
            />
          </li>
          <li>
            <input
              name="description"
              type="text"
              className="form-like large-font"
              placeholder="Product Description"
            />
          </li>
          <li>
            <input
              name="price"
              type="text"
              className="form-like large-font"
              placeholder="Product Price"
            />
          </li>
          <li>
            <input
              name="images"
              type="text"
              className="form-like large-font"
              placeholder="Product Images PlaceHolder"
            />
          </li>
        </ul>
        <button
          type="submit"
          className="btn btn-warning btn-xs pull-right">
          <span className="glyphicon glyphicon-plus"/>
        </button>
      </form>
    )
  }

  filterProduct (product) {
    const titleMatch = new RegExp(this.state.title, 'i')
    return titleMatch.test(product.title)
  }

  onSubmit (event) {
    event.preventDefault()
    const {addProduct} = this.props
    const {title} = event.target
    const product = {title: title.value}
    addProduct(product)
    event.target.title.value = ''
  }
}

/**
 *  CONTAINER
 */
const mapState = ({product}) => ({product})
const mapDispatch = {addProduct}
export default connect(mapState, mapDispatch)(ProductList)
