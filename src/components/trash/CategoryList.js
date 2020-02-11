import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import CartItem from '../CartItem';
import CheckoutDialog from '../CheckoutDialog';
import axios from 'axios'
import { withSnackbar } from 'notistack';
import CategoryItem from './CategoryItem'

export default function CategoryList(props) {
  return (
    <React.Fragment>
        <List>
            {props.categoryData.items.map((item) => <CategoryItem key={item.name} target={item} {...props} />)}
        </List>
    </React.Fragment>
  )
}