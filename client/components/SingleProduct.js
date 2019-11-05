import React, {Component} from 'react'
import {connect} from 'react-redux'
import {gotProductThunk} from '../store/singleproduct'

class SingleProduct extends Component {
  componentDidMount() {
    this.props.gotProductThunk(this.props.match.params.id)
  }

  render() {
    const singleProduct = this.props.singleproduct
    console.log(singleProduct)
    return (
      <div>
        <div id="products-container" className="left-container">
          <div>{singleProduct.name}</div>
          <img src={singleProduct.imageUrl} />
          <div>${singleProduct.price}</div>
          <div>{singleProduct.description}</div>
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  singleproduct: state.singleproduct
})
const mapDispatch = dispatch => ({
  gotProductThunk: id => dispatch(gotProductThunk(id))
})
export default connect(mapState, mapDispatch)(SingleProduct)
