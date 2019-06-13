import React, { Component } from 'react';
import { connect } from "react-redux";
import { compose } from "redux";

import Appbar from '../../components/AppBar';
import Drawer from '../../components/Drawer';
import Searchbox from '../../components/Searchbox';
import Account from '../../components/Account';
import {logoutSaga} from '../../state/modules/auth';
import {
    fetchAccountSaga,
    addAccountSaga,
    editAccountSaga
} from '../../state/modules/account'
class AccountPage extends Component {
    state = {
        openDrawer: false,
        type: null
    }
    onCloseDrawer = (event) => {
        this.setState({ openDrawer: false });
    }
    onOpenDrawer = (event) => {
        this.setState({ openDrawer: true });
    }
    openDrawer = (event) => {
        this.setState({ openDrawer: true })
    }

    componentDidMount() {
        const { fetchAccount, loginStatus, fetchedAccountStatus } = this.props;
        document.title = "Quản lý tài khoản";
        if(loginStatus && !fetchedAccountStatus) {
            fetchAccount(); 
        }
    }
    componentDidUpdate() {
        const { fetchAccount, loginStatus, fetchedAccountStatus } = this.props;
        if(loginStatus && !fetchedAccountStatus) {
            fetchAccount(); 
        }
    }
    
    onChangeRoute = (route) => {
        this.props.redirect(route);
    }
    render() {
        const { openDrawer } = this.state;
        const { loginStatus,logout, ...remainProps } = this.props;
        return (
            <React.Fragment>
                <Appbar logout = {logout} loginStatus={true} openDrawer={this.onOpenDrawer} />
                <Drawer loginStatus={true} openDrawer={openDrawer} onClose={this.onCloseDrawer} onChangeRoute={this.onChangeRoute} />
                <Searchbox loginStatus={loginStatus} placeholder="Search" />
                <Account {...remainProps}/>
            </React.Fragment>
        )
    }
}

export default connect(state => ({
    loginStatus: state.auth.loginStatus,
    accounts: state.account.accounts,
    fetchedAccountStatus: state.account.fetched
}), (dispatch) => ({ //connect and dispatch your action to call into your reducer - remember your payload.
    redirect: (route) => dispatch({
        type: route
    }),
    fetchAccount: compose(dispatch, fetchAccountSaga),
    addAccount: compose(dispatch, addAccountSaga),
    editAccount: compose(dispatch, editAccountSaga),
    logout: compose(dispatch, logoutSaga)
}))(AccountPage);

