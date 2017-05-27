import React from 'react'
import PropTypes from 'prop-types'
import { formatPrice } from '../helpers'

class Fish extends React.Component {
  static propTypes = {
    details: PropTypes.shape({
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      status: PropTypes.string.isRequired,
      desc: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired
    })
  }

  render() {
    const {name, price, status, desc, image } = this.props.details
    const isAvailable = status === 'available'
    const buttonText = isAvailable ? 'Add to Order' : 'Sold out!'
    return (
      <li className="menu-fish">
        <img src={image} alt={name} />
        <h3 className="fish-name">
          {name}
          <span className="price">{formatPrice(price)}</span>
        </h3>
        <p>{desc}</p>
        <button onClick={() => this.props.addToOrder(this.props.index)} 
          disabled={!isAvailable}>{buttonText}</button>
      </li>
    )
  }
}

export default Fish