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
		try {
			const response = await fetch(`${process.env.REACT_APP_ROUTE}api/v1/users/${this.props._id}`, {
				credentials: 'include'
			});
			if(!response.ok){
				throw Error(response.statusText);
			}
			const userParsed = await response.json();
			this.setState({
				user: userParsed.data
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