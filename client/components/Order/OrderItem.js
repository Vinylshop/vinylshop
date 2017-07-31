import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateOrder } from '../../store/orders';


/* -----------------    COMPONENT     ------------------ */
const orderState = ['CREATED', 'PROCESSING', 'CANCELLED', 'COMPLETED']

class OrderItem extends Component {
  constructor(props){
    super(props)

    this.renderOrderChange = this.renderOrderChange.bind(this)
    this.onChangeHandler = this.onChangeHandler.bind(this)
  }
  render() {
    const { currentUser, order } = this.props
    const creation = order.createdAt.split('T')


    return (
      <div>
        <li className="list-group-item">
          <ul className="list-inline">
            <li>
              Order #: <Link to={`/orders/${order.id}`}>{order.id}</Link>
            </li>
            <li>
              <span>Status: {order.status} {currentUser.isAdmin && this.renderOrderChange() }</span>
            </li>
            <li>
              <span>Date: {creation[0]} Time: {creation[1].substr(0,5)}</span>
            </li>
            <li>
              <span>Shipped To:</span>
            </li>
            <li>
              <Link to={`/users/${order.userId}`}>{order.user.username}</Link>
            </li>
          </ul>

        </li>
        
      </div>
    );
  }

  renderOrderChange() {
    return (

        <select
          name="status"
          defaultValue=""
          onChange={this.onChangeHandler}
          required
        >

          <option value="" disabled>(Change Order Status)</option>
          {
            orderState.map((status, i) => (
              <option key={i} value={status}>{status}</option>
            ))
          }
        </select>


    );
  }

  onChangeHandler(event){
    let upOrder = {
      status: event.target.value
    }
    this.props.updateOrder(this.props.order.id, upOrder)
    event.target.value = '' // tk: this is kind of icky. It would be better to use a controlled component
  }
}


/* -----------------    CONTAINER     ------------------ */

const mapState = ({currentUser}) => ({currentUser})
const mapDispatch = {updateOrder}

export default connect(mapState, mapDispatch)(OrderItem);
