import React, {Component} from 'react'
import {connect} from 'react-redux'
import {gotAllProductsThunk} from '../store/products'
import {Link} from 'react-router-dom'

class AllProducts extends Component {
  componentDidMount() {
    this.props.gotAllProductsThunk()
  }

  render() {
    return (
      <div>
        <div id="products-container" className="left-container">
          {this.props.products.map(product => (
            <div key={product.id}>
              <div>{product.name}</div>
              <div>
                <Link to={`/AllProducts/${product.id}`}>
                  <img src={product.imageUrl} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  products: state.products
})
const mapDispatch = dispatch => ({
  gotAllProductsThunk: () => dispatch(gotAllProductsThunk())
})
export default connect(mapState, mapDispatch)(AllProducts)
