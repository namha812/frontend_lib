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
import Button from '@material-ui/core/Button';
import GiveBackDialog from './GiveBackDialog';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
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
	button: {
		margin: theme.spacing.unit,
	},
});

class PeopleManagement extends React.Component {
	state = {
		// book: book,
		currentBorrowItem: {},
		open: false,
		page: 0,
		rowsPerPage: 10,
	}

	handleCloseDialog = () => {
		this.setState({ open: false });
	}

	onClickGiveBookBack = (row) => (event) => {
		this.setState({ open: true, currentBorrowItem: row })
	}
	componentDidMount() {
		document.title = "Quản lý mượn sách"
	}

	handleChangePage = (event, page) => {
		this.setState({ page });
	};

	handleChangeRowsPerPage = event => {
		this.setState({ rowsPerPage: event.target.value });
	};

	get borrowsLength () {
		const { searchValue, borrowList = [] } = this.props;
		return borrowList.filter(item => {
			return _.includes(_.toLower(item.fullName), _.toLower(searchValue));
		}).length;
	}

	get borrows() {
		const { page, rowsPerPage } = this.state;
		const { searchValue, borrowList = [] } = this.props;
		return _.slice(borrowList.filter(item => {
			return _.includes(_.toLower(item.fullName), _.toLower(searchValue));
		}), parseInt(page) * parseInt(rowsPerPage), parseInt(page) * parseInt(rowsPerPage) + parseInt(rowsPerPage))
	}

	render() {
		const {
			classes,
			borrowList = [],
			loadingState,
			payBook
		} = this.props;
		const { page, rowsPerPage } = this.state;
		return (
			<Paper className={classes.root}>
				<Table className={classes.table}>
					<TableHead>
						<TableRow>
							<TableCell>STT</TableCell>
							<TableCell>Tên</TableCell>
							<TableCell>Số CMT</TableCell>
							<TableCell>Tổng số mượn</TableCell>
							<TableCell>Thao tác</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{!this.borrows.length &&
							<TableRow>
								<TableCell colSpan={7} style={{ textAlign: "center" }}>
									{loadingState ? "Đang tải..." : "Không có dữ liệu"}
								</TableCell>

							</TableRow>}
						{this.borrows.map(row => {
							return (
								<TableRow key={this.borrows.indexOf(row) + 1}>
									<TableCell component="th" scope="row">
										{row.id}
									</TableCell>
									<TableCell >{row.fullName}</TableCell>
									<TableCell >{row.cardNumber ? row.cardNumber : "-"}</TableCell>
									<TableCell >{row.total}</TableCell>
									<TableCell>
										<Button onClick={this.onClickGiveBookBack(row)} color="primary" className={classes.button}>
											Xem danh sách
										</Button>
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
								count={this.borrowsLength}
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
				<GiveBackDialog payBook={payBook} open={this.state.open} handleCloseDialog={this.handleCloseDialog} borrowItem={this.state.currentBorrowItem} />
			</Paper>
		);
	}
}

PeopleManagement.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PeopleManagement);