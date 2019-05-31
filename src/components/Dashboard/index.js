import React, { Component } from 'react';
import BorrowBook from '../BookBorrow';
import PeopleManagement from '../PeopleMangement'
import Searchbox from '../Searchbox';
import ViewGridItem from '../ViewGridItem';
import LoadingComponent from '../LoadingComponent';
import RouteHome from './RouteHome';
import RouteStudent from './RouteStudent';
import RouteBookBorrow from './RouteBookBorrow';
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

class index extends Component {
	renderDashboard = () => {
		const { type, ...remainProps } = this.props;
		switch (type) {
			case ROUTE_HOME:
				return <RouteHome/>
			case ROUTE_BOOK_BORROW:
				return <RouteBookBorrow />
			case ROUTE_PEOPLE:
				return <RouteStudent {...remainProps}/>
			default:
				return (<div>
					<ViewGridItem anonymous/>
				</div>);
		}
	}
	render() {
		return (
			<div>
				{this.renderDashboard()}
			</div>
		);
	}
}

export default index;