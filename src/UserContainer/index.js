import React, { Component } from 'react';
import Login from '../Login';
import Register from '../Register';
import UserPage from '../UserPage';


class UserContainer extends Component {
	constructor() {
		super();

		this.state = {
			loggedIn: false,
			username: '',
			_id: ''
		}
	}
	login = (user) => {
		this.setState({
			loggedIn: true,
			username: user.username,
			_id: user._id
		});
	}
	render() {
		return (
			<div>
				User Container
				<Login history={this.props.history} login={this.login}/>
				<Register history={this.props.history} login={this.login}/>

				{this.state.loggedIn ? <UserPage username={this.state.username} _id={this.state._id} /> : null}
				
			</div>
		)
	}

}


export default UserContainer;