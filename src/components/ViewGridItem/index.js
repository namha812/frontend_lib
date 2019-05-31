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
		justifyContent: "center"
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
	const { classes, anonymous = false, onSelectedBook } = props;
	return (
		<React.Fragment>
			<div className={classes.container}>
				{dataMock.map((data, index) => (
					<div key={index} className={classes.gridItem}>
						<Item
							anonymous={anonymous}
							url={data.url}
							name={data.name}
							content={data.content}
							author={data.author}
							onSelectedBook={onSelectedBook}
							bookItem={data}
						/>
					</div>
				)
				)}
			</div>
		</React.Fragment>

	);
}

MediaCard.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MediaCard);
