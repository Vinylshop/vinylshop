import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { Link, NavLink } from 'react-router-dom'
// import { getCart, addToCart } from '../../store/users'
import Items from './Order/Items'

/* -----------------    COMPONENT     ------------------ */


  const cartItems = [
    {
      productId: 2,
      product:{title: 1},
      quantity: 4,
      price: 12
    },{
      productId: 4,
      product:{title: 'Example2'},
      quantity: 2,
      price: 10
    },
    {
      productId: 5,
      product:{title: 'Example3'},
      quantity: 4,
      price: 12
    }
  ]
class ShoppingCart extends Component {
  constructor (props) {
    super(props)

    this.editItemRender = this.editItemRender.bind(this)
  }

  render(){
    const { currentUser,isLoggedIn } = this.props
    let total = 0;
    return (
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <div>
              <span>Shopping Cart for {isLoggedIn ? currentUser.username : "Guest"}</span>

            </div>
            {
              cartItems
              .map((item, index) => {
                  total += item.price * item.quantity

                return (
                  <div>
                    <Items key={index} item={item}/>
                    {this.editItemRender(item)}
                  </div>
                )

              })
            }
            <div>Subtotal: {total}</div>
          </div>
        </div>
      </div>
    )
  }

  editItemRender(it){
    return(
      <div className="d-inline">
        <form className="list-inline">
          <ul className="list-inline">
            <li className="list-inline">
              <input
                name="quantity"
                type="text"
                value={it.quantity}
              />
            </li>
          </ul>
          <button
            type="submit"
          className="btn btn-warning btn-xs d-inline">
            <span className="glyphicon glyphicon-plus" />
            Update
          </button>

        </form>
        <button
          type="submit"
        className="btn btn-warning btn-xs d-inline">
          <span className="glyphicon glyphicon-plus" />
          Delete
        </button>
      </div>
    )
  }


}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({ currentUser }, ownProps) => {
  return {
        currentUser,
        isLoggedIn: !!currentUser.id
  }
}

const mapDispatch = {  }

export default connect(mapState, mapDispatch)(ShoppingCart)
