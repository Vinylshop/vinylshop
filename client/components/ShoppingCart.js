import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link, NavLink} from 'react-router-dom'
// import { getCart, addToCart } from '../../store/users'
import Items from './Order/Items'

/* -----------------    COMPONENT     ------------------ */

const cartItems = [
  {
    productId: 2,
    product: {
      title: 1
    },
    quantity: 4,
    price: 12
  }, {
    productId: 4,
    product: {
      title: 'Example2'
    },
    quantity: 2,
    price: 10
  }, {
    productId: 5,
    product: {
      title: 'Example3'
    },
    quantity: 4,
    price: 12
  }
]
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
    const {currentUser, isLoggedIn} = this.props
    let total = 0
    return (
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <div>
              <span>Shopping Cart for {isLoggedIn
                ? currentUser.username
                : 'Guest'}</span>

            </div>
            {cartItems.map((item, index) => {
              return (
                <div>
                  <Items key={index} item={item}/> {this.editItemRender(item)}
                </div>
              )
            })
            }
            <div>Subtotal: {total}</div>
          </div>
        </div>
        {this.renderCreditCardForm()}
      </div>
    )
  }

  editItemRender (item) {
    return (
      <div className="d-inline">
        <form className="list-inline" onSubmit={(event) => {
          event.preventDefault()
          console.log(`Item ${item.product.title} quantity changed`)
        }}>
          <ul className="list-inline">
            <li className="list-inline">
              <input name="quantity" type="text" value={item.quantity}/>
            </li>
          </ul>
          <button type="submit" className="btn btn-warning btn-xs d-inline">
            <span className="glyphicon glyphicon-pencil"/>
            Update
          </button>

        </form>
        <button className="btn btn-warning btn-xs d-inline" onClick={(event) => {
          event.preventDefault()
          console.log(`Item ${item.product.title} deleted`)
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
  currentUser
}, ownProps) => {
  return {
    currentUser,
    isLoggedIn: !!currentUser.id
  }
}

const mapDispatch = {}

export default connect(mapState, mapDispatch)(ShoppingCart)
