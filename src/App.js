import React, { useState } from 'react'
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom'
import Main from './pages/Main'
import Home from './pages/Home'
import Products from './pages/Products'
import Users from './pages/Users'
import Categories from './pages/Categories'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Statistics from './pages/Statistics'
import axios from 'axios'
import { withSnackbar } from 'notistack'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'


import * as productActions from './public/redux/actions/product'
import * as categoryActions from './public/redux/actions/category'
import * as cartActions from './public/redux/actions/cart'
import * as miscActions from './public/redux/actions/misc'
import * as authActions from './public/redux/actions/auth'
import * as userActions from './public/redux/actions/user'
import * as reportActions from './public/redux/actions/report'


function App (props) {
    return(
        <React.Fragment>
            <Switch>
                <Route exact path='/'><Main {...props} /></Route>
                <Route path='/home'><Home {...props} /></Route>
                <Route path='/products'><Products {...props} /></Route>
                <Route path='/users'><Users {...props} /></Route>
                <Route path='/signin'><Signin {...props}/></Route>
                <Route path='/signup'><Signup {...props}/></Route>
                <Route path='/categories'><Categories {...props}/></Route>
                <Route path='/statistics'><Statistics {...props} /></Route>
            </Switch>
        </React.Fragment>
    )
}

const mapStateToProps = state => ({
    miscData: state.misc,
    cartData: state.cart,
    productData: state.product,
    authData: state.auth,
    categoryData: state.category,
    userData: state.user,
    reportData: state.report
})

const mapDispatchToProps = dispatch => ({
    miscAction: bindActionCreators(miscActions, dispatch),
    productAction: bindActionCreators(productActions, dispatch),
    categoryAction: bindActionCreators(categoryActions, dispatch),
    cartAction: bindActionCreators(cartActions, dispatch),
    authAction: bindActionCreators(authActions, dispatch),
    userAction: bindActionCreators(userActions, dispatch),
    reportAction: bindActionCreators(reportActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(withRouter(App)))
