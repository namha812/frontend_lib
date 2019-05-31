import React, { Component } from 'react';
import ViewGridItem from '../ViewGridItem';
import Cart from '../Cart';
import Searchbox from '../Searchbox';
import { withStyles } from "@material-ui/core/styles";


const styles = theme => ({
	card: {
		display: "flex",
	},
	details: {
		maxWidth: 240,
		display: "flex",
		flexDirection: "column"
	},
	content: {
		flex: "1 0 auto"
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

class BorrowBook extends Component {
	state = {
		selectedBook: [],
	}

	onSelectedBook = (book) => {
		console.log(book);
		this.setState(state => {
			return {
				...state,
				selectedBook: [...state.selectedBook, book]
			}
		})
	}

	render() {
		const { classes } = this.props;
		const { selectedBook } = this.state;
		return (
			<div>
				<div className={classes.card}>
					<div>
						<Searchbox />
						<ViewGridItem onSelectedBook={this.onSelectedBook}/>
					</div>
					<Cart selectedBook={selectedBook}/>
				</div>
			</div>

		)
	}
}

export default withStyles(styles, { withTheme: true })(BorrowBook);