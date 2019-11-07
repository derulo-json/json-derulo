import React, {Component} from 'react'
import {getCartThunk} from '../store/CartReducer'
import {connect} from 'react-redux'
import {Icon, Button} from 'semantic-ui-react'

class MyCart extends Component {
  componentDidMount() {
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
            {/* <tr>  
               <td key = 'products'>
                 <Button type="button" color="teal" > 
                   <Icon trash='trash' name='trash'/>  
                 </Button>
               </td> 
            </tr> */}
            {this.props.cart.cart &&
              this.props.cart.cart.products.map(product => (
                <tr key="hello">
                  <td key="products">
                    <Button type="button" color="teal">
                      <Icon trash="trash" name="trash" />
                    </Button>
                  </td>
                  <td>
                    {product.name}
                    <img
                      src={product.imageUrl}
                      width="92px"
                      style="position: relative"
                    />
                  </td>
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
                <div className="ui small button">Continue Shopping</div>
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
    getCartThunk: () => dispatch(getCartThunk())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MyCart)
