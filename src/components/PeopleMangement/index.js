import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ViewIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import PeopleDialog from '../PeopleDialog';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Checkbox from "@material-ui/core/Checkbox";


const styles = theme => ({
	root: {
		width: '100%',
		marginTop: theme.spacing.unit * 3,
		overflowX: 'auto',
	},
	table: {
		minWidth: 700,
	},
	fab: {
		position: 'absolute',
		bottom: 20,
		right: 20
	},
});


class PeopleManagement extends React.Component {
	state = {
		currentStudent: {},
		deleteDialogState: false,
		open: false,
		edit: false
	}

	onAddStudent = () => {
		this.setState({
			open: true,
			edit: true,
			currentStudent: {}
		});
	}

	handleCloseDialog = () => {
		this.setState({ open: false });
	}
	handleView = (student) => () => {
		this.setState(
			{
				open: true,
				edit: false,
				currentStudent: student
			}
		);
	}
	handleEdit = (student) => () => {
		this.setState({
			open: true,
			edit: true,
			currentStudent: student
		});
	}
	handleDelete = (student) => () => {
		this.setState({
			deleteDialogState: true,
			currentStudent: student
		})
	}

	handleDisagree = () => {
		this.handleClose();
	}
	handleAgree = () => {
		const { currentStudent } = this.state;
		this.props.deleteStudent(currentStudent.id);
		this.handleClose();
	}
	handleClose = () => {
		this.setState({
			deleteDialogState: false
		})
	}
	render() {
		const { 
			classes,
			students = [],
			loadingState,
			editStudent,
			addStudent,
			deleteStudent,
			classList
	} = this.props;
		const { open, edit, currentStudent } = this.state;
		return (
			<Paper className={classes.root}>
				<Table className={classes.table}>
					<TableHead>
						<TableRow>
							<TableCell>Trạng thái</TableCell>
							<TableCell>Họ tên</TableCell>
							<TableCell>Địa chỉ</TableCell>
							<TableCell>Giới tính</TableCell>
							<TableCell>CMND</TableCell>
							<TableCell>Email</TableCell>
							<TableCell>Số đt</TableCell>
							<TableCell>Thao tác</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{!students.length && 
							<TableRow>
								<TableCell colSpan={7} style={{textAlign: "center"}}>
									{loadingState ? "Đang tải..." : "Không có dữ liệu"}
								</TableCell>

							</TableRow>}
						{students.map(row => {
							return (
								<TableRow key={row.id}>
									<TableCell>
										<Checkbox
											disabled
											checked={row.isActive}
										/>
									</TableCell>
									<TableCell component="th" scope="row">
										{row.fullName}
									</TableCell>
									<TableCell >{row.address}</TableCell>
									<TableCell >{row.sex === 1 ? "Nam" : "Nữ"}</TableCell>
									<TableCell >{row.cardNumber}</TableCell>
									<TableCell >{row.email}</TableCell>
									<TableCell >{row.phone ? row.phone : "---"}</TableCell>
									<TableCell>
										<IconButton onClick={this.handleView(row)}>
											<ViewIcon />
										</IconButton>
										<IconButton onClick={this.handleEdit(row)}>
											<Edit />
										</IconButton>
										{/* <IconButton onClick={this.handleDelete(row)}>
											<DeleteIcon />
										</IconButton> */}
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
				<Fab color="primary" className={classes.fab}>
					<IconButton onClick={this.onAddStudent}>
						<AddIcon color="white" />
					</IconButton>
				</Fab>
				<PeopleDialog classList={classList} editStudent={editStudent} addStudent={addStudent} student={currentStudent} open={open} handleCloseDialog={this.handleCloseDialog} edit={edit} />
				<Dialog
					open={this.state.deleteDialogState}
					onClose={this.handleClose}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
					>
					<DialogTitle id="alert-dialog-title">{"Xóa thông tin người dùng?"}</DialogTitle>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">
							Bạn có chắc chắn xóa thông tin người dùng này?
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={this.handleDisagree} color="primary">
							Hủy
						</Button>
						<Button onClick={this.handleAgree} color="primary" autoFocus>
							Xóa
						</Button>
					</DialogActions>
					</Dialog>
			</Paper>
		);
	}
}

PeopleManagement.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PeopleManagement);