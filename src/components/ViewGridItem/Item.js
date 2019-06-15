import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { CardActions, Button } from "@material-ui/core";

const styles = theme => ({
    card: {
        display: "flex",
        maxWidth: 350,
        height: 240,
        minWidth: 350
    },
    details: {
        maxWidth: 240,
        display: "flex",
        flexDirection: "column"
    },
    content: {
        flex: "1 0 auto",
        padding: 15
    },
    cover: {
        minWidth: 160
    },
    badge: {
        top: 10,
        right: -10,
        // The border color match the background color.
        border: `2px solid ${
            theme.palette.type === "light"
                ? theme.palette.grey[200]
                : theme.palette.grey[900]
            }`
    }
});
const descriptionDefault = "Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10 minutes."
function MediaControlCard(props) {
    const { onSelectedBook, bookItem, anonymous, classes, imageUrl, name, author, quantity, content = descriptionDefault } = props;
    const onClickbook = (event) => {
        event.stopPropagation();
        onSelectedBook(bookItem);
    }
    return (
        <Card onClick={props.onClickItem(bookItem)} className={classes.card}>
            <CardMedia
                className={classes.cover}
                image={imageUrl || "https://cor-cdn-static.bibliocommons.com/assets/default_covers/icon-book-93409e4decdf10c55296c91a97ac2653.png"}
                title="Live from space album cover"
            />
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <div style={{height: 60, fontSize: 18, fontFamily: '"Roboto", "Helvetica", "Arial"'}}>
                        <span>{name}</span>
                    </div>
                    <div style={{height: 50, fontSize: 14, fontFamily: '"Roboto", "Helvetica", "Arial"', color: 'rgba(0, 0, 0, 0.54)'}}>
                        <span>{author}</span>
                    </div>
                    <div style={{height: 15, fontSize: 14, fontFamily: '"Roboto", "Helvetica", "Arial"', color: 'rgba(0, 0, 0, 0.54)'}}>
                        <span>Số lượng còn lại: {quantity}</span>
                    </div>
                    <div style={{paddingTop: 10, height: 60, fontSize: 14, fontFamily: '"Roboto", "Helvetica", "Arial"', color: 'rgba(0, 0, 0, 0.54)'}}>
                        <span>Nội dung: {content ? content.slice(0, 60) + " ...xem thêm" : ""}</span>
                    </div>
                    {!anonymous && <CardActions>
                        <Button size="small" color="primary" onClick={onClickbook}>
                            Thêm vào giỏ
                        </Button>
                    </CardActions>}
                </CardContent>
            </div>
        </Card>
    );
}

MediaControlCard.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(MediaControlCard);
