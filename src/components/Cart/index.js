import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';

const CustomTableCell = withStyles(theme => ({
	head: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	body: {
		fontSize: 14,
	},
}))(TableCell);

const styles = theme => ({
	root: {
		marginTop: theme.spacing.unit * 3,
		overflowX: 'auto',
	},
	table: {
		minWidth: 500,
	},
	row: {
		'&:nth-of-type(odd)': {
			backgroundColor: theme.palette.background.default,
		},
	},
	container: {
		display: "flex",
		flexWrap: "wrap",
		justifyContent: "center"
	},
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		width: 250
	},
	dense: {
		marginTop: 19
	},
	menu: {
		width: 200
	},
	textLabel: {
		fontSize: 30,
		padding: 10,
		textAlign: "center"
	},
	button: {
		margin: 16
	},
	submitField: {
		textAlign: "center"
	}
});

class Cart extends React.Component {

	state = {
		username: "",
		address: "",
		phone: "",
		date: "",
		listItem: []
	}

	handleChange = name => event => {
		this.setState({
			[name]: event.target.value
		});
	};

	handleDeleteClick = row => () => {
		const { removeBook } = this.props;
		removeBook(row);
	}
	render() {
		const { classes } = this.props;
		const { selectedBook } = this.props;
		if(!selectedBook.length) {
			return null;
		}
		return (
			<Paper className={classes.root}>
				<Table className={classes.table}>
					<TableHead>
						<TableRow>
							<CustomTableCell>Mã</CustomTableCell>
							<CustomTableCell>Tên ấn phẩm</CustomTableCell>
							<CustomTableCell>Xóa</CustomTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{selectedBook.map(row => {
							return (
								<TableRow className={classes.row} key={row.id}>
									<CustomTableCell component="th" scope="row">
										{row.id}
									</CustomTableCell>
									<CustomTableCell component="th" scope="row">
										{row.name}
									</CustomTableCell>
									<CustomTableCell>
										<IconButton onClick={this.handleDeleteClick(row)}>
											<DeleteIcon />
										</IconButton>
									</CustomTableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
				<div className={classes.textLabel}>Độc giả</div>
				<form className={classes.container} noValidate autoComplete="off">
					<TextField
						required
						id="standard-name"
						label="Tên độc giả"
						className={classes.textField}
						value={this.state.name}
						onChange={this.handleChange("username")}
						margin="normal"
					/>
					<TextField
						required
						id="standard-uncontrolled"
						label="Địa chỉ"
						defaultValue=""
						className={classes.textField}
						margin="normal"
						onChange={this.handleChange("address")}

					/>
					<TextField
						required
						id="standard-required"
						label="Số điện thoại"
						defaultValue=""
						className={classes.textField}
						onChange={this.handleChange("phone")}
						margin="normal"
					/>
					<TextField
						required
						id="standard-error"
						label="Ngày mượn"
						defaultValue=""
						onChange={this.handleChange("date")}
						className={classes.textField}
						margin="normal"
					/>
				</form>
				<div className={classes.submitField}>
					<Button variant="contained" color="primary" className={classes.button}>
						Lưu
        </Button>
					<Button variant="contained" className={classes.button}>
						Hủy
        </Button>
				</div>
			</Paper>
		);
	}


}

Cart.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Cart);