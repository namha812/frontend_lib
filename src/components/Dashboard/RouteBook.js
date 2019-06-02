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
import BookMangement from '../BookMangement';

export default class RouteStudent extends Component {

    componentDidMount() {
        const { fetchBook } = this.props;
        fetchBook();
    }

    render() {
        const { reduxBook = {}, editBook, addBook, deleteBook, categories, publishingCompanies, books  } = this.props;
        return (
            <BookMangement
                books={books}
                loadingState={reduxBook.fetching}
                editBook={editBook}
                addBook={addBook}
                deleteBook={deleteBook}
                categories={categories}
                publishingCompanies={publishingCompanies}
            />
        )
    }
}
