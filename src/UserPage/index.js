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
			const response = await fetch(`http://localhost:9000/api/v1/users/${this.props._id}`, {
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
			<div>
				{this.state.user.username}<br/>
				<button onClick={this.props.deleteUser}>DELETE USER</button>


			</div>
		)
	}
}

export default UserPage;