import React, { Component } from 'react';
import Login from '../Login';
import Register from '../Register';
import UserPage from '../UserPage';
import TripContainer from '../TripContainer';


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
				
				{this.state.loggedIn ? 
					<div>
						<UserPage history={this.props.history} username={this.state.username} _id={this.state._id} />
						<TripContainer history={this.props.history} username={this.state.username} _id={this.state._id}/>
					</div>
					: <div>
						<Login history={this.props.history} login={this.login}/>
						<Register history={this.props.history} login={this.login}/>
					</div>
				}
				
			</div>
		)
	}

}


export default UserContainer;