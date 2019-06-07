import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Pagination from "material-ui-flat-pagination";
import Item from './Item';
import _ from 'lodash';
const styles = {
	container: {
		display: "flex",
		flexWrap: "wrap",
		margin: "0 auto",
	},
	gridItem: {
		margin: 20,
		maxWidth: 320
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
		itemsPerPage: 15
	}

	get books() {
		const { books, searchValue } = this.props;
		const booksFilter = books.filter(item => {
			return item.isActive === 1;
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

	render() {
		const { classes, inBorrowTab = false, onSelectedBook, books = [] } = this.props;
		const { itemsPerPage } = this.state;

		return (
			<React.Fragment>
				<div className={classes.container}>
					{this.listItem.map((book, index) => {
						return (<div key={index} className={classes.gridItem}>
							<Item
								anonymous={!inBorrowTab}
								url={book.url}
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
