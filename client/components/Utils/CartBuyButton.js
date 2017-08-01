import React from 'react'
import { connect } from 'react-redux'
import { addToCart } from '../../store/cart'

class CartBuyButton extends React.Component {
  constructor (props) {
    super(props)
    this.state = {quantity: '1'}
    this.onSubmit = this.onSubmit.bind(this)
  }

  render () {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input
            name="quantity"
            type="text"
            className="form-like large-font"
            placeholder="Quantity"
            onChange={evt => this.setState({quantity: evt.target.value})}
            value={this.state.quantity}
          />
          <button
            type="submit"
            className="btn btn-default">
            <span className="glyphicon glyphicon-plus"/>
          </button>
        </form>
      </div>
    )
  }

  onSubmit (e) {
    e.preventDefault()
    const {addItemToCart, getCartTotal} = this.props
    const {productId, price} = this.props
    const itemAddedToCartObj = {productId, price, quantity: this.state.quantity}
    addItemToCart(itemAddedToCartObj)
  }

}

const mapState = null
const mapDispatch = (dispatch) => {
  return {
    addItemToCart (itemAddedToCartObj) {
      dispatch(addToCart(itemAddedToCartObj))
    }
  }
}

export default connect(mapState, mapDispatch)(CartBuyButton)
