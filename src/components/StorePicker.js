import React from 'react'
import PropTypes from 'prop-types'
import { browserHistory } from 'react-router' 
import { getFunName } from '../helpers'

class StorePicker extends React.Component {
  static contextTypes = {
    router: PropTypes.object
  }

  render() {
    return (
      <form className="store-selector" onSubmit={e => this.goToStore(e)}>
        <h2>Please enter a store</h2>
        <input type="text" required defaultValue={getFunName()} 
          ref={el => {this.storeInput = el}} />
        <button type="submit">Visit store</button>
      </form>
    )
  }

  goToStore = e => {
    e.preventDefault()
    browserHistory.push(`/store/${this.storeInput.value}`)
  }
}

export default StorePicker