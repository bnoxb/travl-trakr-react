import React, { Component } from 'react';
// import Login from '../Login';
// import Register from '../Register';
import UserPage from '../UserPage';
import TripContainer from '../TripContainer';


class UserContainer extends Component {
	constructor() {
		super();

		this.state = {
		}
	}

	deleteUser = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(`http://localhost:9000/api/v1/users/${this.props._id}`, {
				method: 'DELETE',
				credentials: 'include'
			});
			this.props.logout()
		} catch(err) {
			console.log(err);
		}
	}

	render() {
		return (
			<div>
				<UserPage history={this.props.history} username={this.props.username} _id={this.props._id} deleteUser={this.deleteUser}/>
				<TripContainer history={this.props.history} username={this.props.username} _id={this.props._id}/>
			</div>
		)
	}

}


export default UserContainer;