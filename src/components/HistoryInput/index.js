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
import lodash from 'lodash';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TablePaginationActionsWrapped from '../TablePaginationActions';
import {format} from "date-fns";

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
        currentBorrowItem: {},
        open: false,
        page: 0,
        rowsPerPage: 10,
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

    handleChangePage = (event, page) => {
		this.setState({ page });
	};

	handleChangeRowsPerPage = event => {
		this.setState({ rowsPerPage: event.target.value });
	};
    get historyInputLength () {
        const { searchValue, historyInput = [] } = this.props;
        return historyInput.filter(item => {
            return _.includes(_.toLower(item.book.bookName), _.toLower(searchValue));
        }).length;
    }

    get historyInputs() {
        const { page, rowsPerPage } = this.state;
        const { searchValue, historyInput = [] } = this.props;
        return _.slice(historyInput.filter(item => {
            return _.includes(_.toLower(item.book.bookName), _.toLower(searchValue));
        }), parseInt(page) * parseInt(rowsPerPage), parseInt(page) * parseInt(rowsPerPage) + parseInt(rowsPerPage))
    }
    render() {
        const {
            classes,
            historyInput = [],
            loadingState,
        } = this.props;
        const { open, edit, category, page, rowsPerPage } = this.state;
        return (
            <Paper>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>STT</TableCell>
                            <TableCell>Tên sách</TableCell>
                            <TableCell>Tác giả</TableCell>
                            <TableCell>Số lượng nhập thêm</TableCell>
                            <TableCell style={{width:80}}>Người tạo</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Chức vụ</TableCell>
                            <TableCell>Ngày tạo</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {!this.historyInputs.length &&
                            <TableRow>
                                <TableCell colSpan={7} style={{ textAlign: "center" }}>
                                    {loadingState ? "Đang tải..." : "Không có dữ liệu"}
                                </TableCell>
                            </TableRow>
                        }
                    </TableBody>
                    {this.historyInputs.map((row, index) => {
                        return (
                            <TableRow key={row.id}>
                                <TableCell>{this.historyInputs.indexOf(row) + 1 + rowsPerPage * page}</TableCell>
                                <TableCell>{lodash.get(row, 'book.bookName', '---')}</TableCell>
                                <TableCell>{lodash.get(row, 'book.author', '---')}</TableCell>
                                <TableCell>{lodash.get(row, 'quantity', '---')}</TableCell>
                                <TableCell>{lodash.get(row, 'account.fullName', '---')}</TableCell>
                                <TableCell>{lodash.get(row, 'account.email', '---')}</TableCell>
                                <TableCell>{lodash.get(row, 'account.role', '---') == 1 ? "Quản lý" : "Nhân viên"}</TableCell>
                                <TableCell>{row.createdAt ? format(new Date(row.createdAt), "DD/MM/YYYY") : "---"}</TableCell>

                            </TableRow>
                        );
                    })}
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                colSpan={3}
                                count={this.historyInputLength}
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
            </Paper>
        )
    }
}
HitoryInput.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HitoryInput);