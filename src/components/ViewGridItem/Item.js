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
        maxWidth: 400,
        height: 240
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
        width: 151
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
    const { onSelectedBook, bookItem, anonymous, classes, imgUrl, name, author, remainNumber = 30, description = descriptionDefault } = props;
    const onClickbook = () => {
        onSelectedBook(bookItem);
    }
    return (
        <Card className={classes.card}>
            <CardMedia
                className={classes.cover}
                image={imgUrl || "http://inthanhdat.com.vn/source/Cataloque/thiet-ke-bia-sach-01.jpg"}
                title="Live from space album cover"
            />
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography component="h5" variant="h5">
                        {name}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        {author}
                    </Typography>
                    <Badge
                        classes={{ badge: classes.badge }}
                        badgeContent={remainNumber}
                        color="primary"
                    >
                        <ShoppingCartIcon />
                    </Badge>
                    <Typography paragraph>
                        {description}
                    </Typography>
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
