import React, { Component } from 'react';
import { connect } from "react-redux";
import { compose } from "redux";

import Appbar from '../../components/AppBar';
import Drawer from '../../components/Drawer';
import Dashboard from '../../components/Dashboard';
import * as routeTypes from '../../state/modules/routing';
import {
  fetchStudentSaga,
  addStudentSaga,
  editStudentSaga,
  deleteStudentSaga
} from '../../state/modules/student'
import Searchbox from '../../components/Searchbox';

class Home extends Component {
  state = {
    openDrawer: false,
    type: null
  }

  componentDidMount() {

  }

  componentDidUpdate() {
    const { type } = this.props;
  }

  recallApi = (route) => {

  }

  onChangeRoute = (route) => {
    const { redirect } = this.props;
    redirect(route);
    this.recallApi(route);
  }

  onCloseDrawer = (event) => {
    this.setState({ openDrawer: false });
  }

  onOpenDrawer = () => {
    this.setState({ openDrawer: true })
  }

  onChangeSearchValue = (value) => {
    console.log(value);
  }
  render() {
    const { openDrawer } = this.state
    const { 
      location,
      fetchStudent,
      editStudent,
      addStudent,
      deleteStudent,
      student
    } = this.props;
    return (
      <React.Fragment>
        <Appbar openDrawer={this.onOpenDrawer} />
        <Drawer openDrawer={openDrawer} onClose={this.onCloseDrawer} onChangeRoute={this.onChangeRoute} />
        <Searchbox placeholder="Search" onChangeSearchValue={this.onChangeSearchValue}/>
        <Dashboard
          type={location.type} 
          routeTypes={routeTypes}
          student={student}
          fetchStudent={fetchStudent}
          editStudent={editStudent}
          addStudent={addStudent}
          deleteStudent={deleteStudent}
        />
      </React.Fragment>
    );
  }
}

export default connect(state => ({
  location: state.location,
  route: state.location.type,
  student: state.student
}), (dispatch) => ({
  redirect: (route) => dispatch({
    type: route
  }),
  fetchBook: () => dispatch({
    type: "FETCH_BOOK"
  }),
  fetchStudent:compose(dispatch, fetchStudentSaga),
  editStudent: compose(dispatch, editStudentSaga),
  addStudent: compose(dispatch, addStudentSaga),
  deleteStudent: compose(dispatch, deleteStudentSaga)
  
}))(Home);
