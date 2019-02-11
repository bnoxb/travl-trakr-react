import React, { Component } from 'react';
import Login from '../Login';


class UserContainer extends Component {
	constructor() {
		super();

		this.state = {
			loggedIn: false,
			username: '',
			

		};
	}

	render() {
		return (
			<div>
				User Container
				<Login />
			</div>
		)
	}

}


export default UserContainer;