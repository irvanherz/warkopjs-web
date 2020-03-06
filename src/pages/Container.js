import React, { useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline'
import LeftMenu from '../components/LeftMenu'
import RightMenu from '../components/RightMenu'
import MainAppBar from '../components/MainAppBar';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as productActions from "../public/redux/actions/product";
import * as categoryActions from "../public/redux/actions/category";
import * as cartActions from "../public/redux/actions/cart"
import * as miscActions from "../public/redux/actions/misc"

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  content: {
    padding: theme.spacing(1),
    marginTop: theme.spacing(10),
    marginLeft: theme.spacing(7),
    zIndex: 0
  },
  content2: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift2: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },

}));

function Container(props) {
  const classes = useStyles();

  //Init
  useEffect(() => {
    props.miscAction.setState({openLeftMenu: false, openRightMenu: false})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //Render
  return (
    <React.Fragment>
      <div className={classes.root}>
        <CssBaseline />
        <MainAppBar {...props} />

        <main className={classes.content + " " + clsx(classes.content2, { [classes.contentShift2]: props.miscData.openRightMenu, })}>
          {props.children}
        </main>

        <LeftMenu header={props.leftMenuHeader} content={props.leftMenu} {...props} />
        <RightMenu header={props.rightMenuHeader} content={props.rightMenu} {...props} />

      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Container)