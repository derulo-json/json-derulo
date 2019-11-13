import React, {Component} from 'react'
import {connect} from 'react-redux'
import {gotAllProductsThunk} from '../store/products'
import {Link} from 'react-router-dom'
import {DesktopContainer} from './Home'

// become a functional component that connects to the store and maps to products
class AllProducts extends Component {
  componentDidMount() {
    this.props.gotAllProductsThunk()
  }

  render() {
    let filtered = []
    if (this.props.category === 'all') {
      filtered = this.props.products
    } else {
      filtered = this.props.products.filter(
        product => product.category === this.props.category
      )
    }

    return (
      <div>
        <DesktopContainer />
        <div id="products-container" className="left-container">
          {filtered.map(product => (
            <div key={product.id}>
              <div>{product.name}</div>
              <div>
                <Link to={`/AllProducts/${product.id}`}>
                  <img id="AllProducts" src={product.imageUrl} />
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
