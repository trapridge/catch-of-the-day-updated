import React, { PropTypes } from 'react'

class AddFishForm extends React.Component {
  static propTypes = {
    addFish: PropTypes.func.isRequired
  }

  createFish = e => {
    e.preventDefault()
    const fish = {
      name: this.nameInput.value,
      price: parseInt(this.priceInput.value, 10),
      status: this.statusInput.value,
      desc: this.descInput.value,
      image: this.imageInput.value,
    }
    this.props.addFish(fish)
    this.fishForm.reset()
  }

  render() {
    return (
      <form ref={el => this.fishForm = el} className="fish-edit" onSubmit={e => this.createFish(e)}>
        <input ref={el => this.nameInput = el} type="text" placeholder="Fish Name"/>
        <input ref={el => this.priceInput = el} type="text" placeholder="Fish Price"/>
        <select ref={el => this.statusInput = el} >
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold out!</option>
        </select>
        <textarea ref={el => this.descInput = el} type="text" placeholder="Fish Description"></textarea>
        <input ref={el => this.imageInput = el} type="text" placeholder="Fish Image"/>
        <button type="submit">+ Add Item</button>
      </form>
    )
  }
}

export default AddFishForm