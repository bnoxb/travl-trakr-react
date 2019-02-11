import React, { Component } from 'react';

class TripPage extends Component {
	constructor() {
		super();

		this.state = {
			trip: {}

		}
	}

	componentDidMount() {
		this.getYelp();
		// this.getGoogleMap();
	}

	getYelp = async () => {
		try {
			console.log(this.props.currentTrip, ' currentRtip');
			const response = await fetch(`http://localhost:9000/trips/yelp/${this.props.currentTrip._id}`, {
				credentials: 'include'
			});
			if(!response.ok){
				throw Error(response.statusText);
			}
			const parsedResponse = await response.json();
			console.log(parsedResponse);
		} catch(err) {
			console.log(err);
			return err;
		}
	}

	getGoogleMap = async () => {
		try {

		} catch(err) {

		}
	}

	render() {

		return(
			<div>
				<h1>SHOW TRIP</h1>
				<h3>{this.props.currentTrip.name}</h3>

			</div>


		)
	}
}

export default TripPage;