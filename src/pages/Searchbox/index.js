import React, { Component } from 'react';
import Searchbox from '../../components/Searchbox'
import AppBar from '../../components/AppBar';
import LoadingComponent from '../../components/LoadingComponent';
import GridViewItem from '../../components/ViewGridItem'

class index extends Component {
    render() {
        return (
            <div>
                <AppBar anonymous />
                <Searchbox />
                <LoadingComponent />
                <GridViewItem />
            </div>
        );
    }
}

export default index;