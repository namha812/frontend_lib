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
import lodash from 'lodash';

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
	textField1: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		width: "48%",
		paddingTop: 16
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
		isActive: true,
		publisherHouseId: null,
		quantity: null,
		coverPrice: null,
		imageUrl: null,
		content: null
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
				publisherHouseId: null,
				quantity: null,
				coverPrice: null,
				isActive: true,
				imageUrl: null,
				content: null,
				book: {}
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
			coverPrice,
			imageUrl,
			content
		} = this.state;
		const { addBook, editBook, book } = this.props;
		if (book.id) {
			editBook({
				id: book.id,
				isActive: isActive,
				bookName: bookName,
				categoryId: categoryId,
				quantity: quantity,
				author: author,
				coverPrice: coverPrice,
				publisherHouseId: publisherHouseId,
				imageUrl: imageUrl,
				content: content
			})
		}
		else {
			addBook({
				bookName,
				author,
				quantity,
				categoryId: categoryId || this.defaultCategory,
				isActive: isActive,
				publisherHouseId: publisherHouseId || this.defaultPublisherHouse,
				coverPrice,
				imageUrl,
				content
			})
		}

		this.handleClose();
	}
	get Title() {
		const { edit, book = {} } = this.props;
		if (edit && book.id) {
			return "Sửa thông tin sách";
		}
		if (edit) {
			return "Thêm sách";
		}
		return "Xem thông tin chi tiết";
	}
	get validate() {
		const {
			bookName,
			quantity,
			coverPrice,
		} = this.state;
		return bookName && quantity  && coverPrice;
	}
	get defaultPublisherHouse() {
		const { publisherHouseId } = this.state;
		if (publisherHouseId) {
			return publisherHouseId;
		}
		const { book = {}, publisherHouses = [] } = this.props;
		if (book.id) {
			return book.publisherHouse.id
		}
		if (publisherHouses.length) {
			return publisherHouses[0].id
		}
		return null;
	}
	get defaultCategory() {
		const { categoryId } = this.state;
		if (categoryId) {
			return categoryId;
		}
		const { book = {}, categories = [] } = this.props;
		if (book.id) {
			return book.category.id
		}
		if (categories.length) {
			return categories[0].id
		}
		return null;
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		const { book: nextBook } = nextProps;
		const { book: currentBook } = prevState;
		if (!lodash.isEmpty(nextBook) && JSON.stringify(nextBook) !== JSON.stringify(currentBook)) {
			return {
				bookName: nextBook.bookName,
				isActive: nextBook.isActive,
				categoryId: nextBook.categoryId,
				publisherHouseId: nextBook.publisherHouseId,
				quantity: nextBook.quantity,
				coverPrice: nextBook.coverPrice,
				author: nextBook.author,
				imageUrl: nextBook.imageUrl,
				content: nextBook.content,
				book: nextBook
			}
		}
		return;
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
						{edit && <Button color="inherit" onClick={this.handleSubmit} disabled={!this.validate}>
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
						required={true}
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
						className={classes.textField}
						margin="normal"
						type="number"
						required={true}
					/>
					<TextField
						disabled={!edit}
						value={this.state.coverPrice}
						defaultValue={book.coverPrice}
						id="standard-required"
						label="Giá Bìa"
						onChange={this.handleChange("coverPrice")}
						className={classes.textField}
						margin="normal"
						type="number"
						required={true}
					/>
					
					<TextField
						disabled={!edit}
						value={this.state.imageUrl}
						defaultValue={book.imageUrl}
						id="standard-required"
						label="Link ảnh"
						onChange={this.handleChange("imageUrl")}
						className={classes.textField}
						margin="normal"
					/>
					<FormControl className={classes.textField1} disabled={!edit}>
						<InputLabel htmlFor="category-native-simple">Loại:</InputLabel>
						<Select
							disabled={!edit}
							value={this.defaultCategory}
							onChange={this.handleChange('categoryId')}
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
					
					<FormControl className={classes.textField} disabled={!edit}>
						<InputLabel htmlFor="age-native-simple">Nhà xuất bản:</InputLabel>
						<Select
							disabled={!edit}
							value={this.defaultPublisherHouse}
							onChange={this.handleChange('publisherHouseId')}
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
					<FormControl className={classes.textField} disabled={!edit}>
						<InputLabel htmlFor="age-native-simple">Trạng thái:</InputLabel>
						<Select
							
							value={this.state.isActive}
							onChange={this.handleChange('isActive')}
							inputProps={{
								name: 'age',
								id: 'age-native-simple',
							}}
						>
							<MenuItem value={true}>Active</MenuItem>
							<MenuItem value={false}>Inactive</MenuItem>
						</Select>
					</FormControl>
					<TextField
						disabled={!edit}
						value={this.state.content}
						defaultValue={book.content}
						id="standard-required"
						label="Nội dung"
						onChange={this.handleChange("content")}
						className={classes.textField}
						margin="normal"
						rows={5}
						multiline
						fullWidth
					/>
				</form>
			</Dialog>
		);
	}
}

FullScreenDialog.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FullScreenDialog);
