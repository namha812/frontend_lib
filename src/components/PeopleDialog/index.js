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
import classNames from 'classnames';


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
		fullName: null,
		email: null,
		sex: null,
		address: null,
		cardNumber: null,
		phone: null,
		isActive: null,
		className: null,
		class: {
			id: null,
			className: null,
		}
	}

	handleClickOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		console.log(this.state);
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
		const {
			fullName,
			email,
			sex,
			address,
			cardNumber,
			phone,
			className
		} = this.state;
		const { editStudent, addStudent, student } = this.props;
		if(student.id){
			editStudent({
				id: student.id,
				fullName: fullName || student.fullName,
				email: email || student.email,
				sex: sex || student.sex,
				address: address || student.address,
				cardNumber: cardNumber || student.cardNumber,
				phone: phone || student.phone,
				classId: student.class.id || 1
			})
		}
		addStudent({
			fullName,
			email,
			sex,
			address,
			cardNumber,
			phone,
			classId: 1
		})
		this.handleClose();
	}

	get Title() {
		const { classes, open, edit, student } = this.props;
		if (edit && student.id) {
			return "Sửa thông tin";
		}
		if (edit) {
			return "Thêm học sinh / độc giả";
		}
		return "Xem thông tin chi tiết";
	}
	render() {
		const { classes, open, edit, student } = this.props;
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
						value={this.state.fullName}
						defaultValue={student.fullName}
						onChange={this.handleChange("fullName")}
						margin="normal"
					/>
					<TextField
						disabled={!edit}
						id="standard-uncontrolled"
						label="Địa chỉ"
						value={this.state.address}
						defaultValue={student.address}
						className={classes.textField}
						onChange={this.handleChange("address")}
						margin="normal"
					/>
					<TextField
						disabled={!edit}
						value={this.state.sex}
						defaultValue={student.sex}
						id="standard-required"
						label="Giới tính"
						onChange={this.handleChange("sex")}
						className={classes.textField}
						margin="normal"
					/>
					<TextField
						type="number"
						disabled={!edit}
						id="standard-error"
						label="Chứng Minh Nhân Dân"
						onChange={this.handleChange("cardNumber")}
						value={this.state.cardNumber}
						defaultValue={student.cardNumber}
						className={classes.textField}
						margin="normal"
					/>
					<TextField
						disabled={!edit}
						id="standard-disabled"
						label="Email"
						className={classes.textField}
						onChange={this.handleChange("email")}
						value={this.state.email}
						defaultValue={student.email}
						margin="normal"
					/>
					<TextField
						disabled={!edit}
						id="standard-password-input"
						label="Số điện thoại"
						className={classes.textField}
						type="number"
						onChange={this.handleChange("phone")}
						value={this.state.phone}
						defaultValue={student.phone}
						margin="normal"
					/>
					<TextField
						disabled={!edit}
						id="standard-full-width"
						label="Thông tin lớp"
						style={{ margin: 8 }}
						fullWidth
						value={this.state.className}
						defaultValue={student.class ? student.class.className : ""}
						onChange={this.handleChange("className")}
						margin="normal"
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
