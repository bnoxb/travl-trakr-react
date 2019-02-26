// Gets put in App.js

import React, { Component } from 'react';
import Login from '../Login';
import Register from '../Register';
import UserContainer from '../UserContainer';

class AuthContainer extends Component {
	constructor() {
		super();
// Keeps track of the current user
		this.state = {
			loggedIn: false,
			username: '',
			id: '',
			registered: true
		}
	}

	login = (user) => {
		console.log(`entering in: ${user}`);
		this.setState({
			loggedIn: true,
			username: user.username,
			id: user.id,
			registered: true
		});
	}

	showRegister = () => {
		this.setState({
			registered: false
		})
	}

	showLogin = () => {
		this.setState({
			registered: true
		})
	}
// Reset state with the logout button.
	logout = async () => {
		try {
			await fetch(`${process.env.REACT_APP_ROUTE}api/v1/auth/logout`, {
				credentials: 'include'
			});
			this.setState({
				loggedIn: false,
				username: '',
				id: '',
				registered: true
			});
		} catch(err) {
			console.log(err);
		}
	}

	edit = (user) => {
		this.setState({
			username: user.username
		})
	}

	render() {
		console.log(`this.state is ${this.state}`);
// This has a switch for if a person is logged in, it'll show the main part of the app, but if they aren't, it accesses a switch to show either register or login page
		return (
			<div>
				
				{this.state.loggedIn ? 
					<UserContainer logout={this.logout} history={this.props.history} username={this.state.username} id={this.state.id}/>
					: this.state.registered ? 
						<Login history={this.props.history} login={this.login} showRegister={this.showRegister}/>
						: <Register history={this.props.history} login={this.login} showLogin={this.showLogin}/>
				}
				
			</div>
		)
	}
}

export default AuthContainer;