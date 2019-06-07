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
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
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
	fullwidth: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		width: "96%"
	},
	container: {
		display: "flex",
		flexWrap: "wrap",
		justifyContent: "left",
		padding: 10
	},
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		width: "60%",
		float: "left"
	},
	formControl: {
		margin: theme.spacing.unit,
		minWidth: 120,
		width: "48%"
	},
	dense: {
		marginTop: 19
	},
	menu: {
		width: 200
	},
	select: {
	}
});

function Transition(props) {
	return <Slide direction="up" {...props} />;
}

class FullScreenDialog extends React.Component {

	state = {
		fullName: null,
		isActive: 1,
		email: null,
		address: null,
		password: null,
		rePassword: null,
		role: 2
	}

	handleClickOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.props.handleCloseDialog();
		this.setState(
			{
				open: false,
				fullName: null,
				isActive: null,
				email: null,
				address: null,
				role: null
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
			fullName,
			isActive,
			email,
			address,
			password,
			role
		} = this.state;
		const { editAccount, addAccount, account } = this.props;
		if (account.id) {
			editAccount({
				id: account.id,
				fullName: fullName || account.fullName,
				isActive: isActive || account.isActive,
				email: email || account.email,
				address: address || account.address
			})
		}
		else {
			addAccount({
				fullName,
				isActive,
				email,
				address,
				password,
				role
			})
		}

		this.handleClose();
	}

	get Title() {
		const { edit, account = {} } = this.props;
		if (edit && account.id) {
			return "Sửa thông tin";
		}
		if (edit) {
			return "Thêm nhân viên";
		}
		return "Xem thông tin chi tiết";
	}

	get Error() {
		const { password, rePassword } = this.state;
		if (password === null || rePassword === null) {
			return false;
		}
		return password !== rePassword;
	}

	get validate() {
		const {
			fullName,
			isActive,
			email,
			password,
		} = this.state;
		return fullName !== null && email !== null && password !== null; 
	}

	render() {
		const { classes, open, edit, account = {} } = this.props;
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
						{edit && <Button disabled={!this.validate && !account.id} color="inherit" onClick={this.handleSubmit}>
							Lưu
						</Button>}
					</Toolbar>
				</AppBar>
				<form className={classes.container} noValidate autoComplete="off">
					<TextField
						fullWidth
						disabled={!edit}
						id="standard-name"
						label="Họ và tên"
						value={this.state.fullName}
						defaultValue={account.fullName}
						onChange={this.handleChange("fullName")}
						margin="normal"
					/>
					<TextField
						fullWidth
						disabled={!edit || account.id}
						id="standard-name"
						label="Email"
						value={this.state.email}
						defaultValue={account.email}
						onChange={this.handleChange("email")}
						margin="normal"
						type="email"
					/>
					{!account.id && <TextField
						fullWidth
						disabled={!edit}
						id="standard-name"
						label="Mật khẩu"
						value={this.state.password}
						defaultValue={account.password}
						onChange={this.handleChange("password")}
						margin="normal"
						type="password"
					/>}
					{!account.id && <TextField
						error={this.Error}
						fullWidth
						disabled={!edit}
						hidden={account.id}
						id="standard-name"
						label="Nhập lại mật khẩu"
						value={this.state.rePassword}
						defaultValue={account.rePassword}
						onChange={this.handleChange("rePassword")}
						margin="normal"
						type="password"
					/>}
					<TextField
						fullWidth
						disabled={!edit}
						hidden={account.id}
						id="standard-name"
						label="Địa chỉ"
						value={this.state.address}
						defaultValue={account.address}
						onChange={this.handleChange("address")}
						margin="normal"
					/>
					<FormControl className={classes.formControl}>
						<InputLabel htmlFor="age-native-simple">Trạng thái:</InputLabel>
						<Select
							disabled={!edit}
							native
							value={this.state.role}
							onChange={this.handleChange('role')}
							defaultValue={account.role}
							inputProps={{
								name: 'age',
								id: 'age-native-simple',
							}}
						>
							<option value={2}>Nhân viên</option>
							<option value={1}>Quản lý</option>
						</Select>
					</FormControl>
					<FormControl className={classes.formControl}>
						<InputLabel htmlFor="age-native-simple">Trạng thái:</InputLabel>
						<Select
							disabled={!edit}
							native
							value={this.state.publishing}
							onChange={this.handleChange('isActive')}
							defaultValue={account.isActive}
							inputProps={{
								name: 'age',
								id: 'age-native-simple',
							}}
						>
							<option value={1}>Active</option>
							<option value={0}>Inactive</option>
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
