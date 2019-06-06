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
class Category extends React.Component {
    state = {
        open: false,
        edit: false
    }
    componentDidMount() {
        document.title = "Quản lý danh mục sách"
    }
    handleView = (row) => (event) => {
        this.setState({
            category: row,
            open: true,
            edit: false
        })
    }
    handleEdit = (row) => (event) => {
        this.setState({
            category: row,
            open: true,
            edit: true
        })
    }
    handleDelete = (row) => (event) => {
        console.log("del")
    }
    onAddCategory = () => {
        this.setState({
            open: true,
            edit: true,
            category: {}
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
            categories = [],
            loadingState,
            editCategory,
            addCategory
        } = this.props;
        const { open, edit, category } = this.state;
        return (
            <Paper>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Trạng thái</TableCell>
                            <TableCell>Danh mục sách</TableCell>
                            <TableCell>Ngày Tạo</TableCell>
                            <TableCell>Thao tác</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {!categories.length &&
                            <TableRow>
                                <TableCell colSpan={7} style={{ textAlign: "center" }}>
                                    {loadingState ? "Đang tải..." : "Không có dữ liệu"}
                                </TableCell>
                            </TableRow>
                        }
                    </TableBody>
                    {categories.map(row => {
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
                                <TableCell >{row.name}</TableCell>
                                <TableCell >{row.createdAt ? row.createdAt : "---"}</TableCell>
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
                </Table>
                <Fab color="primary" className={classes.fab}>
                    <IconButton onClick={this.onAddCategory}>
                        <AddIcon color="white" />
                    </IconButton>
                </Fab>
                <CategoryDialog editCategory={editCategory} addCategory={addCategory} category={category} open={open} handleCloseDialog={this.handleCloseDialog} edit={edit} />
            </Paper>
        )
    }
}
Category.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Category);