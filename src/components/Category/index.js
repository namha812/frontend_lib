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

import CategoryDialog from '../CategoryDialog';
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
class Category extends React.Component {
  state = {
    open: false,
    edit: false,
    page: 0,
    rowsPerPage: 10
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

  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

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
      category: {}
    });
  }

  get categories() {
    const { page, rowsPerPage } = this.state;
    const { searchValue, categories = [] } = this.props;
    return _.slice(categories.filter(item => {
      return _.includes(_.toLower(item.name), _.toLower(searchValue));
    }), page * rowsPerPage, page * rowsPerPage + rowsPerPage)
  }

  render() {
    const {
      classes,
      loadingState,
      editCategory,
      addCategory
    } = this.props;
    console.log(this.props);
    const { open, edit, category, page, rowsPerPage } = this.state;
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
            {!this.categories.length &&
              <TableRow>
                <TableCell colSpan={7} style={{ textAlign: "center" }}>
                  {loadingState ? "Đang tải..." : "Không có dữ liệu"}
                </TableCell>
              </TableRow>
            }
            {this.categories.map(row => {
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
                  <TableCell >{row.admin ? row.admin.fullName : "---"}</TableCell>
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
                count={this.categories.length}
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
          <IconButton onClick={this.onAddCategory}>
            <AddIcon color="white" />
          </IconButton>
        </Fab>
        <CategoryDialog editCategory={editCategory} addCategory={addCategory} category={category} student={[]} classList={[]} open={open} handleCloseDialog={this.handleCloseDialog} edit={edit} />
      </Paper>
    )
  }
}
Category.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Category);