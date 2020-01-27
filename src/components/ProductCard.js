import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import StyledBadge from '@material-ui/core/Badge';
import Typography from '@material-ui/core/Typography';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

const useStyles = makeStyles(theme => ({
    card: {
        margin: theme.spacing(1),
        display: 'inline-block'
    },
    media: {
        height: 140,
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

export default function ProductCard(product) {
    const classes = useStyles();
    return (
    <React.Fragment>
    <Card className={classes.card}>
        <CardActionArea
        focusRipple
        key={product.name}
        className={classes.image}
        focusVisibleClassName={classes.focusVisible}
        >
        <div style={{display:"block",position:"relative"}}>
            <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="140"
                image="https://hellosehat.com/wp-content/uploads/2018/11/kopi-decaf.jpg"
                title="Contemplative Reptile"
            ></CardMedia>
            <div className={classes.overlay}>
                <div className={classes.overlayContent}><CheckCircleOutlineIcon /></div>
            </div>
        </div>
        
        <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
            Lizard
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
            </Typography>
        </CardContent>
        <CardActions style={{ justifyContent: "center" }}>
            <Button size="small" color="primary">
            Add
            </Button>
            <Button size="small" color="primary">
            Learn More
            </Button>
        </CardActions>
        </CardActionArea>
    </Card>
    </React.Fragment>
    )
}