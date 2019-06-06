import React, { Component } from 'react';
import { connect } from "react-redux";
import { compose } from "redux";

import Appbar from '../../components/AppBar';
import Drawer from '../../components/Drawer';
import PeopleManagement from '../../components/PeopleMangement'
import {
  fetchStudentSaga,
  addStudentSaga,
  editStudentSaga,
  deleteStudentSaga
} from '../../state/modules/student'

import {
  fetchClassSaga
} from '../../state/modules/class'
import {
  fetchCategorySaga
} from '../../state/modules/category'
import {
  fetchPublisherSaga
} from '../../state/modules/publisher'
import Searchbox from '../../components/Searchbox';
import {
	ROUTE_HOME,
	ROUTE_PEOPLE,
	ROUTE_BOOK_BORROW,
	ROUTE_BOOK
} from '../../state/modules/routing';

class PeopleManagementPage extends Component {
  state = {
    openDrawer: false,
    type: null
  }

  componentDidMount() {
    const { fetchClass, fetchStudent } = this.props;
    fetchStudent();
    fetchClass();
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
    const {location} = this.props;
    switch (location.type) {
			case ROUTE_HOME:
        //callSearchBookApi();
        break;
			case ROUTE_BOOK_BORROW:
        //callSearchBookApi();
        break;
      case ROUTE_PEOPLE:
        //call searchpeopleApi();
        break;
			case ROUTE_BOOK:
        //callSearchBookApi();
        break;
      default:
        break;
		};
  }
  render() {
    const { openDrawer } = this.state
    const { 
      location,
      loginStatus,
      student,
      ...remainProps
    } = this.props;
    console.log(this.props)
    return (
      <React.Fragment>
        <Appbar loginStatus={loginStatus} openDrawer={this.onOpenDrawer} />
        <Drawer loginStatus={loginStatus} openDrawer={openDrawer} onClose={this.onCloseDrawer} onChangeRoute={this.onChangeRoute} />
        <Searchbox loginStatus={loginStatus} placeholder="Search" onChangeSearchValue={this.onChangeSearchValue}/>
        <PeopleManagement
          students={student.students}
          loadingState={student.fetching}
          {...remainProps}
        />
      </React.Fragment>
    );
  }
}

export default connect(state => ({
  loginStatus: state.auth.loginStatus,
  location: state.location,
  route: state.location.type,
  student: state.student,
  classList: state.classes.classes,
}), (dispatch) => ({
  redirect: (route) => dispatch({
    type: route
  }),
  fetchClass:compose(dispatch, fetchClassSaga),
  fetchCategory:compose(dispatch, fetchCategorySaga),
  fetchPublisher:compose(dispatch, fetchPublisherSaga),
  fetchStudent:compose(dispatch, fetchStudentSaga),
  editStudent: compose(dispatch, editStudentSaga),
  addStudent: compose(dispatch, addStudentSaga),
  deleteStudent: compose(dispatch, deleteStudentSaga)
  
}))(PeopleManagementPage);
