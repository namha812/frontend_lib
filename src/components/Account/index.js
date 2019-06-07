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
import AccountDialog from '../AccountDialog';

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
class Account extends React.Component {
    state = {
        open: false,
        edit: false
    }
    handleView = (row) => (event) => {
        this.setState({
            account: row,
            open: true,
            edit: false
        })
    }
    handleEdit = (row) => (event) => {
        this.setState({
            account: row,
            open: true,
            edit: true
        })
    }
    onAddCategory = () => {
        this.setState({
            open: true,
            edit: true,
            account: {}
        });
    }
    handleCloseDialog = () => {
        this.setState({
            open: false,
        });
    }
    render() {
        const {
            classes,
            loadingState,
            addAccount,
            editAccount,
            accounts
        } = this.props;
        const { open, edit, account } = this.state;
        return (
            <Paper>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Trạng thái</TableCell>
                            <TableCell>Họ và tên</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Địa chỉ</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Thao tác</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {!accounts.length &&
                            <TableRow>
                                <TableCell colSpan={7} style={{ textAlign: "center" }}>
                                    {loadingState ? "Đang tải..." : "Không có dữ liệu"}
                                </TableCell>
                            </TableRow>
                        }
                    </TableBody>
                    {accounts.map(row => {
                        return (
                            <TableRow key={row.id}>
                                <TableCell>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={row.isActive === 1}
                                                value={row.isActive === 1}
                                                disable
                                            />
                                        }
                                        label={row.isActive === 1 ? "Active" : "Inactive"}
                                    />
                                </TableCell>
                                <TableCell >{row.fullName}</TableCell>
                                <TableCell >{row.email}</TableCell>
                                <TableCell >{row.address}</TableCell>
                                <TableCell >{row.isActive === 1 ? "Quản Lý" : "Nhân Viên"}</TableCell>
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
                </Table>
                <Fab color="primary" className={classes.fab}>
                    <IconButton onClick={this.onAddCategory}>
                        <AddIcon color="white" />
                    </IconButton>
                </Fab>
                <AccountDialog editAccount={editAccount} addAccount={addAccount} account={account} open={open} handleCloseDialog={this.handleCloseDialog} edit={edit} />
            </Paper>
        )
    }
}
Account.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Account);