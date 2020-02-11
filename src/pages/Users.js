import React, { useEffect } from 'react';
import CartList from '../components/CartList';
import LeftMenuContent from '../components/LeftMenuContent';
import Container from './Container'
import UserList from '../components/UserList';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


import * as productActions from "../public/redux/actions/product";
import * as categoryActions from "../public/redux/actions/category";
import * as cartActions from "../public/redux/actions/cart"
import * as miscActions from "../public/redux/actions/misc"
import * as userActions from "../public/redux/actions/user"
import Axios from 'axios';

function Home(props) {
  if(!props.authData.data.id) props.history.push('/signin')
  //Init
  useEffect(() => {
    props.miscAction.setState({openLeftMenu: false, openRightMenu: false})
    Axios.get('http://127.0.0.1:3001/users', {headers:{'Authorization': props.authData.data.token}} )
      .then(response => {
        if (response.status === 200)
            props.userAction.setData(response.data.data)
      })
  }, [])

  //Render
  return (
    <React.Fragment>
      <Container leftMenu={<LeftMenuContent {...props} />} {...props}>
        <UserList {...props} />
      </Container>
    </React.Fragment>
  )
}


const mapStateToProps = state => ({
  miscData: state.misc,
  cartData: state.cart,
  productData: state.product,
  categoryData: state.category,
  userData: state.user
})
const mapDispatchToProps = dispatch => ({
  miscAction: bindActionCreators(miscActions, dispatch),
  productAction: bindActionCreators(productActions, dispatch),
  categoryAction: bindActionCreators(categoryActions, dispatch),
  cartAction: bindActionCreators(cartActions, dispatch),
 userAction: bindActionCreators(userActions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)