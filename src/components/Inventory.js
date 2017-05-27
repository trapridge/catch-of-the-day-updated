import React from 'react'
import PropTypes from 'prop-types'
import AddFishForm from './AddFishForm'
import base from '../base'

class Inventory extends React.Component {
  static propTypes = {
    fishes: PropTypes.object.isRequired,
    updateFish: PropTypes.func.isRequired,
    removeFish: PropTypes.func.isRequired,
    loadSampleFishes: PropTypes.func.isRequired,
    storeId: PropTypes.string.isRequired
  }

  state = {
    uid: null,
    owner: null
  }

  componentDidMount() {
    base.onAuth(user => {
      if (user) {
        this.authHandler(null, { user })
      }
    }) 
  }

  handleChange = (e, key) => {
    const fish = this.props.fishes[key]
    const updatedFish = {...fish, [e.target.name]: e.target.value}
    this.props.updateFish(updatedFish, key)
  } 

  authenticate = provider => {
    base.authWithOAuthPopup(provider, this.authHandler)
  }

  logout = () => {
    base.unauth()
    this.setState({ uid: null })
  }

  authHandler = async (err, authData) => {
    if (err) {
      console.log(err)
      return
    }

    const storeRef = base.database().ref(this.props.storeId)
    let snapshot = await storeRef.once('value')  
    const data = snapshot.val() || {}

    if (!data.owner) {
      storeRef.set({
        owner: authData.user.uid
      })
    }

    this.setState({
      uid: authData.user.uid,
      owner: data.owner || authData.user.uid
    })
  }

  renderLogin = () => {
    return (
      <nav className="login">
        <h2>Inventory</h2>
        <p>Sign in to manage your store's inventory</p>
        <button className="github" onClick={() => this.authenticate('github')} >Log in with Github</button>
        <button className="google" onClick={() => this.authenticate('google')} >Log in with Google</button>
        <button className="twitter" onClick={() => this.authenticate('twitter')} >Log in with Twitter</button>
      </nav>
    )
  }

  renderFish = (key) => {
    const fish = this.props.fishes[key]
    return (
      <div className="fish-edit" key={key}>
        <input name="name" value={fish.name} type="text" 
          placeholder="Fish Name" onChange={e => this.handleChange(e, key)} />
        <input name="price" value={fish.price} type="text" 
          placeholder="Fish Price" onChange={e => this.handleChange(e, key)}/>
        <select name="status" value={fish.status} 
        onChange={e => this.handleChange(e, key)} >
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold out!</option>
        </select>
        <textarea name="desc" value={fish.desc} type="text" 
          placeholder="Fish Description" 
          onChange={e => this.handleChange(e, key)}></textarea>
        <input name="image" value={fish.image} type="text" 
          placeholder="Fish Image" onChange={e => this.handleChange(e, key)}/>
        <button onClick={() => this.props.removeFish(key)}>Remove fish</button>
      </div>
    )
  }

  render() {
    const logout = <button onClick={this.logout}>Logout</button>

    if (!this.state.uid) {
      return <div>{this.renderLogin()}</div>
    }

    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry, you are not the owner of the store</p>
          {logout}
        </div>
      )
    }

    return (
      <div>
        <h2>inventory</h2>
        {logout}
        {Object.keys(this.props.fishes).map(this.renderFish)}
        <AddFishForm addFish={this.props.addFish} />        
        <button onClick={this.props.loadSampleFishes}>Load sample fishes</button>
      </div>
    )
  }
}

export default Inventory