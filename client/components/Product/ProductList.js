'use strict'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchProduct } from '../../store'
import ProductItem from './ProductItem'

/* -----------------    COMPONENT     ------------------ */
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
    this.renderProducts = this.renderProducts.bind(this)
  }

  render () {
    return (
      <div className="container-fluid">
        <h1>Product List</h1>
        <hr />
        { this.renderProductSearch() }
        <br />
        <div className="product-list">
          { this.renderProducts() }
        </div>
      </div>
    )
  }

  renderProducts () {
    const {products} = this.props
    return products
      .filter(this.filterProduct)
      .map(product => <ProductItem product={product} key={product.id}/>)
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

    console.log(product)

    return titleMatch.test(product.title)
      && descriptionMatch.test(product.description)
  }

}

const mapState = ({products}) => ({products})
const mapDispatch = (dispatch) => {
  return {
    fetchProductItem (id) {
      dispatch(fetchProduct(id))
    }
  }
}
export default connect(mapState, mapDispatch)(ProductList)
