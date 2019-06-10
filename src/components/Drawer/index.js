import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import lodash from 'lodash';
import {
	routeType,
	ROUTE_HOME,
	ROUTE_ABOUT,
	ROUTE_LOGIN,
	ROUTE_SIGNUP,
	ROUTE_ANONYMOUS,
	ROUTE_PEOPLE,
  ROUTE_BOOK_BORROW,
  ROUTE_BOOK,
  ROUTE_BORROW,
  ROUTE_CATEGORY,
  ROUTE_PUBLISHER_HOUSE,
  ROUTE_ACCOUNT,
  ROUTE_HISTORY_INPUT,
  ROUTE_CLASS
} from '../../state/modules/routing';
let ListDrawer = [
  {
    id: 1,
    title: "Mượn sách",
    path: ROUTE_BOOK_BORROW
  },
  {
    id: 3,
    title: "Quản lý sách",
    path:ROUTE_BOOK
  },
  {
    id: 4,
    title: "Quản lý mượn trả",
    path: ROUTE_BORROW
  },
  {
    id: 5,
    title: "Quản lý danh mục sách",
    path: ROUTE_CATEGORY
  },
  {
    id: 6,
    title: "Quản lý nhà xuất bản",
    path: ROUTE_PUBLISHER_HOUSE
  },
  {
    id: 7,
    title: "Lịch sử nhập kho",
    path: ROUTE_HISTORY_INPUT
  },
  {
    id: 2,
    title: "Quản lý độc giả",
    path: ROUTE_PEOPLE
  },
  {
    id: 9,
    title: "Quản lý lớp học",
    path: ROUTE_CLASS
  },
  {
    id: 8,
    title: "Quản lý tài khoản",
    path: ROUTE_ACCOUNT
  }
]

const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
};

class TemporaryDrawer extends React.Component {
  onChangeDrawer = (type) => (event) => {
    const {  onClose, onChangeRoute } = this.props;
    event.stopPropagation();
    onChangeRoute(type);
    onClose();
  }
  render() {
    const { classes, openDrawer, onClose, loginStatus } = this.props;
    const role = localStorage.getItem('role');
    if(parseInt(role) !== 1) {
      ListDrawer = lodash.remove(ListDrawer, (o)=> {
        return o.id !== 8;
      })
    }
    const sideList = (
      <div className={classes.list}>
        <List>
          {ListDrawer.map((item, index) => (
            <ListItem onClick={this.onChangeDrawer(item.path)} button key={item.id}>
              <ListItemText primary={item.title} />
            </ListItem>
          ))}
        </List>
        <Divider />
      </div>
    );

    if(!loginStatus){
      return null;
    }
    return (
      <div>
        <Drawer open={openDrawer} onClose={onClose}>
          <div
            tabIndex={0}
            role="button"
            onClick={onClose}
            onKeyDown={onClose}
          >
            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }
}

TemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TemporaryDrawer);