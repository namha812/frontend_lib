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
	ROUTE_BOOK_BORROW,
	ROUTE_BOOK
} from '../../state/modules/routing';

class index extends Component {
	componentDidMount() {
		const { fetchBook } = this.props;
		fetchBook();
	}
	render() {
		const { books, OAuthToken, ...remainProps } = this.props;
		return (
			<ViewGridItem {...remainProps} books={books} OAuthToken={OAuthToken} />
		);
	}
}

export default index;