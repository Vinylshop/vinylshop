import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import OrderItem from './OrderItem';

/* -----------------    COMPONENT     ------------------ */



const orderState = ['ALL', 'CREATED', 'PROCESSING', 'CANCELLED', 'COMPLETED']

class OrderList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      status: 'ALL',
      name: ''
    };

    this.filterOrder = this.filterOrder.bind(this);
    this.renderOrderSearch = this.renderOrderSearch.bind(this);
  }

  render() {
    const isAdmin = this.props.user.isAdmin
    if (!this.props.orders.length) return (<div> NO ORDERS TO DISPLAY </div>)
    return (
      <div className="container">
        { isAdmin && this.renderOrderSearch() }
        <br />

        <ul className="list-group">
          {
            this.props.orders
            .filter(this.filterOrder)
            .map((order, i) => <OrderItem order={order} key={i} />)
          }
        </ul>
      </div>
    );
  }

  renderOrderSearch() {
    return (
      <div>

        <select
          name="status"
          defaultValue=""
          onChange={evt => this.setState({status: evt.target.value})}
          required
        >

          <option value="" disabled>(select a status to filter by)</option>
          {
            orderState.map((stat, i) => (
              <option key={i} value={stat}>{stat}</option>
            ))
          }
        </select>

        <span className="glyphicon glyphicon-search" />
      </div>
    );
  }



  filterOrder(order) {
    const statusMatch = (this.state.status !== "ALL") ? new RegExp(this.state.status, 'i') :
                        new RegExp('', 'i')
    return statusMatch.test(order.status)
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({ orders, user }) => ({ orders,user });

const mapDispatch = {};

export default connect(mapState, mapDispatch)(OrderList);
