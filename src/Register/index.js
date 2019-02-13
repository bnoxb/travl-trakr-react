import React, { Component } from 'react';

class Register extends Component {
	constructor() {
		super();
// Keeps track of the input for the new user which will later be sent to server.
		this.state = {
			username: '',
			password: '',
			email: ''
		}
	}
// Collects what the user is typing
	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}
// Sends the post request to the server. It'll make the new user, and bring back the new user information from the server
	handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const loginResponse = await fetch('http://localhost:9000/api/v1/auth/', {
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify(this.state),
				headers: {
					'Content-Type': 'application/json'
				}
			});

			if(!loginResponse.ok) {
				throw Error(loginResponse.statusText);
			}

			const parsedResponse = await loginResponse.json();
// Logs in the new user, so that their user page will now show
			this.props.login(parsedResponse.data.user);




		} catch(err) {
			console.log(err, ' this is err');
		}
	}

	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<input type='text' name='username' onChange={this.handleChange} placeholder='Enter Username' />
					<input type='text' name='email' onChange={this.handleChange} placeholder='Enter Email' />
					<input type='password' name='password' onChange={this.handleChange} placeholder='Enter Password' />
					<button>Login</button>
				</form>
				<button onClick={this.props.showLogin}>Already Registered?</button>
			</div>
		)
	}
}

export default Register;