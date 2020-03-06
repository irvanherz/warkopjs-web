import React, { useEffect } from 'react';
import ProductList from '../components/ProductList'
import SearchBar from '../components/SearchBar'
import CartList from '../components/CartList';
import LeftMenuContent from '../components/LeftMenuContent';
import Container from './Container'

import StyledBadge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Axios from 'axios';

//Menu Icon in MainAppBar
function CartMenuIcon(props) {
  let numItems = props.cartData.items.reduce((accumulator, item) => {
    return accumulator + item.qty
  }, 0)
  if(numItems){
    return (<StyledBadge badgeContent={numItems} color="secondary"><ShoppingCartIcon /></StyledBadge>)
  } else
    return(<ShoppingCartIcon />
  )
}

function Home(props) {
  if(!props.authData.data.id) props.history.push('/signin')
  //Init
  useEffect(() => {
    props.miscAction.setState({openLeftMenu: false, openRightMenu: true})
    //Load initial products
    Axios.get(`${process.env.REACT_APP_API_HOST}/products`, {headers:{'Authorization': props.authData.data.token}} )
      .then(response => {
        if (response.status === 200)
            props.productAction.setData(response.data.data)
      })
    //Load initial categories
    Axios.get(`${process.env.REACT_APP_API_HOST}/categories`, {headers:{'Authorization': props.authData.data.token}} )
      .then(response => {
        if (response.status === 200)
            props.categoryAction.setData(response.data.data)
      })
  }, [])

  //Render
  return (
    <React.Fragment>
      <Container leftMenu={<LeftMenuContent {...props} />} rightMenu={<CartList {...props} />} rightMenuIcon={<CartMenuIcon {...props} />} {...props}>
          <SearchBar {...props} />
          <ProductList {...props} />
      </Container>
    </React.Fragment>
  )
}


export default Home