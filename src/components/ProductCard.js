import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import currencyFormatter from 'currency-formatter'
import ProductDetailsDialog from './ProductDetailsDialog'

const useStyles = makeStyles(theme => ({
    card: {
        margin: theme.spacing(1),
        display: 'inline-block'
    },
    media: {
        width: "100%",
        height: "auto",
    },
    overlay: {
        color: "#FFF",
        position: "absolute",
        top: 0,
        width: "100%",
        height: "100%",
        textAlign: "center",
        background: "rgba(0,0,0,0.6)"
    },
    overlayContent: {
        top: "50%",
        transform: "translateY(-50%)",
        position: "relative"
    }
}));

export default function ProductCard(props) {
    const classes = useStyles();
    const isOnCart = props.cartItems.some((item) => {
        if (item.id === props.product.id) return true;
        else return false
    })

    function onClickProduct() {
        if (isOnCart) {
            const newCartItems = props.cartItems.filter((item) => {
                if (item.id === props.product.id) {
                    return false
                } else {
                    return true
                }
            })
            props.setCartItems(newCartItems)
        } else {
            const newCartItem = { ...props.product, qty: 1 }
            props.setCartItems([...props.cartItems, newCartItem])
        }
    }

    return (
        <React.Fragment>
            <Card className={classes.card}>
                <CardActionArea focusRipple key={props.product.name} focusVisibleClassName={classes.focusVisible}>
                    <div style={{ display: "block", position: "relative" }}>
                        <CardMedia className={classes.media}
                            component="img"
                            alt="Contemplative Reptile"
                            image={props.product.image ? `http://localhost:3001/assets/${props.product.image}` : 'http://localhost:3001/assets/noimage.jpg'}
                            title="Contemplative Reptile"
                        ></CardMedia>
                        {isOnCart ?
                            (<div className={classes.overlay}>
                                <div className={classes.overlayContent}><CheckCircleOutlineIcon /></div>
                            </div>) : ('')}
                    </div>

                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {props.product.name}
                        </Typography>
                        <Typography gutterBottom variant="h7" component="h3">
                            {currencyFormatter.format(props.product.price, { code: 'IDR' })}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {props.product.description}
                        </Typography>
                    </CardContent>
                    <CardActions style={{ justifyContent: "center" }}>
                        <Button size="small" color="primary" onClick={onClickProduct}>
                            {isOnCart ? 'Remove from Cart' : 'Add to Cart'}
                        </Button>
                    </CardActions>
                </CardActionArea>
            </Card>
        </React.Fragment>
    )
}
