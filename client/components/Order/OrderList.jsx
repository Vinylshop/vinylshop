import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { makeOrder } from '../../redux/orders';
import orderItem from './OrderItem';

/* -----------------    COMPONENT     ------------------ */

class OrderList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: ''
    };

    this.renderOrderSearch = this.renderUserSearch.bind(this);
  }

  render() {
    return (
      <div className="container">
        <div className="user-query">
          { this.renderOrderSearch() }
        </div>
        <br />
        <br />
        <div className="list">
        {
          this.props.orders
            .filter(this.filterOrder)
            .map(user => <OrderItem order={order} key={order.id} />)
        }
        </div>
      </div>
    );
  }

  renderUserSearch() {
    return (
      <div className="list-group-item min-content order-item">
        <div className="media">
          <div className="media-left media-middle icon-container">
            <span className="glyphicon glyphicon-search" />
          </div>
          <div className="media-body">
            <h5 className="tucked">
              <select>
                <option></option>
                <option></option>
                <option></option>
              </select>
            </h5>
          </div>
        </div>
      </div>
    );
  }

  filterUser(story) {
    const nameMatch  = new RegExp(this.state.name, 'i');
    const emailMatch = new RegExp(this.state.email, 'i');
    const phoneMatch = new RegExp(this.state.phone, 'i');

    return nameMatch.test(story.name)
        && emailMatch.test(story.email)
        && phoneMatch.test(story.phone);
  }


  renderNewUserWidget() {
    return (
      <div className="list-group-item min-content user-item">
        <form className="media" onSubmit={this.submit}>
          <div className="media-left media-middle icon-container">
            <button
              type="submit"
              className="glyphicon glyphicon-plus clickable"
            />
          </div>
          <div className="media-body">
            <h4 className="media-heading tucked">
              <input
                name="name"
                type="text"
                required
                placeholder="Jean Doe"
                className="form-like"
              />
            </h4>
            <h5 className="tucked">
              <input
                name="email"
                type="email"
                required
                placeholder="email@website.com"
                className="form-like"
              />
            </h5>
            <h5 className="tucked">
              <input
                name="phone"
                type="tel"
                placeholder="(555) 555-5555"
                className="form-like"
              />
            </h5>
          </div>
        </form>
      </div>
    );
  }

  submit(event) {
    event.preventDefault();
    const user = {
      name: event.target.name.value,
      email: event.target.email.value,
      phone: event.target.phone.value,
    };
    this.props.addUser(user);
    // clear the inputs
    event.target.name.value = '';
    event.target.email.value = '';
    event.target.phone.value = '';
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({ users }) => ({ users });

const mapDispatch = { addUser };

export default connect(mapState, mapDispatch)(UserList);
