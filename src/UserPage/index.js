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
		let tripList;
		if(this.state.user.trips) {
			tripList = this.state.user.trips.map((trip, i) => {
				return <li key={trip._id}>
						<span>{trip.name}</span><br/>
						<small>{trip.country}</small><br/>
					</li>
				});
		} else {
			tripList = null;
		}
		
		return (
			<div>
				{this.state.user.username}<br/>
				{tripList}


			</div>
		)
	}
}

export default UserPage;