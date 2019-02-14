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
				_id: '',
				trips: []
			}
		}
	}

	deleteUser = async (e) => {
		e.preventDefault();
		try {
			await fetch(`${process.env.REACT_APP_ROUTE}api/v1/users/${this.props._id}`, {
				method: 'DELETE',
				credentials: 'include'
			});
			this.props.logout()
		} catch(err) {
			console.log(err);
		}
	}

	showEditUser = (user, e) => {
		this.setState({
			showUserEdit: true,
			userToEdit: {
				username: user.username,
				password: user.password,
				email: user.email,
				_id: user._id,
				trips: user.trips
			}
		})
	}

	handleUserEditSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(`${process.env.REACT_APP_ROUTE}api/v1/users/${this.state.userToEdit._id}/edited`, {
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
					<a href="https://www.linkedin.com/in/timothy-mandel" className="fa fa-linkedin icon" id="linkedin"> </a>
					<a href="https://www.github.com/tmandel2" className="fa fa-github icon" id="github"> </a>
				</nav>
				{this.state.showUserEdit ? 
					<EditUser userToEdit={this.state.userToEdit} handleEditFormInput={this.handleEditFormInput} handleUserEditSubmit={this.handleUserEditSubmit} /> : 
					<UserPage logout={this.props.logout} history={this.props.history} username={this.props.username} _id={this.props._id} deleteUser={this.deleteUser} showEditUser={this.showEditUser}/>}
				<TripContainer history={this.props.history} username={this.props.username} _id={this.props._id}/>
			</div>
		)
	}

}


export default UserContainer;