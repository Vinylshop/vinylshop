import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Router } from 'react-router'
import { Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import history from './history'
import { Main, Login, Signup, UserHome } from './components'
import { me, fetchProducts, fetchLists, fetchCart } from './store'
import ReviewList from './components/Review/ReviewList'
import ProductList from './components/Product/ProductList'
import ProductDetail from './components/Product/ProductDetail'
import OrderList from './components/Order/OrderList'
import OrderDetail from './components/Order/OrderDetail'
import { fetchOrders } from './store/orders'
import { fetchUsers } from './store/users'
import UserList from './components/User/UserList'
import UserDetail from './components/User/UserDetail'
import ShoppingCart from './components/ShoppingCart'
import Checkout from './components/Checkout'
/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount () {
    this.props.loadInitialData()
  }

  render () {
    const {isLoggedIn} = this.props

    return (
      <Router history={history}>
        <Main>
          <Switch>
            {/* Routes placed here are available to all visitors */}
            <Route path='/home' component={UserHome} />
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Signup} />
            <Route path='/products/:id/reviews' component={ReviewList} />
            <Route path='/products/:id' component={ProductDetail} />
            <Route path='/products' component={ProductList} />
            <Route exact path='/users' component={UserList} />
            <Route path='/users/:id' component={UserDetail} />
            <Route exact path='/reviews' component={ReviewList} />
            <Route path='/cart' component={ShoppingCart} />
            <Route path ='/checkout' component={Checkout}/>
            {
              isLoggedIn
                ? <Switch>
                  {/* Routes placed here are only available after logging in */}
                  <Route exact path='/orders' component={OrderList} />
                  <Route path='/orders/:id' component={OrderDetail} />
                </Switch> : null
            }
            {/* Displays our Login component as a fallback */}
            <Route component={Login} />
          </Switch>
        </Main>
      </Router>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.currentUser.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData () {
      dispatch(fetchUsers())
      dispatch(fetchOrders())
      dispatch(me())
      dispatch(fetchProducts())
      dispatch(fetchLists())
      dispatch(fetchCart())
    }
  }
}

export default connect(mapState, mapDispatch)(Routes)

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
