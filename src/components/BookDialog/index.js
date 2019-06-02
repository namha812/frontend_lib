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
		name: null,
		email: null,
		remainNumber: null,
		author: null,
		active: false,
		category: null,
		publishing:null
	}

	handleClickOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.props.handleCloseDialog();
		this.setState({ open: false });
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
	// 	const {
	// 		name,
	// 		email,
	// 		remainNumber,
	// 		author,
	// 		cardNumber,
	// 		phone
	// 	} = this.state;
	// 	const { editStudent, addStudent, student } = this.props;
	// 	if(student.id){
	// 		editStudent({
	// 			id: student.id,
	// 			name: name || student.name,
	// 			email: email || student.email,
	// 			remainNumber: remainNumber || student.remainNumber,
	// 			author: author || student.author,
	// 			cardNumber: cardNumber || student.cardNumber,
	// 			phone: phone || student.phone,
	// 			classId: student.class.id || 1
	// 		})
	// 	}
	// 	addStudent({
	// 		name,
	// 		email,
	// 		remainNumber,
	// 		author,
	// 		cardNumber,
	// 		phone,
	// 		classId: 1
	// 	})
		this.handleClose();
	}

	get Title() {
		const { classes, open, edit, book = {},publishingCompanies={} } = this.props;
		if (edit && book.id) {
			return "Sửa thông tin sách";
		}
		if (edit) {
			return "Thêm sách";
		}
		return "Xem thông tin chi tiết";
	}
	render() {
		const { classes, open, edit, book = {}, publishingCompanies = [], categories=[] } = this.props;
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
						value={this.state.name}
						defaultValue={book.name}
						onChange={this.handleChange("name")}
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
						value={this.state.remainNumber}
						defaultValue={book.remainNumber}
						id="standard-required"
						label="Số lượng còn lại"
						onChange={this.handleChange("remainNumber")}
						className={classes.textField}
						margin="normal"
						type="number"
					/>
					<FormControl className={classes.textField}>
						<InputLabel htmlFor="category-helper">Loại:</InputLabel>
						<Select
							className={classes.select}
							value={this.state.category || book.category}
							onChange={this.handleChange("category")}
							input={<Input name="category" id="category-helper" />}
						>
							<MenuItem value="">
							<em>None</em>
							</MenuItem>
							{categories.map(item => (
								<MenuItem value={item.id}>{item.category}</MenuItem>
							))}
						</Select>
					</FormControl>
					<FormControl className={classes.textField}>
						<InputLabel htmlFor="class-helper">Nhà xuất bản:</InputLabel>
						<Select
							className={classes.select}
							value={this.state.publishing || book.publishing}
							onChange={this.handleChange("publishing")}
							input={<Input name="class" id="class-helper" />}
						>
							<MenuItem value="">
							<em>None</em>
							</MenuItem>
							{publishingCompanies.map(item => (
								<MenuItem value={item.id}>{item.publisingCompany}</MenuItem>
							))}
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
