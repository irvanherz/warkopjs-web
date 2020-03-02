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
import EditProductDialog from './EditProductDialog';

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

export default function EditProductCard(props) {
    const classes = useStyles();


    return (
        <React.Fragment>
            <Card className={classes.card}>
                <CardActionArea focusRipple key={props.target.name} focusVisibleClassName={classes.focusVisible}>
                    <div style={{ display: "block", position: "relative" }}>
                        <CardMedia className={classes.media}
                            component="img"
                            image={props.target.image ? `${props.target.image}` : 'http://localhost:3001/assets/noimage.jpg'}
                            title="Contemplative Reptile"
                        ></CardMedia>
                    </div>

                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {props.target.name}
                        </Typography>
                        <Typography gutterBottom variant="h7" component="h3">
                            {currencyFormatter.format(props.target.price, { code: 'IDR' })}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {props.target.description}
                        </Typography>
                    </CardContent>
                    <CardActions style={{ justifyContent: "center" }}>
                        <EditProductDialog {...props} />
                    </CardActions>
                </CardActionArea>
            </Card>
        </React.Fragment>
    )
}
