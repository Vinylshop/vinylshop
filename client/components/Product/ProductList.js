'use strict'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchProduct, addProduct } from '../../store'
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

  render () {
    return (
      <div className='container'>

        <div className='row heading text-center'>
          <div className='col-lg-6 col-lg-offset-3'>
            <h3 className='display-5'>ADD A NEW PRODUCT</h3>
          </div>
        </div>
        <div className='row'>
          <div className='col-lg-6 col-lg-offset-3'>
            { this.renderAddProductForm() }
          </div>
        </div>
        <div className='row separator' />

        <div className='row heading text-center'>
          <div className='col-lg-6 col-lg-offset-3'>
            <h3 className='display-5'>PRODUCT LIST</h3>
          </div>
        </div>
        <div className='row'>
          <div className='col-lg-6 col-lg-offset-3'>
            { this.renderProductSearch() }
          </div>
        </div>

        <div className='row'>
          { this.renderProducts() }
        </div>
      </div>
    )
  }

  renderProducts () {
    const {products} = this.props
    const {title, description} = this.state

    return products
      .filter(this.filterProduct)
      .map(product => {
        return (
          <div className='col-lg-4'>
            <ProductItem product={product} key={product.id} />
          </div>
        )
      })
  }

  renderProductSearch () {
    return (
      <form className='form-inline'>
        <input
          name='title'
          type='text'
          className='form-control'
          id='inlineFormInput'
          placeholder='Product Title'
          onChange={evt => this.setState({title: evt.target.value})}
          value={this.state.title}
          />
        <input
          name='description'
          type='text'
          className='form-control'
          id='inlineFormInput'
          placeholder='Product Description'
          onChange={evt => this.setState({description: evt.target.value})}
          value={this.state.description}
          />
      </form>
    )
  }

  filterProduct (product) {
    const titleMatch = new RegExp(this.state.title, 'i')
    const descriptionMatch = new RegExp(this.state.description, 'i')

    return titleMatch.test(product.title) &&
      descriptionMatch.test(product.description) &&
      product.quantity > 0
  }

  renderAddProductForm () {
    return (

      <form onSubmit={this.onSubmit}>
        <input
          className='form-control'
          id='form-field'
          value={this.state.title}
          onChange={evt => this.setState({title: evt.target.value})}
          placeholder='Product Title'
          />
        <input
          className='form-control'
          id='form-field'
          value={this.state.description}
          onChange={evt => this.setState({description: evt.target.value})}
          placeholder='Product Description'
          />
        <input
          className='form-control'
          id='form-field'
          value={this.state.price}
          onChange={evt => this.setState({price: evt.target.value})}
          placeholder='Product Price'
          />
        <input
          className='form-control'
          id='form-field'
          value={this.state.quantity}
          onChange={evt => this.setState({quantity: evt.target.value})}
          placeholder='Product Quantity'
          />
        <input
          className='form-control'
          id='form-field'
          value={this.state.images}
          onChange={evt => this.setState({images: evt.target.value})}
          placeholder='Product Image'
          />
        <button type='submit' className='btn btn-submit'>Submit</button>
      </form>

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
    fetchProductItem (id) {
      dispatch(fetchProduct(id))
    },
    addNewProduct (product) {
      dispatch(addProduct(product))
    }
  }
}
export default connect(mapState, mapDispatch)(ProductList)
