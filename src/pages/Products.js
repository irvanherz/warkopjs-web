import React, { useEffect } from 'react';
import EditProductList from '../components/EditProductList'
import SearchBar from '../components/SearchBar'
import LeftMenuContent from '../components/LeftMenuContent';
import Container from './Container'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


import * as productActions from "../public/redux/actions/product";
import * as categoryActions from "../public/redux/actions/category";
import * as cartActions from "../public/redux/actions/cart"
import * as miscActions from "../public/redux/actions/misc"
import Axios from 'axios';

function Products(props) {
  if(!props.authData.data.id) props.history.push('/signin')
  //Init
  useEffect(() => {
    props.miscAction.setState({openLeftMenu: false, openRightMenu: false})
    //Load initial products
    Axios.get('http://127.0.0.1:3001/products', {headers:{'Authorization': props.authData.data.token}} )
      .then(response => {
        if (response.status === 200)
            props.productAction.setData(response.data.data)
      })
    //Load initial categories
    Axios.get('http://127.0.0.1:3001/categories', {headers:{'Authorization': props.authData.data.token}} )
      .then(response => {
        if (response.status === 200)
            props.categoryAction.setData(response.data.data)
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //Render
  return (
    <React.Fragment>
      <Container leftMenu={<LeftMenuContent {...props} />} {...props}>
        <SearchBar {...props} />
          <EditProductList {...props} />
      </Container>
    </React.Fragment>
  )
}


const mapStateToProps = state => ({
  miscData: state.misc,
  cartData: state.cart,
  productData: state.product,
  categoryData: state.category
})

const mapDispatchToProps = dispatch => ({
  miscAction: bindActionCreators(miscActions, dispatch),
  productAction: bindActionCreators(productActions, dispatch),
  categoryAction: bindActionCreators(categoryActions, dispatch),
  cartAction: bindActionCreators(cartActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Products)


