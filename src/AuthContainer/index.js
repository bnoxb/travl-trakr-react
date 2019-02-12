import React, { Component } from 'react';
import Login from '../Login';
import Register from '../Register';
import UserContainer from '../UserContainer';

class AuthContainer extends Component {
	constructor() {
		super();

		this.state = {
			loggedIn: false,
			username: '',
			_id: '',
			registered: true
		}
	}

	login = (user) => {
		this.setState({
			loggedIn: true,
			username: user.username,
			_id: user._id,
			registered: true
		});
	}

	showRegister = () => {
		this.setState({
			registered: false
		})
	}

	render() {

		return (
			<div>
				
				{this.state.loggedIn ? 
					<UserContainer history={this.props.history} username={this.state.username} _id={this.state._id} />
					: this.state.registered ? 
						<Login history={this.props.history} login={this.login} showRegister={this.showRegister}/>
						: <Register history={this.props.history} login={this.login}/>
				}
				
			</div>
		)
	}
}

export default AuthContainer;