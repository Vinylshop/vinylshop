import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link, NavLink} from 'react-router-dom'
import { removeCart } from '../store/cart'
import { addOrder } from '../store/orders'
import Items from './Order/Items'

/* -----------------    COMPONENT     ------------------ */

class Checkout extends Component {
  constructor (props) {
    super(props)
    this.state = {
      total: 0
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.renderCheckOutForm = this.renderCheckOutForm.bind(this)
  }

  render () {
    const {currentUser, isLoggedIn, cart} = this.props
    if (!cart.items.length) return <div>No products added yet. <Link to={`/products/`}>Go add some!</Link></div>
    return (
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <div>
              <span>Checkout {isLoggedIn
                ? currentUser.username
                : 'Guest'}</span>

            </div>

            {cart.items.map((item, index) => {
              return (
                <div>
                  <Items key={index} item={item}/>
                </div>
              )
            })
            }
            <div>Subtotal: {cart.total}</div>
          </div>
        </div>
        {this.renderCheckOutForm()}
      </div>
    )
  }

  renderCheckOutForm () {
    return (
      <form onSubmit={this.onSubmit}>
        {
          !this.props.isLoggedIn && (<label>
            Email:
            <input type="text" name="email" required/>
          </label>)
        }
        <label>
          Street Address:
          <input type="text" name="address" required/>
        </label>
        <label>
          City:
          <input type="text" name="city" required/>
        </label>
        <label>
          State:
          <input type="text" name="state" required/>
        </label>
        <label>
          zipCode:
          <input type="text" name="zipcode" required/>
        </label>
        <Link to={this.props.isLoggedIn ? `/home` : `/products`}>
          <input type="submit" value="Submit" required/>
        </Link>
      </form>
    )
  }
  onSubmit (event) {
    event.preventDefault()
    const guest = !this.props.isLoggedIn
    let newOrder = {
      email: (guest ? event.target.email.value : this.props.currentUser.email),
      address: event.target.address.value,
      city: event.target.city.value,
      state: event.target.state.value,
      zipCode: event.target.zipcode.value,
      userId: (!guest ? this.props.currentUser.id : null),
      status: 'CREATED'
    }
    console.log(newOrder)
    this.props.placeOrder(newOrder, this.props.cart.items)
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
  return ({
    placeOrder (order, orderItems) {
      dispatch(addOrder(order, orderItems))
      dispatch(removeCart())
    }
  })
}

export default connect(mapState, mapDispatch)(Checkout)
