import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';

const styles = theme => ({
  card: {
    maxWidth: 400,
    minWidth: 380
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    backgroundSize: 'contain'
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8,
    },
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

class RecipeReviewCard extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes, item, inBorrowTab } = this.props;
    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatar}>
              {item.bookName ? item.bookName.slice(0,1) : ""}
            </Avatar>
          }
          title={<span style={{fontWeight: 'bold'}}>{item.bookName}</span>}
          subheader={<div><span>Tác giả: {item.author}</span><br></br>
          <span>Thể Loại: {item.category ? item.category.name : ""}</span><br></br>
          <span>Số lượng còn lại: {item.quantity}</span>
          </div>}
        />
        <CardMedia
          className={classes.media}
          image={item.imageUrl || "https://cor-cdn-static.bibliocommons.com/assets/default_covers/icon-book-93409e4decdf10c55296c91a97ac2653.png"}
          title="Paella dish"
        />
        <CardContent>
          <Typography component="p">
            {item.content}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

RecipeReviewCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RecipeReviewCard);