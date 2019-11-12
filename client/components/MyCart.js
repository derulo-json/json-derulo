import React, {Component} from 'react'
import {
  getCartThunk,
  removeFromCartThunk,
  plusOneThunk,
  minusOneThunk,
  checkoutThunk
} from '../store/cart'
import {connect} from 'react-redux'
import {Icon, Button} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {DesktopContainer} from './Home'

class MyCart extends Component {
  constructor() {
    super()
    if (JSON.parse(localStorage.getItem('cart'))) {
      this.state = {
        localCart: this.fixLocalCart(JSON.parse(localStorage.getItem('cart'))),
        arr: null
      }
    } else {
      this.state = {
        localCart: [],
        arr: null
      }
    }

    this.handleClick = this.handleClick.bind(this)
    this.handleClearCart = this.handleClearCart.bind(this)
  }

  componentDidMount() {
    console.log(this.state.localCart)
    console.log(JSON.parse(localStorage.getItem('cart')))
    this.fixLocalCart(this.state.localCart)
    this.props.getCartThunk()
  }
  //delete button
  handleClick(e, product) {
    e.preventDefault()
    const localCart = this.state.localCart
    if (this.props.user.id) {
      console.log('trying to delete')
      this.props.removeFromCartThunk(product.id)
      this.props.getCartThunk()
      this.props.getCartThunk()
    } else {
      for (let i = 0; i < this.state.localCart.length; i++) {
        if (this.state.localCart[i].id === product.id) {
          localCart.splice(i, 1)
          this.setState({
            localCart: localCart
          })
          localStorage.setItem('cart', JSON.stringify(this.state.localCart))
        }
      }
    }
  }
  async handlePlus(e, product) {
    e.preventDefault()
    if (this.props.user.id) {
      await this.props.plusOneThunk(product)
      this.props.getCartThunk()
      console.log(product.cart.quantity)
    } else {
      let arr = JSON.parse(localStorage.getItem('cart'))
      arr.push(product)
      localStorage.setItem('cart', JSON.stringify(arr))
      this.setState({
        localCart: this.state.localCart
      })
    }
  }

  async handleMinus(e, product) {
    e.preventDefault()
    await this.props.minusOneThunk(product)
    this.props.getCartThunk()
  }

  async handleCheckout(e) {
    e.preventDefault()
    await this.props.checkoutThunk()
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

  handleClearCart(e) {
    e.preventDefault()
    this.setState({
      localCart: []
    })
    localStorage.clear()
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
    this.setState({
      localCart: newArr
    })
    return newArr
  }
  displayQuantity(product) {
    let count = 0
    let arr = JSON.parse(localStorage.getItem('cart'))
    for (let i = 0; i < arr.length; i++) {
      if (product.id === arr[i].id) {
        count++
      }
    }
    return count
  }

  render() {
    return (
      <div>
        <DesktopContainer />
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
                    onClick={e => this.handleCheckout(e)}
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
          //Loads if the local cart is full
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
              {this.state.localCart &&
                this.state.localCart.map(product => (
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
                      {this.displayQuantity(product)}
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
                    onClick={e => this.handleCheckout(e)}
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
    minusOneThunk: product => dispatch(minusOneThunk(product)),
    checkoutThunk: () => dispatch(checkoutThunk())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MyCart)
