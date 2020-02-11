import { combineReducers } from "redux";

import auth from './auth'
import product from './product'
import category from './category'
import cart from './cart'
import user from './user'
import report from './report'
import misc from './misc'

export default combineReducers({auth, product, category, cart, user, report, misc})