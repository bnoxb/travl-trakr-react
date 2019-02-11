import React, { Component } from 'react';

class TripPage extends Component {
	constructor() {
		super();

		this.state = {
			trip: {}

		}
	}

	componentDidMount() {
		this.getTrip();
	}

	getTrip = async () => {
		try {
			const response = await fetch(`http://localhost:9000/api/v1/users/${this.props._id}`, {
				credentials: 'include'
			});
			if(!response.ok){
				throw Error(response.statusText);
			}
			const tripParsed = await response.json();
			this.setState({
				user: tripParsed.data
			})
		} catch(err) {
			console.log(err);
			return err;
		}
	}

	render() {

		return(
			<div>
				<h1>SHOW TRIP</h1>
				<h3>{this.state.trip.name}</h3>

			</div>


		)
	}
}

export default TripPage;