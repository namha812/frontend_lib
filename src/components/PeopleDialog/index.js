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
		justifyContent: "space-between",
		padding: 10
	},
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		width: "48%"
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
		email: null,
		sex: null,
		address: null,
		cardNumber: null,
		phone: null,
		isActive: true,
		className: null,
		classId: null,
		publishing: true
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
				email: null,
				sex: null,
				address: null,
				cardNumber: null,
				phone: null,
				isActive: true,
				className: null,
				classId: null,
			}
		);
	};

	handleChange = (name) => event => {
		const value = event.target.value;
		console.log(typeof value);
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
			classId,
			isActive
		} = this.state;
		const { editStudent, addStudent, student, classList } = this.props;
		if (student.id) {
			editStudent({
				id: student.id,
				fullName: fullName || student.fullName,
				email: email || student.email,
				sex: sex || student.sex,
				address: address || student.address,
				cardNumber: cardNumber || student.cardNumber,
				phone: phone || student.phone,
				classId: classId || student.class.id,
				isActive: isActive || student.isActive
			})
		}
		else {
			addStudent({
				fullName,
				email,
				sex: sex || 1,
				address,
				cardNumber,
				phone,
				classId: classId || classList[0].id,
				isActive: isActive
			})
		}

		this.handleClose();
	}

	get Title() {
		const { edit, student } = this.props;
		if (edit && student.id) {
			return "Sửa thông tin";
		}
		if (edit) {
			return "Thêm học sinh / độc giả";
		}
		return "Xem thông tin chi tiết";
	}

	handleChangeNew = e => {
		console.log(typeof e.target.value);
	}
	render() {
		const { classes, open, edit, student, classList } = this.props;
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
						type="number"
						className={classes.fullwidth}
						onChange={this.handleChange("phone")}
						value={this.state.phone}
						defaultValue={student.phone}
						margin="normal"
					/>
					<FormControl className={classes.formControl}>
						<InputLabel htmlFor="sex-helper">Giới tính:</InputLabel>
						<Select
							className={classes.select}
							value={this.state.sex ? this.state.sex : (student.sex || 1)}
							onChange={this.handleChange("sex")}
							input={<Input name="sex" id="sex-helper" />}
						>
							<MenuItem value={1}>Nam</MenuItem>
							<MenuItem value={2}>Nữ</MenuItem>
						</Select>
					</FormControl>
					<FormControl className={classes.formControl}>
						<InputLabel htmlFor="age-native-simple">Lớp:</InputLabel>
						<Select
							value={this.state.classId}
							onChange={this.handleChange('classId')}
							defaultValue={student.class ? student.class.classId : null}
							inputProps={{
								name: 'age',
								id: 'age-native-simple',
							}}
						>
							{classList.map(item => (
								<MenuItem value={item.id}>{item.className}</MenuItem>
							))}
						</Select>
					</FormControl>
					<FormControl className={classes.formControl}>
						<InputLabel htmlFor="age-native-simple">Trạng thái:</InputLabel>
						<Select
							value={this.state.isActive}
							onChange={this.handleChange('isActive')}
							defaultValue={student.isActive}
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
