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
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';

import cx from 'classnames';

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
		minWidth: 480
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
		justifyContent: "center",
		flexWrap: "wrap"
	},
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		width: "90%"
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
	},
	formControl: {
		margin: theme.spacing.unit,
		minWidth: 120,
		width: "90%"
	},
	selectEmpty: {
		marginTop: theme.spacing.unit,
	  },
});

class Cart extends React.Component {

	state = {
		selectedStudent: {}
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

	onBorrowClick = () => {
		const { selectedBook, borrowBook, classes, students = [] } = this.props;
		const { selectedStudent } = this.state;
		const borrowPay = selectedBook.map(book => {
			return {
				bookId: book.id,
				quantity: book.number
			}
		});
		const data = {
			borrowPay,
			expiryDate: "2019-06-09",
			studentId: selectedStudent.id
		}
		borrowBook(data);
		this.setState({ selectedStudent: {} })
	}

	onCancelClick = () => {
		const { onCancelClick } = this.props;
		onCancelClick();
	}

	onChangeSelected = (event) => {
		const { students } = this.props;
		const { value } = event.target;
		const selectedStudent = students.filter(item => item.id === value);
		this.setState({ selectedStudent: selectedStudent[0] })
	}

	render() {
		const { selectedStudent } = this.state;
		const { selectedBook, classes, students = [] } = this.props;
		console.log(students)
		if (!selectedBook.length) {
			return null;
		}
		return (
			<Paper className={classes.root}>
				<Table className={classes.table}>
					<TableHead>
						<TableRow>
							<CustomTableCell>Mã</CustomTableCell>
							<CustomTableCell>Tên sách</CustomTableCell>
							<CustomTableCell>Tác giả</CustomTableCell>
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
										{row.bookName}
									</CustomTableCell>
									<CustomTableCell component="th" scope="row">
										{row.author}
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
				<form className={classes.container} noValidate autoComplete="true">
					<FormControl className={classes.formControl}>
						<InputLabel htmlFor="class-helper">Học sinh mượn:</InputLabel>
						<Select
							className={cx([classes.select, classes.selectEmpty])}
							value={selectedStudent.id || ""}
							onChange={this.onChangeSelected}
							input={<Input name="class" id="class-helper" />}
						>
							{students.map(item => (
								<MenuItem value={item.id}>{item.fullName}</MenuItem>
							))}
						</Select>
					</FormControl>
					<TextField
						id="standard-name"
						label="Địa chỉ"
						className={classes.textField}
						margin="normal"
						value={selectedStudent.address || ""}
						disabled={true}
						onChange={this.handleChange("address")}

					/>
					<TextField
						id="standard-name"
						label="Số điện thoại"
						className={classes.textField}
						onChange={this.handleChange("phone")}
						margin="normal"
						disabled={true}
						value={selectedStudent.phone || ""}
					/>
					<TextField
						id="standard-name"
						label="Số chứng minh"
						className={classes.textField}
						onChange={this.handleChange("phone")}
						margin="normal"
						disabled={true}
						value={selectedStudent.cardNumber || ""}
					/>
				</form>
				<div className={classes.submitField}>
					<Button onClick={this.onBorrowClick} variant="contained" color="primary" className={classes.button}>
						Lưu
        </Button>
					<Button variant="contained" className={classes.button} onClick={this.onCancelClick}>
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