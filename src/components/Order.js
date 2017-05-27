import React from 'react'
import PropTypes from 'prop-types'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

import { formatPrice } from '../helpers'

class Order extends React.Component {
  static propTypes = {
    fishes: PropTypes.object.isRequired,
    order: PropTypes.object.isRequired,
    removeFromOrder: PropTypes.func.isRequired
  }

  renderOrder = key => {
    const fish = this.props.fishes[key]
    const count = this.props.order[key]
    const removeButton = 
      <button onClick={() => this.props.removeFromOrder(key)}>&times;</button>

    if (!fish || fish.status === 'unavailable') {
      return (
        <li key={key}>
          Sorry, {fish ? fish.name : 'the fish'} is no longer available
          {removeButton}
        </li>
      )
    }
    return (
      <li key={key}>
        <span>
          <CSSTransitionGroup component="span" className="count" 
            transitionName="count" transitionEnterTimeout={250} 
            transitionLeaveTimeout={250}>
            <span key={count}>{count}</span>
          </CSSTransitionGroup>
          lbs {fish.name} {removeButton}
        </span>
        <span className="price">{formatPrice(count * fish.price)}</span>
      </li>
    )
  }

  render() {
    const orderIds = Object.keys(this.props.order)
    const total = orderIds.reduce((prev, key) => {
      const fish = this.props.fishes[key]
      const count = this.props.order[key]
      const isAvailable = fish && fish.status === 'available'
      if (isAvailable) {
        return prev + (count * fish.price || 0)
      }
      return prev
    }, 0)

    return (
      <div className="order-wrap">
        <h2>Your Order</h2>
        <CSSTransitionGroup component="ul" className="order" 
          transitionName="order" transitionEnterTimeout={500}
          transitionLeaveTimeout={500}>
          {Object.keys(this.props.order).map(this.renderOrder)}
          <li className="total">
            <strong>Total:</strong>
            {formatPrice(total)}
          </li>
        </CSSTransitionGroup>
      </div>
    )
  }
}

export default Order