import React, { Component } from 'react';

class Login extends Component {
	constructor() {
		super();


		this.state = {
			username: '',
			password: ''
		}
	}

	render() {
		return (
			<div>
				<form>
					<input type='text' name='username' onChange={this.handleChange} placeholder='Enter Username' />
					<input type='password' name='password' onChange={this.handleChange} placeholder='Enter Password' />
					<button>Login</button>
				</form>
			</div>
		)
	}
}

export default Login;