import React, {Component} from 'react'
import {connect} from 'react-redux'
import {gotAllProductsThunk} from '../store/products'

class Music extends Component {
  componentDidMount() {
    this.props.gotAllProductsThunk()
  }

  render() {
    const filtered = this.props.products.filter(
      product => product.category === 'music'
    )
    return (
      <div>
        <div id="products-container" className="left-container">
          {filtered.map(product => (
            <div key={product.id}>
              <div>{product.name}</div>
              <div>
                <img src={product.imageUrl} />
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
export default connect(mapState, mapDispatch)(Music)
