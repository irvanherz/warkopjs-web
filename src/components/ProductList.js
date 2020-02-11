import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import ProductCard from './ProductCard'
import Pagination from './Pagination'

const useStyles = makeStyles(theme => ({
    productListContainer: {
        flexGrow: 1,
        columns: '250px',
      },
}))

export default function ProductList(props){
    const [productDetailsDialogState, setProductDetailsDialogState] = React.useState(false)
    const classes = useStyles();
    return(
        <React.Fragment>
            <Box className={classes.productListContainer}>
                {props.productData.items.map(product => <ProductCard key={product.name} product={product} productDetailsDialogState={productDetailsDialogState} setProductDetailsDialogState={setProductDetailsDialogState} {...props} /> )}
            </Box>
            {/* <Box style={{textAlign:'center'}}>
                <Pagination products={props.products} viewParameters={props.viewParameters} setViewParameters={props.setViewParameters}/>
            </Box> */}
        </React.Fragment>
    )
    
}

