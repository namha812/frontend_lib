import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
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
		isActive: true,
		address: null
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
				isActive: true,
				address: null,
				description:"",
				nextPublisher: {}
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
			isActive,
			address,
			description
		} = this.state;
		const { editPublisher, addPublisher, publisherHouse } = this.props;
		if (publisherHouse.id) { 
			editPublisher({
				id: publisherHouse.id,
				name: name,
				isActive: isActive,
				address: address,
				description: description
			})
		}
		else {
			addPublisher({
				name,
				isActive,
				address,
				description
			})
		}

		this.handleClose();
	}

	get Title() {
		const { edit, publisherHouse = {} } = this.props;
		if (edit && publisherHouse.id) {
			return "Sửa thông tin";
		}
		if (edit) {
			return "Thêm nhà xuất bản";
		}
		return "Xem thông tin chi tiết";
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		const { publisherHouse: nextPublisher } = nextProps;
		const { publisherHouse: currentPublisher } = prevState;
		if(!isEmpty(nextPublisher) && JSON.stringify(nextPublisher) !== JSON.stringify(currentPublisher)){
			return {
				name: nextPublisher.name,
				isActive: nextPublisher.isActive,
				description: nextPublisher.description,
				address: nextPublisher.address,
				publisherHouse: nextPublisher,
			}
		}
		return;
	}

	render() {
        const { classes, open, edit } = this.props;
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
						{edit && <Button color="inherit" onClick={this.handleSubmit} disabled={!this.state.name}>
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
						onChange={this.handleChange("name")}
						margin="normal"
					/>
					<TextField
                        fullWidth
						disabled={!edit}
						id="standard-name"
						label="Địa chỉ"
						value={this.state.address}
						onChange={this.handleChange("address")}
						margin="normal"
					/>
					<TextField
						fullWidth
						disabled={!edit}
						id="standard-name"
						label="Mô tả"
						value={this.state.description}
						onChange={this.handleChange("description")}
						margin="normal"
						rows={5}
						multiline
					/>
					<FormControl className={classes.formControl}>
						<InputLabel htmlFor="age-native-simple">Trạng thái:</InputLabel>
						<Select
                            disabled={!edit}
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
				</form>
			</Dialog>
		);
	}
}

FullScreenDialog.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FullScreenDialog);
