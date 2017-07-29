import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import ProductItem from './ProductItem'

/* -----------------    COMPONENT     ------------------ */

// dummyData
let testProducts = [
  {
    id: 1,
    title: 'Test Product 1',
    description: 'This is the content for Review 1',
    price: 4939,
    images: '/directory/on/some/server/imageURL.png'
  },
  {
    id: 2,
    title: 'Test Product 2',
    description: 'This is the content for Review 2',
    price: 9493,
    images: '/directory/on/some/server/imageURL.png'
  }
]

export default class ProductList extends Component {
  constructor (props) {
    super(props)
    this.renderProductForm = this.renderProductForm.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  render () {
    console.log('I\'m here')
    return (
      <div className="container">
        <ul className="list-group">
          { this.renderProductForm() }
          {
            testProducts
              .map(product => <ProductItem product={product} key={product.id}/>)
          }
        </ul>
      </div>
    )
  }

  renderProductForm () {
    return (
      <form onSubmit={this.onSubmit}>
        <ul className="list-inline">
          <li>
            <input
              name="title"
              type="text"
              placeholder="Product Title"
            />
            <input
              name="description"
              type="text"
              placeholder="Product Description"
            />
            <input
              name="price"
              type="text"
              placeholder="Product $$$$"
            />
            <input
              name="images"
              type="text"
              placeholder="Product Images"
            />
          </li>
          <button
            type="submit"
            className="btn btn-warning btn-xs">
            <span className="glyphicon glyphicon-plus"/>
          </button>
        </ul>
      </form>
    )
  }

  onSubmit (event) {
    event.preventDefault()

    const product = {
      title: event.target.title.value,
      description: event.target.description.value,
      price: event.target.price.value,
      images: event.target.images.value
    }

    testProducts.push(product)

    event.target.title.value = ''
    event.target.description.value = ''
    event.target.price.value = ''
    event.target.images.value = ''
  }
}
