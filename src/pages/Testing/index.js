import React, { Component } from 'react';
import { connect } from "react-redux";
import { compose } from "redux";

import Appbar from '../../components/AppBar';
import Drawer from '../../components/Drawer';
import Dashboard from '../../components/Dashboard';
import * as routeTypes from '../../state/modules/routing';
import {
    test, 
    testSaga
} from '../../state/modules/testing'

class index extends Component {
    componentDidMount(){
        const { testSagaCall } = this.props;
        testSagaCall(); //call into testSaga function => it create a testSaga action and dispatch it, sagas allways listen => call into testSaga function in saga.
    }
    render() {
        return (
            <div>
                Testing page
            </div>
        )
    }
}

export default connect(state => ({
    test: state.test //connect the reducer into your view
  }), (dispatch) => ({ //connect and dispatch your action to call into your reducer - remember your payload.
    redirect: (route) => dispatch({
      type: route
    }),
    test: compose(dispatch, test),
    testSagaCall: compose(dispatch, testSaga)
  }))(index);
  
