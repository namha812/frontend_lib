import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import { connect } from "react-redux";
import { compose } from "redux";
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import HomeIcon from '@material-ui/icons/Home';
import ContactIcon from '@material-ui/icons/ContactPhone'
import Link from 'redux-first-router-link'

import {
	routeLogin,
	routeSignup
} from '../../state/modules/routing/actions';
import {
	showDetails, hideDetails
  } from '../../state/modules/auth'


const styles = theme => ({
	root: {
		width: '100%',
	},
	grow: {
		flexGrow: 1,
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 20,
	},
	title: {
		display: 'none',
		[theme.breakpoints.up('sm')]: {
			display: 'block',
		},
	},
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		marginRight: theme.spacing.unit * 2,
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing.unit * 3,
			width: 'auto',
		},
	},
	searchIcon: {
		width: theme.spacing.unit * 9,
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputRoot: {
		color: 'inherit',
		width: '100%',
	},
	inputInput: {
		paddingTop: theme.spacing.unit,
		paddingRight: theme.spacing.unit,
		paddingBottom: theme.spacing.unit,
		paddingLeft: theme.spacing.unit * 10,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: 200,
		},
	},
	sectionDesktop: {
		display: 'none',
		[theme.breakpoints.up('md')]: {
			display: 'flex',
		},
	},
	sectionMobile: {
		display: 'flex',
		[theme.breakpoints.up('md')]: {
			display: 'none',
		},
	},
});

class PrimarySearchAppBar extends React.Component {
	state = {
		anchorEl: null,
		contactAnchorEl: null,
	};

	handleProfileMenuOpen = event => {
		this.setState({ anchorEl: event.currentTarget });
	};

	handleContactMenuOpen = event => {
		this.setState({ contactAnchorEl: event.currentTarget });
	}

	handleMenuClose = () => {
		this.setState({ anchorEl: null });
	};

	handleContactMenuClose = () => {
		this.setState({ contactAnchorEl: null });
	}

	onMenuIconClick = () => {
		this.props.openDrawer();
	}

	handleLogout = () => {
		this.props.logout();
		this.handleMenuClose()
	}

	handleShowDetails = () => {
		this.props.showDetails();
	}

	render() {
		const { anchorEl, contactAnchorEl } = this.state;
		const { classes, loginStatus } = this.props;
		const isMenuOpen = Boolean(anchorEl);
		const isContactMenuOpen = Boolean(contactAnchorEl);
		const renderMenu = (
			<Menu
				anchorEl={anchorEl}
				anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
				transformOrigin={{ vertical: 'top', horizontal: 'right' }}
				open={isMenuOpen}
				onClose={this.handleMenuClose}
			>
				{!loginStatus && <Link to={routeLogin()}>
					<MenuItem onClick={this.handleMenuClose}>Đăng nhập</MenuItem>
				</Link>}
				{loginStatus && <MenuItem onClick={this.handleShowDetails}>Tài khoản</MenuItem>}
				{loginStatus && <MenuItem onClick={this.handleLogout}>Đăng xuất</MenuItem>}
			</Menu>
		);

		return (
			<div className={classes.root}>
				<AppBar position="static">
					<Toolbar>
						{loginStatus && <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer" onClick={this.onMenuIconClick}>
							<MenuIcon />
						</IconButton>}
						<Typography className={classes.title} variant="h6" color="inherit" noWrap>
							QUẢN LÝ THƯ VIỆN
						</Typography>
						<div className={classes.grow} />
						<div className={classes.sectionDesktop}>
							{loginStatus && <IconButton color="inherit">
								<HomeIcon />
							</IconButton>}
							<IconButton
								aria-owns={isMenuOpen ? 'material-appbar' : null}
								aria-haspopup="true"
								onClick={this.handleProfileMenuOpen}
								color="inherit"
							>
								<AccountCircle />
							</IconButton>
						</div>
					</Toolbar>
				</AppBar>
				{renderMenu}
			</div>
		);
	}
}

PrimarySearchAppBar.propTypes = {
	classes: PropTypes.object.isRequired,
};

const PrimarySearchAppBarConnect =  connect(null, (dispatch) => ({
	showDetails: compose(dispatch, showDetails)
  }))(PrimarySearchAppBar);

export default withStyles(styles)(PrimarySearchAppBarConnect);