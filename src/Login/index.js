// Comes from the authContainer

import React, { Component } from 'react';

class Login extends Component {
	constructor() {
		super();

// Captures the users typing for the login process
		this.state = {
			username: '',
			password: ''
		}
	}

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}
// Sends the post request to login the user, response triggers login so that we now will see the main page
	handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const loginResponse = await fetch('http://localhost:9000/api/v1/auth/login', {
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
					<input type='password' name='password' onChange={this.handleChange} placeholder='Enter Password' />
					<button>Login</button>
				</form>
				<button onClick={this.props.showRegister}>Need to Register?</button>
			</div>
		)
	}
}

export default Login;