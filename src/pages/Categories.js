import React, { useEffect } from 'react'
import CartList from '../components/CartList'
import LeftMenuContent from '../components/LeftMenuContent'
import Container from './Container'
import EditCategoryList from '../components/EditCategoryList'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import qs from 'qs'


import * as productActions from '../public/redux/actions/product'
import * as categoryActions from '../public/redux/actions/category'
import * as cartActions from '../public/redux/actions/cart'
import * as miscActions from '../public/redux/actions/misc'
import * as userActions from '../public/redux/actions/user'
import Axios from 'axios'

function Home(props) {
    if(!props.authData.data.id) props.history.push('/signin')
    //Init
    useEffect(() => {
        props.miscAction.setState({openLeftMenu: false, openRightMenu: false})
        //Load initial categories
        Axios.get(`${process.env.REACT_APP_API_HOST}/categories`, {headers:{'Authorization': props.authData.data.token}} )
            .then(response => {
                if (response.status === 200){
                    props.categoryAction.setData(response.data.data)
                }
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    //Render
    return (
        <React.Fragment>
            <Container leftMenu={<LeftMenuContent {...props} />} {...props}>
                <EditCategoryList {...props} />
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