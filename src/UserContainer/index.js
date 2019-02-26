// called by the AuthContainer when a user logs in

import React, { Component } from 'react';
import UserPage from '../UserPage';
import TripContainer from '../TripContainer';
import EditUser from '../EditUser';


class UserContainer extends Component {
	constructor() {
		super();

		this.state = {
			showUserEdit: false,
			userToEdit: {
				username: '',
				email: '',
				password: '',
				id: '',
				trips: []
			}
		}
	}

	deleteUser = async (e) => {
		e.preventDefault();
		try {
			await fetch(`${process.env.REACT_APP_BACKEND_ADDRESS}/users/${this.props.id}`, {
				method: 'DELETE',
				credentials: 'include'
			});
			this.props.logout()
		} catch(err) {
			console.log(err);
		}
	}

	showEditUser = (user, e) => {
		console.log(`This is showEditUser: ${JSON.stringify(user)} is being passed in`);
		this.setState({
			showUserEdit: true,
			userToEdit: {
				username: user.username,
				password: user.password,
				email: user.email,
				id: user.id,
				trips: user.trips
			}
		})
	}

	handleUserEditSubmit = async (e) => {
		e.preventDefault();
		console.log(this.state.userToEdit);
		try {
			const response = await fetch(`${process.env.REACT_APP_BACKEND_ADDRESS}/users/${this.state.userToEdit.id}`, {
				method: 'PUT',
				credentials: 'include',
				body: JSON.stringify(this.state.userToEdit),
				headers:{
					'Content-Type': 'application/json'
				}
			});
			if(!response.ok){
				throw Error(response.statusText);
			}
			await response.json();
			this.setState({
				showUserEdit: false
			})
		} catch(err) {
			console.log(err);
		}
	}

	handleEditFormInput = (e) => {
		this.setState({
			userToEdit: {
				...this.state.userToEdit,
				[e.target.name]: e.target.value
			}
		})
	}

	render() {
		return (
			<div id="user-container">
				<nav>
					<a href="https://www.linkedin.com/in/timothy-mandel" className="fa fa-linkedin icon" id="linkedin" target='_blank' rel='noopener noreferrer'> </a>
					<a href="https://www.github.com/tmandel2" className="fa fa-github icon" id="github" target='_blank' rel='noopener noreferrer'> </a>
				</nav>
				{this.state.showUserEdit ? 
					<EditUser userToEdit={this.state.userToEdit} handleEditFormInput={this.handleEditFormInput} handleUserEditSubmit={this.handleUserEditSubmit} /> : 
					<UserPage logout={this.props.logout} history={this.props.history} username={this.props.username} id={this.props.id} deleteUser={this.deleteUser} showEditUser={this.showEditUser}/>}
				<TripContainer history={this.props.history} username={this.props.username} id={this.props.id}/>
			</div>
		)
	}

}


export default UserContainer;