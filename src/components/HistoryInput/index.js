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
import CategoryDialog from '../CategoryDialog';
import lodash from 'lodash'

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
class HitoryInput extends React.Component {
    state = {
        open: false,
        edit: false
    }
    handleView = (row) => (event) => {
        this.setState({
            category: row,
            open: true,
            edit: false
        })
    }
    handleCloseDialog = () => {
        this.setState({
            open: false,
        });
    }
    render() {
        const {
            classes,
            historyInput = [],
            loadingState,
        } = this.props;
        const { open, edit, category } = this.state;
        return (
            <Paper>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Tên sách</TableCell>
                            <TableCell>Tác giả</TableCell>
                            <TableCell>Số lượng nhập thêm</TableCell>
                            <TableCell>Người tạo</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Chức vụ</TableCell>
                            <TableCell>Ngày tạo</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {!historyInput.length &&
                            <TableRow>
                                <TableCell colSpan={7} style={{ textAlign: "center" }}>
                                    {loadingState ? "Đang tải..." : "Không có dữ liệu"}
                                </TableCell>
                            </TableRow>
                        }
                    </TableBody>
                    {historyInput.map(row => {
                        return (
                            <TableRow key={row.id}>
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{lodash.get(row, 'book.bookName', '---')}</TableCell>
                                <TableCell>{lodash.get(row, 'book.author', '---')}</TableCell>
                                <TableCell>{lodash.get(row, 'quantity', '---')}</TableCell>
                                <TableCell>{lodash.get(row, 'account.fullName', '---')}</TableCell>
                                <TableCell>{lodash.get(row, 'account.email', '---')}</TableCell>
                                <TableCell>{lodash.get(row, 'account.role', '---') == 1 ? "Quản lý" : "Nhân viên"}</TableCell>
                                <TableCell>{lodash.get(row, 'createdAt', '---')}</TableCell>
                                
                            </TableRow>
                        );
                    })}
                </Table>
                <Fab color="primary" className={classes.fab}>
                    <IconButton onClick={this.onAddCategory}>
                        <AddIcon color="white" />
                    </IconButton>
                </Fab>
                {/* <CategoryDialog historyInput={historyInput} open={open} handleCloseDialog={this.handleCloseDialog} edit={edit} /> */}
            </Paper>
        )
    }
}
HitoryInput.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HitoryInput);