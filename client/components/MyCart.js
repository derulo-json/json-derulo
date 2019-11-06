import React, {Component} from 'react'

class MyCart extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }
  render() {
    return (
      <div>
        <button type="button" onClick={this.handleClick}>
          clear cart
        </button>
      </div>
    )
  }
  handleClick(e) {
    e.preventDefault()
    localStorage.clear()
  }
}

export default MyCart
