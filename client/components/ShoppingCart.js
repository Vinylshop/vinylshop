import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link, NavLink} from 'react-router-dom'
import Items from './Order/Items'
import { addToCart, removeFromCart } from '../store/cart'

/* -----------------    COMPONENT     ------------------ */

class ShoppingCart extends Component {
  constructor (props) {
    super(props)
    this.state = {
      total: 0
    }
    this.editItemRender = this.editItemRender.bind(this)
  }

  render () {
    const {currentUser, isLoggedIn, cart} = this.props
    return (
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <div>
              <span>Shopping Cart for {isLoggedIn
                ? currentUser.username
                : 'Guest'}</span>

            </div>
            {!cart.items.length && <div>No products added yet. Go add some!</div>}
            {cart.items.map((item, index) => {
              return (
                <div>
                  <Items key={index} item={item}/>{this.editItemRender(item)}
                </div>
              )
            })
            }
            <div>Subtotal: {cart.total}</div>
          </div>
        </div>
        <Link to={`/checkout`}><button className="btn btn-warning btn-lg d-inline">
          Go to checkout
        </button></Link>
      </div>
    )
  }

  editItemRender (item) {
    return (
      <form className="list-inline list-group-item"
        onSubmit={(event) => {
          event.preventDefault()
          let newItem = item
          console.log(item)
          newItem.quantity = Number(event.target.quantity.value)
          this.props.addToCart((item))
        }}>
        <li className="list-inline">
          <input
            name="quantity"
            type="text"
            placeholder={item.quantity}
            onChange={evt => this.setState({quantity: evt.target.value})}
          />
        </li>
        <button type="submit" className="btn btn-warning btn-xs d-inline">
          <span className="glyphicon glyphicon-pencil"/>
          Update
        </button>
        <button className="btn btn-warning btn-xs inline" onClick={() => {
          this.props.deleteFromCart((item))
        }}>
          Delete
        </button>
      </form>
    )
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({
  currentUser,
  cart
}, ownProps) => {
  return {
    currentUser,
    cart,
    isLoggedIn: !!currentUser.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    addToCart (itemObj) {
      dispatch(addToCart(itemObj))
    },
    deleteFromCart (itemObj) {
      dispatch(removeFromCart(itemObj))
    }
  }
}
export default connect(mapState, mapDispatch)(ShoppingCart)
