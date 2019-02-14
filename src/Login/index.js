// Comes from the authContainer

import React, { Component } from 'react';

class Login extends Component {
	constructor() {
		super();

// Captures the users typing for the login process
		this.state = {
			username: '',
			password: '',
			message: ''
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
			const loginResponse = await fetch(`${process.env.REACT_APP_ROUTE}api/v1/auth/login`, {
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
			this.setState({
				message: 'Try a different username or password.'
			})
		}
	}
	// A message will render as an h4 if the user fails to log in properly.
	render() {
		return (
			<div id='login'>
				<h1 id='login-title'>TravlTrakr</h1>
				{this.state.message ? <h4>{this.state.message}</h4> : null}
				<div id='login-interactives'>
					<form onSubmit={this.handleSubmit}>
						<input type='text' name='username' onChange={this.handleChange} placeholder='Enter Username' />
						<input type='password' name='password' onChange={this.handleChange} placeholder='Enter Password' />
						<button>Login</button>
					</form>
					<button onClick={this.props.showRegister}>Need to Register?</button>
				</div>
			</div>
		)
	}
}

export default Login;