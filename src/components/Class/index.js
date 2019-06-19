import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import _ from 'lodash';
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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import { format } from 'date-fns';

import ClassDialog from '../ClassDialog';
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
});
class Classes extends React.Component {
  state = {
    open: false,
    edit: false,
    page: 0,
    rowsPerPage: 10
  }
  handleView = (row) => (event) => {
    this.setState({
      classeItem: row,
      open: true,
      edit: false
    })
  }
  handleEdit = (row) => (event) => {
    this.setState({
      classeItem: row,
      open: true,
      edit: true
    })
  }
  handleDelete = (row) => (event) => {

  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  onAddClass = () => {
    this.setState({
      open: true,
      edit: true,
      classeItem: {}
    });
  }
  handleCloseDialog = () => {
    this.setState({
      open: false,
    });
  }
  get classListLength() {
    const { searchValue, classList = [] } = this.props;
    return _.slice(classList.filter(item => {
      return _.includes(_.toLower(item.className), _.toLower(searchValue));
    })).length;
  }
  get classList() {
    const { page, rowsPerPage } = this.state;
    const { searchValue, classList = [] } = this.props;
    return _.slice(classList.filter(item => {
      return _.includes(_.toLower(item.className), _.toLower(searchValue));
    }), parseInt(page) * parseInt(rowsPerPage), parseInt(page) * parseInt(rowsPerPage) + parseInt(rowsPerPage))
  }

  render() {
    const {
      classes,
      loadingState,
      editClass,
      addClass,
    } = this.props;
    const { open, edit, classeItem, page, rowsPerPage } = this.state;
    return (
      <Paper>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Danh mục sách</TableCell>
              <TableCell>Người tạo</TableCell>
              <TableCell>Ngày Tạo</TableCell>
              <TableCell>Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!this.classList.length &&
              <TableRow>
                <TableCell colSpan={7} style={{ textAlign: "center" }}>
                  {loadingState ? "Đang tải..." : "Không có dữ liệu"}
                </TableCell>
              </TableRow>
            }
            {this.classList.map(row => {
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
                  <TableCell >{row.className}</TableCell>
                  <TableCell >{row.admin ? row.admin.name : "---"}</TableCell>
                  <TableCell >{row.createdAt ? format(new Date(row.createdAt), "DD/MM/YYYY") : "---"}</TableCell>
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
                count={this.classListLength}
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
          <IconButton onClick={this.onAddClass}>
            <AddIcon color="white" />
          </IconButton>
        </Fab>
        <ClassDialog editClass={editClass} addClass={addClass} classeItem={classeItem} open={open} handleCloseDialog={this.handleCloseDialog} edit={edit} />
      </Paper>
    )
  }
}
Classes.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Classes);