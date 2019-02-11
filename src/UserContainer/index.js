import React, { Component } from 'react';
import Login from '../Login';
import Register from '../Register';
import { Route , withRouter} from 'react-router-dom';


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
				<Login history={this.props.history}/>
				<Register history={this.props.history}/>
			</div>
		)
	}

}


export default UserContainer;