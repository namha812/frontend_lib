import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Pagination from "material-ui-flat-pagination";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Item from './Item';
import Details from './Details';
import _ from 'lodash';
const styles = {
	container: {
		display: "flex",
		flexWrap: "wrap",
		justifyContent: "center-between",
		display: 'grid',
		gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
		gridGap: '30px',
		paddingLeft: '25px',
		paddingTop: '25px',
		paddingRight: '25px'
	},
	gridItem: {
		// marginTop: 15,
		// maxWidth: 320
	},
	headerTitle: {
		padding: 20
	},
	widgetTitle: {
		textTransform: "uppercase",
		margin: "10px 0",
		borderLeft: "4px solid #f39c12",
		paddingLeft: 10,
		fontVariant: "small-caps",
		fontWeight: "bold",
		color: "#2196F3",
		borderBottom: "1px solid #ccc",
		fontFamily: "Roboto",
		fontSize: 18
	}
};

class MediaCard extends Component {

	state = {
		offset: 0,
		page: 0,
		itemsPerPage: 15,
		currentItem: {},
		open: false
	}

	get books() {
		const { books = [], searchValue } = this.props;
		const booksFilter = books.filter(item => {
			return item.isActive;
		})
		return booksFilter.filter(item => {
			return _.includes(_.toLower(item.bookName), _.toLower(searchValue));
		})
	}

	get listItem() {
		const { page, itemsPerPage } = this.state;
		return _.slice(this.books, page * itemsPerPage, page * itemsPerPage + itemsPerPage);
	}
	handleClick(offset) {
		const { itemsPerPage } = this.state;
		this.setState({ offset, page: (offset + itemsPerPage) / itemsPerPage - 1 });
	}

	onClickItem = (item) => () => {
		this.setState({
			open: true,
			currentItem: item
		})
	}

	handleClose = () => {
		this.setState({
			open: false,
			currentItem: {}
		})
	}

	handleBorrow = () => {
		const { currentItem } = this.state;
		this.props.onSelectedBook(currentItem);
		this.handleClose();
	}

	render() {
		const { classes, inBorrowTab = false, onSelectedBook, books = [], routeType } = this.props;
		const { itemsPerPage } = this.state;

		return (
			<React.Fragment>
				<div className={classes.container}>
					{this.listItem.map((book, index) => {
						return (<div key={index} className={classes.gridItem}>
							<Item
								onClickItem={this.onClickItem}
								anonymous={!inBorrowTab}
								imageUrl={book.imageUrl}
								name={book.bookName}
								content={book.content}
								author={book.author}
								quantity={book.quantity}
								onSelectedBook={onSelectedBook}
								bookItem={book}
							/>
						</div>
						)
					}
					)}
				</div>
				<Dialog
					open={this.state.open}
					onClose={this.handleClose}
					aria-labelledby="form-dialog-title"
				>
					<DialogTitle id="form-dialog-title">Chi tiết</DialogTitle>
					<DialogContent>
						<Details inBorrowTab={inBorrowTab} item={this.state.currentItem} />
					</DialogContent>
					<DialogActions>
						<Button onClick={this.handleClose} color="primary">
							Hủy
						</Button>
						{inBorrowTab && <Button onClick={this.handleBorrow} color="primary">
							Mượn
						</Button>}
					</DialogActions>
				</Dialog>
				<div className="pagination" style={{ textAlign: 'center', marginBottom: 20 }}>
					<Pagination
						limit={itemsPerPage}
						offset={this.state.offset}
						total={this.books.length}
						onClick={(e, offset) => this.handleClick(offset)}
						size="large"
					/>
				</div>
			</React.Fragment>
		);
	}
}

MediaCard.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MediaCard);
