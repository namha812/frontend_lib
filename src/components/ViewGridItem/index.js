import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Item from './Item';
import dataMock from './data.json';

const styles = {
	container: {
		display: "flex",
		flexWrap: "wrap",
		margin: "0 auto",
	},
	gridItem: {
		margin: 20,
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

function MediaCard(props) {
	const { classes, inBorrowTab = false, onSelectedBook, books = [] } = props;
	console.log(props);
	return (
		<React.Fragment>
			<div className={classes.container}>
				{books.map((book, index) => {
					if(!book.active){
						return null;
					}
					return(<div key={index} className={classes.gridItem}>
							<Item
								anonymous={!inBorrowTab}
								url={book.url}
								name={book.name}
								content={book.content}
								author={book.author}
								onSelectedBook={onSelectedBook}
								bookItem={book}
							/>
					</div>
					)}
				)}
			</div>
		</React.Fragment>

	);
}

MediaCard.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MediaCard);
