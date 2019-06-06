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
import GiveBackDialog from './GiveBackDialog'

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
    button: {
        margin: theme.spacing.unit,
    },
});

class PeopleManagement extends React.Component {
	state = {
        // book: book,
		currentBorrowItem: {},
		open: false
	}

	handleCloseDialog = () => {
		this.setState({ open: false });
	}
	
	onClickGiveBookBack = (row) => (event) => {
		this.setState({open: true, currentBorrowItem: row})
	}
    componentDidMount() {
        document.title = "Quản lý mượn sách"
    }
	render() {
		const { 
			classes,
			borrowList,
			loadingState
		} = this.props;
		const { open, edit, currentBook, book } = this.state;
		return (
			<Paper className={classes.root}>
				<Table className={classes.table}>
					<TableHead>
						<TableRow>
							<TableCell>ID</TableCell>
							<TableCell>Tên</TableCell>
							<TableCell>Số CMT</TableCell>
							<TableCell>Số lượng</TableCell>
							<TableCell>Thao tác</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{!borrowList.length && 
							<TableRow>
								<TableCell colSpan={7} style={{textAlign: "center"}}>
									{loadingState ? "Đang tải..." : "Không có dữ liệu"}
								</TableCell>

							</TableRow>}
						{borrowList.map(row => {
							return (
								<TableRow key={row.id}>
									<TableCell component="th" scope="row">
										{row.id}
									</TableCell>
									<TableCell >{row.fullName}</TableCell>
									<TableCell >{row.cardNumber ? row.cardNumber : "-"}</TableCell>
									<TableCell >{row.total}</TableCell>
									<TableCell>
                                        <Button onClick={this.onClickGiveBookBack(row)} color="primary" className={classes.button}>
                                            Trả sách
                                        </Button>
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
				<GiveBackDialog open={this.state.open} handleCloseDialog={this.handleCloseDialog} borrowItem={this.state.currentBorrowItem}/>
			</Paper>
		);
	}
}

PeopleManagement.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PeopleManagement);