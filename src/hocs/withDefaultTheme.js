import React, { Component } from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
      primary: {
          main: '#2196F3'
      }
    },
});

export function withDefaultTheme(WrappedComponent) {
    return class extends Component {
        render() {
            return (
                <MuiThemeProvider theme={theme}>
                    <WrappedComponent {...this.props} />
                </MuiThemeProvider>
            )
        }
    }
}