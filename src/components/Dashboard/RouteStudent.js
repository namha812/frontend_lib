import React, { Component } from 'react';
import BorrowBook from '../BookBorrow';
import PeopleManagement from '../PeopleMangement'
import Searchbox from '../Searchbox';
import ViewGridItem from '../ViewGridItem';
import LoadingComponent from '../LoadingComponent';

import {
    routeType,
    ROUTE_HOME,
    ROUTE_ABOUT,
    ROUTE_LOGIN,
    ROUTE_SIGNUP,
    ROUTE_ANONYMOUS,
    ROUTE_PEOPLE,
    ROUTE_BOOK_BORROW
} from '../../state/modules/routing';

export default class RouteStudent extends Component {

    componentDidMount() {
        const { fetchStudent } = this.props;
        fetchStudent();
    }

    render() {
        const { student, editStudent, addStudent, deleteStudent } = this.props;
        return (
            <PeopleManagement
                students={student.students}
                loadingState={student.fetching}
                editStudent={editStudent}
                addStudent={addStudent}
                deleteStudent={deleteStudent}
            />
        )
    }
}
