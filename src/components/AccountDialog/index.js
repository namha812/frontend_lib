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
import lodash from 'lodash';
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
		isActive: true,
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
				isActive: true,
				email: null,
				address: null,
				role: 2,
				account: {}
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
		} = this.state;
		const { editAccount, addAccount, account } = this.props;
		if (account.id) {
			editAccount({
				id: account.id,
				fullName: fullName,
				isActive: isActive,
				email: email,
				address: address
			})
		}
		else {
			addAccount({
				fullName,
				isActive,
				email,
				address,
				password,
			})
		}

		this.handleClose();
	}
	static getDerivedStateFromProps(nextProps, prevState) {
		const { account: nextAccount } = nextProps;
		const { account: currentAccount } = prevState;
		if (!lodash.isEmpty(nextAccount) && JSON.stringify(nextAccount) !== JSON.stringify(currentAccount)) {
			return {
				fullName: nextAccount.fullName,
				isActive: nextAccount.isActive,
				email: nextAccount.email,
				address: nextAccount.address,
				password: nextAccount.password,
				account: nextAccount
			}
		}
		return;
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
			email,
			password,
			rePassword,
			account = {}
		} = this.state;
		return fullName && email && (!account.id ? (password && password === rePassword) : true); 
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
						{edit && <Button disabled={!this.validate} color="inherit" onClick={this.handleSubmit}>
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
						onChange={this.handleChange("fullName")}
						margin="normal"
					/>
					<TextField
						fullWidth
						disabled={!edit || account.id}
						id="standard-name"
						label="Email"
						value={this.state.email}
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
						onChange={this.handleChange("address")}
						margin="normal"
					/>
					<FormControl className={classes.formControl}>
						<InputLabel htmlFor="age-native-simple">Chức vụ:</InputLabel>
						<Select
							disabled={!edit}
							value={this.state.role}
							onChange={this.handleChange('role')}
							inputProps={{
								name: 'age',
								id: 'age-native-simple',
							}}
						>
							<MenuItem value={2}>Nhân viên</MenuItem>
							<MenuItem value={1}>Quản lý</MenuItem>
						</Select>
					</FormControl>
					<FormControl className={classes.formControl}>
						<InputLabel htmlFor="age-native-simple">Trạng thái:</InputLabel>
						<Select
							disabled={!edit}
							value={this.state.isActive}
							onChange={this.handleChange('isActive')}
							defaultValue={account.isActive}
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
