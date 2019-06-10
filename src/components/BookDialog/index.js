import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import TextField from "@material-ui/core/TextField";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';

const styles = (theme) => ({
	appBar: {
		position: 'relative',
	},
	flex: {
		flex: 1,
	},
	container: {
		display: "flex",
		flexWrap: "wrap",
		justifyContent: "space-between",
		padding: 10
	},
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		width: "48%"
	},
	textFieldFullWidth: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		width: "96%"
	},
	dense: {
		marginTop: 19
	},
	menu: {
		width: 200
	}
});

function Transition(props) {
	return <Slide direction="up" {...props} />;
}

class FullScreenDialog extends React.Component {

	state = {
		bookName: null,
		author: null,
		category: null,
		isActive: null,
		publisherHouseId: null,
		quantity: null,
		coverPrice: null
	}

	handleClickOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.props.handleCloseDialog();
		this.setState(
			{
				open: false,
				bookName: null,
				author: null,
				category: null,
				isActive: true,
				publisherHouseId: null,
				quantity: null,
				coverPrice: null
			}
		);
	};

	handleChange = (name) => event => {
		const value = event.target.value;
		this.setState(state => {
			return {
				...state,
				[name]: value
			}
		})
	}

	handleSubmit = () => {
		const {
			bookName,
			author,
			categoryId,
			isActive,
			publisherHouseId,
			quantity,
			coverPrice
		} = this.state;
		const { addBook, editBook, book, publisherHouses = [], categories = [] } = this.props;
		if (book.id) {
			editBook({
				id: book.id,
				isActive: isActive!== null ? parseInt(isActive,10) : book.isActive,
				bookName: bookName || book.bookName,
				categoryId: categoryId ? parseInt(categoryId) : (book.category ? book.category.id : null),
				quantity: quantity || book.quantity,
				author: author || book.author,
				coverPrice: coverPrice || book.coverPrice,
				publisherHouseId: publisherHouseId ? parseInt(publisherHouseId) : (book.publisherHouse ? book.publisherHouse.id : null),
			})
		}
		else {
			addBook({
				bookName,
				author,
				quantity,
				categoryId: parseInt(categoryId) || categories[0].id,
				isActive: parseInt(isActive, 10) || 1,
				publisherHouseId: parseInt(publisherHouseId) || publisherHouses[0].id,
				coverPrice
			})
		}

		this.handleClose();
	}
	get Title() {
		const { classes, open, edit, book = {}, publisherHouses = {} } = this.props;
		if (edit && book.id) {
			return "Sửa thông tin sách";
		}
		if (edit) {
			return "Thêm sách";
		}
		return "Xem thông tin chi tiết";
	}
	render() {
		const { classes, open, edit, book = {}, publisherHouses = [], categories = [] } = this.props;
		return (
			<Dialog
				fullScreen
				open={open}
				onClose={this.handleClose}
				TransitionComponent={Transition}
			>
				<AppBar className={classes.appBar}>
					<Toolbar>
						<IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
							<CloseIcon />
						</IconButton>
						<Typography variant="h6" color="inherit" className={classes.flex}>
							{this.Title}
						</Typography>
						{edit && <Button color="inherit" onClick={this.handleSubmit}>
							Lưu
						</Button>}
					</Toolbar>
				</AppBar>
				<form className={classes.container} noValidate autoComplete="off">
					<TextField
						disabled={!edit}
						id="standard-name"
						label="Tên"
						className={classes.textField}
						value={this.state.bookName}
						defaultValue={book.bookName}
						onChange={this.handleChange("bookName")}
						margin="normal"
					/>
					<TextField
						disabled={!edit}
						id="standard-uncontrolled"
						label="Tác giả"
						value={this.state.author}
						defaultValue={book.author}
						className={classes.textField}
						onChange={this.handleChange("author")}
						margin="normal"
					/>
					<TextField
						disabled={!edit}
						value={this.state.quantity}
						defaultValue={book.quantity}
						id="standard-required"
						label="Số lượng còn lại"
						onChange={this.handleChange("quantity")}
						className={classes.textFieldFullWidth}
						margin="normal"
						type="number"
					/>
					<TextField
						disabled={!edit}
						value={this.state.coverPrice}
						defaultValue={book.coverPrice}
						id="standard-required"
						label="Giá Bìa"
						onChange={this.handleChange("coverPrice")}
						className={classes.textFieldFullWidth}
						margin="normal"
						type="number"
					/>
					<FormControl className={classes.textField}>
						<InputLabel htmlFor="category-native-simple">Loại:</InputLabel>
						<Select
							value={this.state.categoryId}
							onChange={this.handleChange('categoryId')}
							defaultValue={book.category ? book.category.id : null}
							inputProps={{
								name: 'age',
								id: 'category-native-simple',
							}}
						>
							{categories.map(item => (
								<MenuItem value={item.id}>{item.name}</MenuItem>
							))}
						</Select>
					</FormControl>
					<FormControl className={classes.textField}>
						<InputLabel htmlFor="age-native-simple">Nhà xuất bản:</InputLabel>
						<Select
							value={this.state.publisherHouseId}
							onChange={this.handleChange('publisherHouseId')}
							defaultValue={book.publisherHouse ? book.publisherHouse.id : null}
							inputProps={{
								name: 'age',
								id: 'age-native-simple',
							}}
						>
							{publisherHouses.map(item => (
								<MenuItem value={item.id}>{item.name}</MenuItem>
							))}
						</Select>
					</FormControl>
					<FormControl className={classes.textField}>
						<InputLabel htmlFor="age-native-simple">Trạng thái:</InputLabel>
						<Select
							value={this.state.isActive}
							onChange={this.handleChange('isActive')}
							defaultValue={book.isActive}
							inputProps={{
								name: 'age',
								id: 'age-native-simple',
							}}
						>
							<MenuItem value={true}>Active</MenuItem>
							<MenuItem value={false}>Inactive</MenuItem>
						</Select>
					</FormControl>
				</form>
			</Dialog>
		);
	}
}

FullScreenDialog.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FullScreenDialog);
