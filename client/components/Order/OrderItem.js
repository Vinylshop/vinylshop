import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeOrder } from '../../store/orders';


/* -----------------    COMPONENT     ------------------ */

class OrderItem extends Component {
  render() {
    const { order, removeOrder} = this.props;
    const isAdmin = false;
    return (
      <li className="list-group-item">
        <ul className="list-inline">
          <li>
            <Link className="large-font" to={`/orders/${order.id}`}>{order.id}</Link>
          </li>
          <li>
            <span>by</span>
          </li>
          <li>
            <Link to={`/users/${order.userId}`}>{order.userId}</Link>
          </li>
          <li>
            <span>on</span>
          </li>
          <li>
            <span>{order.createdAt}</span>
          </li>
        </ul>
        {
          isAdmin &&
          (<button
            className="btn btn-default btn-xs"
            onClick={ () => removeOrder(order.id) }>
            <span className="glyphicon glyphicon-remove" />
          </button>)
        }
      </li>
    );
  }
}


/* -----------------    CONTAINER     ------------------ */

const mapState = null;
const mapDispatch = ({removeOrder}) => ({ removeOrder });

export default connect(mapState, mapDispatch)(OrderItem);
