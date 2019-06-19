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
				fullName: fullName,
				email: email,
				sex: sex,
				address: address,
				cardNumber: cardNumber,
				phone: phone,
				classId: classId || this.defaultClass,
				isActive: isActive
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
				classId: classId || this.defaultClass,
				isActive: isActive
			})
		}

		this.handleClose();
	}
	get validate() {
		const {
			fullName,
			email,
			cardNumber,
		} = this.state;
		return fullName && email && cardNumber;
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
	get defaultClass() {
		const { classId } = this.state;
		if (classId) {
			return classId;
		}
		const { student = {}, classList = [] } = this.props;
		if (student.id) {
			return student.class.id
		}
		if (classList.length) {
			let itemClass = lodash.find(classList, item => {
				return item.isActive
			})
			return itemClass.id
		}
		return null;
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		const { student: nextStudent } = nextProps;
		const { student: currentStudent } = prevState;
		if (!lodash.isEmpty(nextStudent) && JSON.stringify(nextStudent) !== JSON.stringify(currentStudent)) {
			return {
				fullName: nextStudent.fullName,
				isActive: nextStudent.isActive,
				email: nextStudent.email,
				address: nextStudent.address,
				sex: nextStudent.sex,
				cardNumber: nextStudent.cardNumber,
				classId: nextStudent.classId,
				student: nextStudent
			}
		}
		return;
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
						value={this.state.fullName}
						defaultValue={student.fullName}
						onChange={this.handleChange("fullName")}
						margin="normal"
						required
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
						required
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
						required
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
							disabled={!edit}
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
							disabled={!edit}
							required
							value={this.defaultClass}
							onChange={this.handleChange('classId')}
							defaultValue={student.class ? student.class.classId : null}
							inputProps={{
								name: 'age',
								id: 'age-native-simple',
							}}
						>
							{classList.map(item => {
								if(!item.isActive && item.id !== student.classId) return null;
								return (
									<MenuItem value={item.id}>{item.className}</MenuItem>
								)
							})}
						</Select>
					</FormControl>
					<FormControl className={classes.formControl}>
						<InputLabel htmlFor="age-native-simple">Trạng thái:</InputLabel>
						<Select
							disabled={!edit}
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
