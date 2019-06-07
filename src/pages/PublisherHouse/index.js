import React, { Component } from 'react';
import { connect } from "react-redux";
import { compose } from "redux";

import Appbar from '../../components/AppBar';
import Drawer from '../../components/Drawer';
import Searchbox from '../../components/Searchbox';
import PublisherHouse from '../../components/PublisherHouse';
import * as routeTypes from '../../state/modules/routing';
import {
    fetchPublisherSaga,
    editPublisherSaga,
    addPublisherSaga
} from '../../state/modules/publisher';
import {logoutSaga} from '../../state/modules/auth';


class PublisherHousePage extends Component {
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
        const { fetchPublisher } = this.props;
        document.title = "Quản lý nhà xuất bản"
        fetchPublisher(); 
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
                <PublisherHouse {...remainProps}/>
            </React.Fragment>
        )

    }
}

export default connect(state => ({
    loginStatus: state.auth.loginStatus,
    publisherHouses: state.publisher.publisherHouses
}), (dispatch) => ({ //connect and dispatch your action to call into your reducer - remember your payload.
    redirect: (route) => dispatch({
        type: route
    }),
    fetchPublisher:compose(dispatch, fetchPublisherSaga),
    addPublisher: compose(dispatch, addPublisherSaga),
    editPublisher: compose(dispatch, editPublisherSaga),
    logout: compose(dispatch, logoutSaga)

}))(PublisherHousePage);

