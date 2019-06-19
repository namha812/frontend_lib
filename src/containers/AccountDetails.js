import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import TextField from "@material-ui/core/TextField";
import {
  editAccountSaga
} from '../state/modules/account';
import { hideDetails, updateInfoUser } from "../state/modules/auth";
import { isEmpty } from "lodash"
const styles = theme => ({
  appBar: {
    position: "relative"
  },
  flex: {
    flex: 1
  },
  container: {
    textAlign: "center"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "75%"
  }
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class FullScreenDialog extends React.Component {
  state = {
    open: false,
    fullName: "",
    email: "",
    password: "",
    rePassword: "",
    id: ""
  };

  handleClose = () => {
    this.setState({
      open: false,
      fullName: "",
      email: "",
      password: "",
      rePassword: ""
    });
    this.props.hideDetails();
  };

  handleSave = () => {
    const { fullName, email, id, password } = this.state;
    const { editAccount, updateInfoUser, hideDetails } = this.props;
    let user = {
      fullName: fullName,
      email: email,
      id: id
    }
    if(password) {
      user.password = password
    }
    editAccount(user);
    updateInfoUser(user)
    hideDetails();
  };

  static getDerivedStateFromProps(nextProps, prevState) {
		const { user: nextUser } = nextProps;
		const { user: currentUser } = prevState;
		if(!isEmpty(nextUser) && JSON.stringify(nextUser) !== JSON.stringify(currentUser)){
			return {
				fullName: nextUser.fullName,
        email: nextUser.email,
        password: "",
        id: nextUser.id,
        user: nextUser
			}
		}
		return;
	}

  get validate() {
    const { password, fullName, rePassword } = this.state;
    if (!fullName) {
      return false;
    }
    if (password && password !== rePassword) {
      return false
    }
    return true;
  }
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    const { classes, showDetails, user } = this.props;
    return (
      <div>
        <Dialog
          fullScreen
          open={showDetails}
          onClose={this.handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                onClick={this.handleClose}
                aria-label="Close"
              >
                <CloseIcon />
              </IconButton>
              <Typography
                variant="h6"
                color="inherit"
                className={classes.flex}
              />
              <Button color="inherit" onClick={this.handleSave} disabled={!this.validate}>
                save
              </Button>
            </Toolbar>
          </AppBar>
          <div className={classes.container}>
            <h2>Thông tin của bạn</h2>
            <div className={classes.item}>
              <TextField
                id="outlined-name"
                label="Tên đầy đủ"
                className={classes.textField}
                value={this.state.fullName || user.fullName}
                onChange={this.handleChange("fullName")}
                margin="normal"
                variant="outlined"
              />
              <TextField
                id="outlined-email"
                label="Email"
                disabled
                className={classes.textField}
                value={this.state.email || user.email}
                onChange={this.handleChange("email")}
                margin="normal"
                variant="outlined"
              />
              <TextField
                id="outlined-password"
                label="Mật khẩu"
                className={classes.textField}
                value={this.state.password || ""}
                onChange={this.handleChange("password")}
                margin="normal"
                variant="outlined"
                type="password"
              />
              <TextField
                id="outlined-password"
                label="Nhập lại mật khẩu"
                className={classes.textField}
                value={this.state.rePassword || ""}
                onChange={this.handleChange("rePassword")}
                margin="normal"
                variant="outlined"
                type="password"
              />
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}

FullScreenDialog.propTypes = {
  classes: PropTypes.object.isRequired
};
const ConnectDetails = connect(state => ({
  showDetails: state.auth.showDetails,
  user: state.auth.user
}),
  dispatch => ({
    hideDetails: compose(dispatch, hideDetails),
    editAccount: compose(dispatch, editAccountSaga),
    updateInfoUser: compose(dispatch, updateInfoUser)
  })
)(FullScreenDialog);
export default withStyles(styles)(ConnectDetails);
