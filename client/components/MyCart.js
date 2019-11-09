import React, {Component} from 'react'
import {getCartThunk, removeFromCartThunk} from '../store/CartReducer'
import {connect} from 'react-redux'
import {Icon, Button} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

class MyCart extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount() {
    this.props.getCartThunk()
  }
  handleClick(e, product) {
    e.preventDefault()
    this.props.removeFromCartThunk(product.id)
    this.props.getCartThunk()
  }
  render() {
    return (
      <div>
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
                  <td>{product.cart.quantity}</td>
                  <td>{product.price}</td>
                </tr>
              ))}
          </tbody>
          <tfoot className="full-width">
            <tr>
              <th />
              <th colSpan="4">
                <div className="ui right floated small primary labeled icon button">
                  <Icon className="shopping cart" /> Checkout
                </div>
                <Link to="/allproducts">
                  <div className="ui small button">Continue Shopping</div>
                </Link>
                <div className="ui small  button">Empty Cart</div>
              </th>
            </tr>
          </tfoot>
        </table>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getCartThunk: () => dispatch(getCartThunk()),
    removeFromCartThunk: id => dispatch(removeFromCartThunk(id))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MyCart)
