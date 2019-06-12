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
import Edit from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import PublisherHouseDialog from '../PublisherHouseDialog';
import {format} from 'date-fns';

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
class PublisherHouse extends React.Component {
    state = {
        open: false,
        edit: false
    }
    handleView = (row) => (event) => {
        this.setState({
            publisherHouse: row,
            open: true,
            edit: false
        })
    }
    handleEdit = (row) => (event) => {
        this.setState({
            publisherHouse: row,
            open: true,
            edit: true
        })
    }
    onAddPublisher = () => {
        this.setState({
            open: true,
            edit: true,
            publisherHouse: {}
        });
    }
    handleCloseDialog = () => {
        this.setState({
            open: false,
            publisherHouse: {}
        });
    }
    render() {
        const {
            classes,
            loadingState,
            addPublisher,
            editPublisher,
            publisherHouses = []
        } = this.props;
        const { open, edit, publisherHouse } = this.state;
        return (
            <Paper>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Trạng thái</TableCell>
                            <TableCell>Tên nhà xuất bản</TableCell>
                            <TableCell>Địa chỉ</TableCell>
                            <TableCell>Ngày Tạo</TableCell>
                            <TableCell>Thao tác</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {!publisherHouses.length &&
                            <TableRow>
                                <TableCell colSpan={7} style={{ textAlign: "center" }}>
                                    {loadingState ? "Đang tải..." : "Không có dữ liệu"}
                                </TableCell>
                            </TableRow>
                        }
                    </TableBody>
                    {publisherHouses.map(row => {
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
                                <TableCell >{row.name}</TableCell>
                                <TableCell >{row.address ? row.address : "---"}</TableCell>
                                <TableCell >{row.createdAt ? format(new Date(row.createdAt), "DD/MM/YYYY") : "---"}</TableCell>
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
                    <IconButton onClick={this.onAddPublisher}>
                        <AddIcon color="white" />
                    </IconButton>
                </Fab>
                <PublisherHouseDialog editPublisher={editPublisher} addPublisher={addPublisher} publisherHouse={publisherHouse} student={[]} classList={[]} open={open} handleCloseDialog={this.handleCloseDialog} edit={edit} />
            </Paper>
        )
    }
}
PublisherHouse.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PublisherHouse);