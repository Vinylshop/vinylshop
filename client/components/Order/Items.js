import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


/* -----------------    COMPONENT     ------------------ */

class Items extends Component {
  render() {
    const { item } = this.props;

    return (
      <li className="list-group-item">
        <ul className="list-inline">
          <li>
            <span>Quantity:{item.quantity}</span>
          </li>
          <li>
            <span>Price:{item.price}</span>
          </li>
          <li>
            <Link to={`/products/${item.productId}`}>{item.productId}</Link>
          </li>
          <li>
            <span> ---> {item.quantity*item.price}</span>
          </li>
        </ul>
      </li>
    );
  }
}


/* -----------------    CONTAINER     ------------------ */

const mapState = null;
const mapDispatch = { };

export default connect(mapState, mapDispatch)(StoryItem);
