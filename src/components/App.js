import React, { PropTypes } from 'react'

import Header from './Header'
import Order from './Order'
import Inventory from './Inventory'
import Fish from './Fish'

import base from '../base'
import sampleFishes from '../sample-fishes'

class App extends React.Component {
  static propTypes = {
    params: PropTypes.object.isRequired
  }

  state = {
    fishes: {},
    order: {}
  }

  componentWillMount() {
    this.ref = base.syncState(
      `${this.props.params.storeId}/fishes`, {
        context: this,
        state: 'fishes'
      }
    )

    const persistedOrder = localStorage.getItem(`order-${this.props.params.storeId}`)
    if (persistedOrder) {
      this.setState({
        order: JSON.parse(persistedOrder)
      })
    }
  }

  componentWillUnmount() {
    base.removeBinding(this.ref)
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem(`order-${this.props.params.storeId}`, 
      JSON.stringify(nextState.order))
  }

  // componentShouldUpdate() {
  //   // impl to get rid of double rendering
  // }

  addFish = fish => {
    const fishes = {...this.state.fishes}
    fishes[`fish-${Date.now()}`] = fish
    this.setState({ fishes })
  }

  updateFish = (fish, key) => {
    const fishes = {...this.state.fishes}
    fishes[key] = fish
    this.setState({ fishes })  
  }

  removeFish = key => {
    const fishes = {...this.state.fishes}
    fishes[key] = null
    this.setState({ fishes })   
  } 

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes }) 
  }

  addToOrder = key => {
    const order = {...this.state.order}
    order[key] = order[key] + 1 || 1
    this.setState({ order })
  }

  removeFromOrder = key => {
    const order = {...this.state.order}
    if (order[key] <= 1 || this.fishRemovedOrSoldOut(key)) delete order[key]
    else order[key] -= 1
    this.setState({ order })
  }

  fishRemovedOrSoldOut = key => {
    return !this.state.fishes[key] || 
      this.state.fishes[key].status === 'unavailable'
  }

  render() {
    const fishes = this.state.fishes
    
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh seafood"/>
          <ul className="list-of-fishes">
            { 
              Object
                .keys(fishes)
                .map(key => <Fish key={key} index={key} 
                  addToOrder={this.addToOrder} details={fishes[key]} />)
            }
          </ul>
        </div>
        <Order fishes={this.state.fishes} order={this.state.order} 
          removeFromOrder={this.removeFromOrder} />
        <Inventory loadSampleFishes={this.loadSampleFishes} 
          addFish={this.addFish} updateFish={this.updateFish} 
          removeFish={this.removeFish} fishes={this.state.fishes}
          storeId={this.props.params.storeId} />
      </div>
    )
  }
}

export default App