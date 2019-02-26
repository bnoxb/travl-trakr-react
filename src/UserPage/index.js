// In the UserContainer. Stays on top while the User is logged in.
import React, { Component } from 'react';

class UserPage extends Component {
	constructor() {
		super();

		this.state = {
			user: {}
		}
	}

	componentDidMount() {
		this.getUser();
	}

	getUser = async () => {
		console.log(`trying to getUser in UserPAge id is: ${this.props.id}`);
		try {
			const response = await fetch(`${process.env.REACT_APP_BACKEND_ADDRESS}/users/${this.props.id}`, {
				credentials: 'include'
			});
			if(!response.ok){
				throw Error(response.statusText);
			}
			const userParsed = await response.json();
			this.setState({
				user: userParsed
			})
		} catch(err) {
			console.log(err);
			return err;
		}
	}

	render() {
		return (
			<div className="user-page">
				<h1 id="user-name">{this.state.user.username}</h1>
				<div id="user-page-buttons">
					<button onClick={this.props.logout}>Log Out</button>
					<button onClick={this.props.showEditUser.bind(null, this.state.user)}>Edit User</button>
					<button onClick={this.props.deleteUser}>Delete User</button>
				</div>
			</div>
		)
	}
}

export default UserPage;