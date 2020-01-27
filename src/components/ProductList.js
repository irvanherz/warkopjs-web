import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import ProductCard from './ProductCard'

const useStyles = makeStyles(theme => ({
    productListContainer: {
        flexGrow: 1,
        columnCount: 3,
        [theme.breakpoints.down('sm')]: {
            columnCount: 2,
        },
        [theme.breakpoints.down('xs')]: {
            columnCount: 1,
        },
      },
}))

export default function ProductList(props){
    const classes = useStyles();
    return(
        <Box className={classes.productListContainer}>
        {props.products.map(product => <ProductCard key={product.id} {...product} /> )}
        </Box>
    )
}