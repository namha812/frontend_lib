import React, { Component } from 'react';
import Appbar from '../../components/AppBar'
import Drawer from '../../components/Drawer'
import Dashboard from '../../components/Dashboard'

class Home extends Component {
  state = {
    openDrawer: false,
    type: null
  }
  onCloseDrawer = () => {
    console.log('close')
    this.setState({ openDrawer: false });
  }

  onOpenDrawer = () => {
    console.log('open')
    this.setState({ openDrawer: true })
  }
  render() {
    const { openDrawer } = this.state
    return (
      <React.Fragment>
        <Appbar openDrawer={this.onOpenDrawer} />
        <Drawer openDrawer={openDrawer} onClose={this.onCloseDrawer} />
        <Dashboard type={this.state.type} />
      </React.Fragment>
    );
  }
}

export default Home;
