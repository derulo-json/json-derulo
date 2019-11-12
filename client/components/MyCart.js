import React, {Component} from 'react'
import {
  getCartThunk,
  removeFromCartThunk,
  plusOneThunk,
  minusOneThunk
} from '../store/cart'
import {connect} from 'react-redux'
import {Icon, Button} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

class MyCart extends Component {
  constructor() {
    super()
    this.state = {
      localCart: this.fixLocalCart(JSON.parse(localStorage.getItem('cart')))
    }
    this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount() {
    this.props.getCartThunk()
    if (this.state.localCart === null) {
      this.setState({
        localCart: []
      })
    }
  }
  //delete button
  async handleClick(e, product) {
    e.preventDefault()
    const localCart = this.state.localCart
    if (this.props.user) {
      await this.props.removeFromCartThunk(product.id)
      this.props.getCartThunk()
    } else {
      for (let i = 0; i < this.state.localCart.length; i++) {
        if (this.state.localCart[i].id === product.id) {
          console.log('i went through and was cut')
          console.log(localCart)
          this.setState({
            localCart: localCart.splice(i, 1)
          })
          localStorage.setItem('cart', JSON.stringify(this.state.localCart))
        }
      }
    }
  }
  async handlePlus(e, product) {
    e.preventDefault()
    await this.props.plusOneThunk(product)
    this.props.getCartThunk()
    console.log(product.cart.quantity)
  }

  async handleMinus(e, product) {
    e.preventDefault()
    await this.props.minusOneThunk(product)
    this.props.getCartThunk()
  }

  handleQuantity(e, product) {
    let count = 0
    this.state.localCart.forEach(element => {
      if (element === product) {
        count++
      }
      return <div>{count}</div>
    })
  }

  fixLocalCart(arr) {
    let newArr = arr
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length; j++) {
        if (arr[i].id === arr[j].id && i !== j) {
          newArr.splice(j, 1)
        }
      }
    }
    return newArr
  }

  render() {
    return (
      <div>
        {this.props.user.id ? (
          <table className="ui compact celled definition table">
            <thead>
              <tr>
                <th width="1%" />
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {this.props.cart.cart &&
                this.props.cart.cart.products.map(product => (
                  <tr key={product.id}>
                    <td>
                      <Button
                        onClick={e => this.handleClick(e, product)}
                        color="teal"
                      >
                        <Icon trash="trash" name="trash" />
                      </Button>
                    </td>
                    <td>
                      <Link to={`/AllProducts/${product.id}`}>
                        <div>{product.name}</div>
                        <img id="cartIMG" src={product.imageUrl} width="92px" />
                      </Link>
                    </td>
                    <td>
                      <Button onClick={e => this.handlePlus(e, product)}>
                        <Icon name="plus square outline" />
                      </Button>
                      {product.cart.quantity}
                      <Button onClick={e => this.handleMinus(e, product)}>
                        <Icon name="minus square outline" />
                      </Button>
                    </td>
                    <td>${product.price / 100}</td>
                  </tr>
                ))}
            </tbody>
            <tfoot className="full-width">
              <tr>
                <th />
                <th colSpan="4">
                  <div
                    onClick={this.handleCheckout}
                    className="ui right floated small primary labeled icon button"
                  >
                    <Icon className="shopping cart" /> Checkout
                  </div>
                  <Link to="/allproducts">
                    <div className="ui small button">Continue Shopping</div>
                  </Link>
                  <div
                    onClick={this.handleClearCart}
                    className="ui small  button"
                  >
                    Empty Cart
                  </div>
                </th>
              </tr>
            </tfoot>
          </table>
        ) : (
          //Loads if the local cart is empty
          <table className="ui compact celled definition table">
            <thead>
              <tr>
                <th width="1%" />
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {this.state.localCart.map(product => (
                <tr key={product.id}>
                  <td>
                    <Button
                      onClick={e => this.handleClick(e, product)}
                      color="teal"
                    >
                      <Icon trash="trash" name="trash" />
                    </Button>
                  </td>
                  <td>
                    <Link to={`/AllProducts/${product.id}`}>
                      <div>{product.name}</div>
                      <img id="cartIMG" src={product.imageUrl} width="92px" />
                    </Link>
                  </td>
                  <td>
                    {this.handleQuantity(product)}
                    <Button onClick={e => this.handlePlus(e, product)}>
                      <Icon name="plus square outline" />
                    </Button>
                    <Button onClick={e => this.handleMinus(e, product)}>
                      <Icon name="minus square outline" />
                    </Button>
                  </td>
                  <td>${product.price / 100}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="full-width">
              <tr>
                <th />
                <th colSpan="4">
                  <div
                    onClick={this.handleCheckout}
                    className="ui right floated small primary labeled icon button"
                  >
                    <Icon className="shopping cart" /> Checkout
                  </div>
                  <Link to="/allproducts">
                    <div className="ui small button">Continue Shopping</div>
                  </Link>
                  <div
                    onClick={this.handleClearCart}
                    className="ui small  button"
                  >
                    Empty Cart
                  </div>
                </th>
              </tr>
            </tfoot>
          </table>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart,
    user: state.user
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getCartThunk: () => dispatch(getCartThunk()),
    auth: () => dispatch(auth()),
    removeFromCartThunk: id => dispatch(removeFromCartThunk(id)),
    plusOneThunk: product => dispatch(plusOneThunk(product)),
    minusOneThunk: product => dispatch(minusOneThunk(product))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MyCart)
