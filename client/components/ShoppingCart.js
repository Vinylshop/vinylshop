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
    this.renderCreditCardForm = this.renderCreditCardForm.bind(this)
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
        <Link to={`/checkout`}><button className="btn btn-warning btn-xs d-inline">
          Go to checkout
        </button></Link>
      </div>
    )
  }

  editItemRender (item) {
    return (
      <div className="d-inline">
        <form className="list-inline"
          onSubmit={(event) => {
            event.preventDefault()
            let newItem = item
            console.log(item)
            newItem.quantity = Number(event.target.quantity.value)
            this.props.addToCart((item))
          }}>
          <ul className="list-inline">
            <li className="list-inline">
              <input
                name="quantity"
                type="text"
                placeholder={item.quantity}
                onChange={evt => this.setState({quantity: evt.target.value})}
              />
            </li>
          </ul>
          <button type="submit" className="btn btn-warning btn-xs d-inline">
            <span className="glyphicon glyphicon-pencil"/>
            Update
          </button>

        </form>
        <button className="btn btn-warning btn-xs d-inline" onClick={() =>{
          this.props.deleteFromCart((item))
          console.log(item)
        }}>
          Delete
        </button>
      </div>
    )
  }

  renderCreditCardForm () {
    return (
      <form>
        <input type='text' data-stripe='number' placeholder='credit card number'/><br/>
        <input type='text' data-stripe='exp-month' placeholder='expiration month'/><br/>
        <input type='text' data-stripe='exp-year' placeholder='expiration year'/><br/>
        <input type='text' data-stripe='cvc' placeholder='cvc'/><br/>
        <input type='submit' value='Purchase'/>
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
