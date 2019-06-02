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

export default class RouteHome extends Component {
    componentDidMount() {
        const { fetchBook } = this.props;
        fetchBook();
    }
    render() {
        const {books, OAuthToken} = this.props;
        return (
            <div>
                {/* <LoadingComponent /> */}
                <ViewGridItem books={books} OAuthToken={OAuthToken}/>
            </div>
        )
    }
}
