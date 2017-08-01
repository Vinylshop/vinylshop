import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addToCart } from '../../store'

class CartBuyButton extends Component {
  constructor (props) {
    super(props)
    this.state = {quantity: '1'}

    this.onSubmit = this.onSubmit.bind(this)
  }

  render () {
    return (
      <div>
        <form>
          <input
            className="form-like large-font"
            value={this.state.quantity}
            onChange={evt => this.setState({quantity: evt.target.value})}
          />
          <button
            type="submit"
            className="btn btn-sm btn-default">
            <span className="glyphicon glyphicon-plus"/>
            {/*ADD*/}
          </button>
        </form>
      </div>
    )
  }

  onSubmit (e) {
    e.preventDefault()
    const {productId, price} = this.props
    this.props.addToCart(({productId, price, quantity: this.state.quantity}))
    this.setState({quantity: 1})
  }
}

const mapState = null
const mapDispatch = (dispatch) => {
  return {
    addToCart (itemObj) {
      dispatch(addToCart(itemObj))
    }
  }
}
export default connect(mapState, mapDispatch)(CartBuyButton)
