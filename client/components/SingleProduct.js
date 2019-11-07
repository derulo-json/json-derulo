import React, {Component} from 'react'
import {connect} from 'react-redux'
import {gotProductThunk} from '../store/singleproduct'
import {addToCartThunk} from '../store/cartItems'
import store from '../store'

class SingleProduct extends Component {
  constructor() {
    super()
    this.state = {
      cart: JSON.parse(localStorage.getItem('cart'))
    }

    this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount() {
    this.props.gotProductThunk(this.props.match.params.id)
    if (this.state.cart === null) {
      this.setState({
        cart: []
      })
    }
  }

  render() {
    const singleProduct = this.props.singleproduct
    return (
      <div>
        <div id="products-container" className="left-container">
          <div>{singleProduct.name}</div>
          <img src={singleProduct.imageUrl} />
          <div>{singleProduct.description}</div>
          <div
            onClick={this.handleClick}
            className="ui animated fade button"
            tabIndex="0"
          >
            <div className="visible content">Add to Cart!</div>
            <div className="hidden content">${singleProduct.price / 100}</div>
          </div>
        </div>
      </div>
    )
  }

  saveToLocal() {
    localStorage.setItem('cart', JSON.stringify(this.state.cart))
    this.setState(JSON.parse(localStorage.getItem('cart')))
  }

  handleClick(e) {
    e.preventDefault()
    console.log(this.state.cart)
    this.state.cart.push(this.props.singleproduct)
    this.saveToLocal()
    console.log(this.state.cart)
  }
}

const mapState = state => ({
  singleproduct: state.singleproduct
})
const mapDispatch = dispatch => ({
  gotProductThunk: id => dispatch(gotProductThunk(id))
})
export default connect(mapState, mapDispatch)(SingleProduct)
