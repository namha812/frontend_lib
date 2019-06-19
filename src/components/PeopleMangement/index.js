import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
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
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import TablePaginationActionsWrapped from '../TablePaginationActions';


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
	tableWrapper: {
		overflowX: 'auto',
	},
});


class PeopleManagement extends React.Component {
	state = {
		currentStudent: {},
		deleteDialogState: false,
		open: false,
		edit: false,
		page: 0,
		rowsPerPage: 10,
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

	handleChangePage = (event, page) => {
		this.setState({ page });
	};

	handleChangeRowsPerPage = event => {
		this.setState({ rowsPerPage: event.target.value });
	};

	get students() {
		const { page, rowsPerPage } = this.state;
		const { searchValue, students = [] } = this.props;
		return _.slice(students.filter(item => {
			return _.includes(_.toLower(item.fullName), _.toLower(searchValue));
		}), page * rowsPerPage, page * rowsPerPage + rowsPerPage)
	}

	render() {
		const {
			classes,
			loadingState,
			editStudent,
			addStudent,
			classList
		} = this.props;
		const { open, edit, currentStudent, page, rowsPerPage } = this.state;
		return (
			<Paper className={classes.root}>
				<div className={classes.tableWrapper}>
					<Table className={classes.table}>
						<TableHead>
							<TableRow>
								<TableCell>Trạng thái</TableCell>
								<TableCell>Họ tên</TableCell>
								<TableCell>Lớp</TableCell>
								<TableCell>Địa chỉ</TableCell>
								<TableCell>Giới tính</TableCell>
								<TableCell>CMND</TableCell>
								<TableCell>Email</TableCell>
								<TableCell>Số đt</TableCell>
								<TableCell>Thao tác</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{!this.students.length &&
								<TableRow>
									<TableCell colSpan={7} style={{ textAlign: "center" }}>
										{loadingState ? "Đang tải..." : "Không có dữ liệu"}
									</TableCell>

								</TableRow>}
							{this.students.map(row => {
								return (
									<TableRow key={row.id}>
										<TableCell>
										<FormControlLabel
											control={
												<Switch
													checked={row.isActive}
													value={row.isActive}
													disable
												/>
											}
											label={row.isActive ? "Active" : "Inactive"}
										/>
										</TableCell>
										<TableCell component="th" scope="row">
											{row.fullName}
										</TableCell>
										<TableCell >{row.class.className}</TableCell>
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
						<TableFooter>
							<TableRow>
								<TablePagination
									rowsPerPageOptions={[5, 10, 25]}
									colSpan={3}
									count={this.students.length}
									rowsPerPage={rowsPerPage}
									page={page}
									SelectProps={{
										native: true,
									}}
									onChangePage={this.handleChangePage}
									onChangeRowsPerPage={this.handleChangeRowsPerPage}
									ActionsComponent={TablePaginationActionsWrapped}
								/>
							</TableRow>
						</TableFooter>
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
				</div>
			</Paper>
		);
	}
}

PeopleManagement.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PeopleManagement);