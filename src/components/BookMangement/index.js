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
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';

import BookDialog from '../BookDialog';
import TablePaginationActionsWrapped from '../TablePaginationActions';

// import book from './book.json'


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


class BookManage extends React.Component {
	state = {
		// book: book,
		currentBook: {},
		deleteDialogState: false,
		open: false,
		edit: false,
		page: 0,
		rowsPerPage: 10,
	}

	onAddBook = () => {
		this.setState({
			open: true,
			edit: true,
			currentBook: {}
		});
	}

	handleCloseDialog = () => {
		this.setState(
			{
				currentBook: {},
				open: false
			}
		);
	}
	handleView = (Book) => () => {
		this.setState(
			{
				open: true,
				edit: false,
				currentBook: Book
			}
		);
	}
	handleEdit = (Book) => () => {
		this.setState({
			open: true,
			edit: true,
			currentBook: Book
		});
	}
	handleDelete = (Book) => () => {
		this.setState({
			deleteDialogState: true,
			currentBook: Book
		})
	}

	handleDisagree = () => {
		this.handleClose();
	}
	handleAgree = () => {
		const { currentBook } = this.state;
		this.props.deleteBook(currentBook.id);
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

	handleChangeStatus = (book) => (event) => {

	}

	get books() {
		const { page, rowsPerPage } = this.state;
		const { searchValue, books = [] } = this.props;
		return _.slice(books.filter(item => {
			return _.includes(_.toLower(item.bookName), _.toLower(searchValue));
		}), page * rowsPerPage, page * rowsPerPage + rowsPerPage)
	}

	componentDidMount() {
		document.title = "Quản lý sách"
	}
	render() {
		const {
			classes,
			loadingState,
			editBook,
			addBook,
			publisherHouses = [],
			categories
		} = this.props;
		const { open, edit, currentBook, rowsPerPage, page } = this.state;
		return (
			<Paper className={classes.root}>
				<Table className={classes.table}>
					<TableHead>
						<TableRow>
							<TableCell>Trạng thái</TableCell>
							<TableCell>Nhan đề</TableCell>
							<TableCell>Tác giả</TableCell>
							<TableCell>Danh mục</TableCell>
							<TableCell>Nhà xuất bản</TableCell>
							<TableCell>Số lượng còn lại</TableCell>
							<TableCell>Thao tác</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{!this.books.length &&
							<TableRow>
								<TableCell colSpan={7} style={{ textAlign: "center" }}>
									{loadingState ? "Đang tải..." : "Không có dữ liệu"}
								</TableCell>

							</TableRow>}
						{this.books.map(row => {
							return (
								<TableRow key={row.id}>
									<TableCell>
										<FormControlLabel
											control={
												<Switch
													checked={row.isActive}
													onChange={this.handleChangeStatus(row)}
													value={row.isActive}
													disable
												/>
											}
											label={row.isActive ? "Active" : "Inactive"}
										/>
									</TableCell>
									<TableCell >{row.bookName}</TableCell>
									<TableCell >{row.author}</TableCell>
									<TableCell >{row.category ? row.category.name : "---"}</TableCell>
									<TableCell >{row.publisherHouse ? row.publisherHouse.name : "---"}</TableCell>
									<TableCell >{row.quantity ? row.quantity : "---"}</TableCell>
									<TableCell>
										<IconButton onClick={this.handleView(row)}>
											<ViewIcon />
										</IconButton>
										<IconButton onClick={this.handleEdit(row)}>
											<Edit />
										</IconButton>
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
								count={this.books.length}
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
					<IconButton onClick={this.onAddBook}>
						<AddIcon color="white" />
					</IconButton>
				</Fab>
				<BookDialog publisherHouses={publisherHouses} categories={categories} editBook={editBook} addBook={addBook} book={currentBook} open={open} handleCloseDialog={this.handleCloseDialog} edit={edit} />
				<Dialog
					open={this.state.deleteDialogState}
					onClose={this.handleClose}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogTitle id="alert-dialog-title">{"Delete book?"}</DialogTitle>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">
							Bạn có chắc chắn xóa sách này khỏi hệ thống?
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

BookManage.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BookManage);