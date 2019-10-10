import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import logo from './logo.png';
import './style.css';

class AppHeader extends Component {

	constructor(props) {
		super(props);
		this.state = {
			list: []
		}
	}

	getMenuItems() {
		return (null);
	}

	render() {
		return (
			<Fragment>
				<Link to='/'>
					<img 
						src={logo}
						className='app-header-logo'
						alt="logo"
					/>
				</Link>
				<Menu 
					mode="horizontal" 
					className='app-header-menu'
				>
	        { this.getMenuItems() }
	      </Menu>
      </Fragment>
		)
	}
}

export default AppHeader;