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

import BookDialog from '../BookDialog';
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


class PeopleManagement extends React.Component {
	state = {
        // book: book,
		currentBook: {},
		deleteDialogState: false,
		open: false,
		edit: false
	}

	onAddBook = () => {
		this.setState({
			open: true,
			edit: true,
			currentBook: {}
		});
	}

	handleCloseDialog = () => {
		this.setState({ open: false });
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
    
    handleChangeStatus = (book) => (event) => {

    }
	render() {
		const { 
			classes,
			books,
			loadingState,
			editBook,
			addBook,
			publishingCompanies,
			categories
		} = this.props;
		const { open, edit, currentBook, book } = this.state;
		return (
			<Paper className={classes.root}>
				<Table className={classes.table}>
					<TableHead>
						<TableRow>
                            <TableCell>Trạng thái</TableCell>
							<TableCell>ID</TableCell>
							<TableCell>Nhan đề</TableCell>
							<TableCell>Tác giả</TableCell>
							<TableCell>Danh mục</TableCell>
							<TableCell>Nhà xuất bản</TableCell>
							<TableCell>Số lượng còn lại</TableCell>
							<TableCell>Thao tác</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{!books.length && 
							<TableRow>
								<TableCell colSpan={7} style={{textAlign: "center"}}>
									{loadingState ? "Loading" : "No data"}
								</TableCell>

							</TableRow>}
						{books.map(row => {
							return (
								<TableRow key={row.id}>
                                    <TableCell>
                                    <FormControlLabel
                                        control={
                                            <Switch   
                                                checked={row.active}
                                                onChange={this.handleChangeStatus(row)}
												value={row.active}
												disable
                                            />
                                        }
                                        label={row.active ? "Active" : "Inactive"}
                                        />
                                    </TableCell>
									<TableCell component="th" scope="row">
										{row.id}
									</TableCell>
									<TableCell >{row.name}</TableCell>
									<TableCell >{row.author}</TableCell>
									<TableCell >{row.category}</TableCell>
									<TableCell >{row.publishingHouse}</TableCell>
									<TableCell >{row.remainNumber ? row.remainNumber : "---"}</TableCell>
									<TableCell>
										<IconButton onClick={this.handleView(row)}>
											<ViewIcon />
										</IconButton>
										<IconButton onClick={this.handleEdit(row)}>
											<Edit />
										</IconButton>
										<IconButton onClick={this.handleDelete(row)}>
											<DeleteIcon />
										</IconButton>
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
				<Fab color="primary" className={classes.fab}>
					<IconButton onClick={this.onAddBook}>
						<AddIcon color="white" />
					</IconButton>
				</Fab>
				<BookDialog publishingCompanies={publishingCompanies} categories={categories} editBook={editBook} addBook={addBook} book={currentBook} open={open} handleCloseDialog={this.handleCloseDialog} edit={edit} />
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

PeopleManagement.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PeopleManagement);