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
		name: null,
		isActive: null,
	}

	handleClickOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.props.handleCloseDialog();
		this.setState(
			{
				open: false,
				name: null,
				isActive: null,
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
			name,
			isActive
		} = this.state;
		const { editCategory, addCategory, category } = this.props;
		if (category.id) { 
			editCategory({
				id: category.id,
				name: name || category.name,
				isActive: isActive || category.isActive
			})
		}
		else {
			addCategory({
				name,
				isActive
			})
		}

		this.handleClose();
	}

	get Title() {
		const { edit, category = {} } = this.props;
		if (edit && category.id) {
			return "Sửa thông tin";
		}
		if (edit) {
			return "Thêm danh mục sách";
		}
		return "Xem thông tin chi tiết";
	}
	render() {
        const { classes, open, edit , category = {} } = this.props;
        console.log(this.state)
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
                        fullWidth
						disabled={!edit}
						id="standard-name"
						label="Tên"
						value={this.state.name}
						defaultValue={category.name}
						onChange={this.handleChange("name")}
						margin="normal"
					/>
					
					<FormControl className={classes.formControl}>
						<InputLabel htmlFor="age-native-simple">Trạng thái:</InputLabel>
						<Select
							disabled={!edit}
							native
							value={this.state.publishing}
							onChange={this.handleChange('isActive')}
							defaultValue={category.isActive}
							inputProps={{
								name: 'age',
								id: 'age-native-simple',
							}}
						>
							<option value="" />
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
