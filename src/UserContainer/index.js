import React, { Component } from 'react';
import Login from '../Login';
import Register from '../Register';
import UserPage from '../UserPage';
import TripContainer from '../TripContainer';


class UserContainer extends Component {
	constructor() {
		super();

		this.state = {
		}
	}

	render() {
		return (
			<div>
				<UserPage history={this.props.history} username={this.props.username} _id={this.props._id} />
				<TripContainer history={this.props.history} username={this.props.username} _id={this.props._id}/>
			</div>
		)
	}

}


export default UserContainer;