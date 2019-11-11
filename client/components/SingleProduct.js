import React, {Component} from 'react'
import {connect} from 'react-redux'
import {gotProductThunk} from '../store/singleproduct'
import {addToCartThunk, getCart} from '../store/CartReducer'
import {Button, Popup} from 'semantic-ui-react'
import PropTypes from 'prop-types'

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
  //delete later
  componentWillUnmount() {
    console.log(JSON.parse(localStorage.getItem('cart')))
  }

  render() {
    const singleProduct = this.props.singleProduct
    return (
      <div>
        <div id="products-container" className="left-container">
          <div>{singleProduct.name}</div>
          <img src={singleProduct.imageUrl} />
          <div>{singleProduct.description}</div>
          <Popup
            content="Added to cart!"
            on="click"
            trigger={
              <Button
                onClick={this.handleClick}
                className="ui animated fade button"
                tabIndex="0"
              >
                <div className="visible content">Add to Cart!</div>
                <div className="hidden content">
                  ${singleProduct.price / 100}
                </div>
                <span className="popuptext" id="myPopup" />
              </Button>
            }
          />
        </div>
      </div>
    )
  }

  saveToLocal() {
    localStorage.setItem('cart', JSON.stringify(this.state.cart))
    // this.setState(JSON.parse(localStorage.getItem('cart')))
  }

  handleClick(e) {
    e.preventDefault()
    if (this.props.user.id) {
      this.props.addToCartThunk(this.props.user.id, this.props.singleProduct)
    } else {
      console.log(this.state.cart)
      this.state.cart.push(this.props.singleProduct)
      this.saveToLocal()
    }
  }
}

const mapState = state => ({
  singleProduct: state.singleProduct,
  user: state.user
})

const mapDispatch = dispatch => ({
  gotProductThunk: id => dispatch(gotProductThunk(id)),
  addToCartThunk: (userId, item) => dispatch(addToCartThunk(userId, item))
})

export default connect(mapState, mapDispatch)(SingleProduct)
