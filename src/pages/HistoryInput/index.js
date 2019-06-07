import React, { Component } from 'react';
import { connect } from "react-redux";
import { compose } from "redux";

import Appbar from '../../components/AppBar';
import Drawer from '../../components/Drawer';
import Searchbox from '../../components/Searchbox';
import HistoryInput from '../../components/HistoryInput';
import * as routeTypes from '../../state/modules/routing';
import {
    fetchHistorySaga
} from '../../state/modules/historyInput'
import {logoutSaga} from '../../state/modules/auth';

class HistoryPage extends Component {
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
        const { fetchHistory } = this.props;
        document.title = "Lịch sử nhập kho"
        console.log("fetchHistory")
        fetchHistory(); 
    }
    onChangeRoute = (route) => {
        this.props.redirect(route);
    }
    render() {
        const { openDrawer } = this.state;
        const { loginStatus, ...remainProps } = this.props;
        return (
            <React.Fragment>
                <Appbar logout={this.props.logout} loginStatus={true} openDrawer={this.onOpenDrawer} />
                <Drawer loginStatus={true} openDrawer={openDrawer} onClose={this.onCloseDrawer} onChangeRoute={this.onChangeRoute} />
                <Searchbox loginStatus={loginStatus} placeholder="Search" />
                <HistoryInput {...remainProps}/>
            </React.Fragment>
        )
    }
}

export default connect(state => ({
    loginStatus: state.auth.loginStatus,
    historyInput: state.historyInput.historyInput
}), (dispatch) => ({ //connect and dispatch your action to call into your reducer - remember your payload.
    redirect: (route) => dispatch({
        type: route
    }),
    fetchHistory:compose(dispatch, fetchHistorySaga),
    logout: compose(dispatch, logoutSaga)

}))(HistoryPage);

