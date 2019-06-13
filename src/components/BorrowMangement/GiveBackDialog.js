import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { format } from 'date-fns';

const styles = {
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class FullScreenDialog extends React.Component {
  state = {
    openForm: false,
    currentItem: {},
    note: ""
  };

  handleClose = () => {
    const { handleCloseDialog } = this.props;
    handleCloseDialog();
  };

  giveBookBack = (row) => (event) => {
    this.setState({ openForm: true, currentItem: row });
  }

  handleCloseForm = () => {
    this.setState({ openForm: false });
  };

  onChangenote = (event) => {
    const { value } = event.target;
    this.setState({
      note: value
    })
  }

  handleApplyForm = () => {
    const { currentItem, note } = this.state;
    const { payBook } = this.props;
    payBook({
      id: currentItem.id,
      payTotal: currentItem.borrowTotal,
      note
    })
    this.handleCloseForm();
    this.handleClose();
  }

  TimePay = (row) => {
    let str = ""
    if(row.status === 1 && row.isExpiry) {
      return str = "Quá hạn";
    }
    if(row.status === 2 && row.isExpiry) {
      return str = "Trả muộn";
    }
    if(row.status === 1 && !row.isExpiry) {
      return str = "Đúng hạn";
    }
    if(row.status === 2 && !row.isExpiry) {
      return str = "Còn hạn";
    }
  }
  render() {
    const { classes, borrowItem = [], open } = this.props;
    const { borrowPay } = borrowItem;
    return (
      <div>
        <Dialog
          fullScreen
          open={open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" className={classes.flex}>
                {borrowItem.fullName}
              </Typography>
              <Button color="inherit" onClick={this.handleClose}>
                save
              </Button>
            </Toolbar>
          </AppBar>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Tên sách</TableCell>
                <TableCell>Ngày mượn</TableCell>
                <TableCell>Hạn trả</TableCell>
                <TableCell>Ngày trả</TableCell>
                <TableCell>Ghi chú</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell>Thời hạn</TableCell>
                <TableCell>Chức năng</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {borrowPay && borrowPay.map(row => {
                return (
                  <TableRow key={row.id}>
                    <TableCell>
                      {row.book.bookName}
                    </TableCell>
                    <TableCell>{format(new Date(row.borrowDate), "DD/MM/YYYY")}</TableCell>
                    <TableCell>{format(new Date(row.expiryDate), "DD/MM/YYYY")}</TableCell>
                    <TableCell>{row.payDate ? format(new Date(row.payDate), "DD/MM/YYYY") : "---"}</TableCell>
                    <TableCell>{row.note ? row.note : "---"}</TableCell>
                    <TableCell>{row.status === 1 ? "Chưa trả" : "Đã trả"}</TableCell>
                    <TableCell>
                      {row.isExpiry ? 
                        <span style={{ color: "#D8000C" }}>{this.TimePay(row)}</span> : 
                        <span style={{ color: "#4F8A10" }}>{this.TimePay(row)}</span>}</TableCell>
                    <TableCell>
                      <Button onClick={this.giveBookBack(row)} color="primary" className={classes.button} disabled={row.status === 2}>
                        Trả sách
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Dialog>
        <Dialog
          open={this.state.openForm}
          onClose={this.handleCloseForm}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Trả sách</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {borrowItem.fullName} trả lại sách. Ngày mượn: {format(new Date(this.state.currentItem.borrowDate), "DD/MM/YYYY")}
            </DialogContentText>
            <DialogContentText>
              Trạng thái: {
                this.state.currentItem.isExpiry ?
                  <span style={{ color: "#D8000C" }}>Quá hạn</span>
                  :
                  <span style={{ color: "#4F8A10" }}>Còn hạn</span>
              }
            </DialogContentText>

            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Tình trạng sách"
              type="email"
              fullWidth
              onChange={this.onChangenote}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseForm} color="primary">
              Hủy
            </Button>
            <Button onClick={this.handleApplyForm} color="primary">
              Đồng ý trả
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

FullScreenDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FullScreenDialog);